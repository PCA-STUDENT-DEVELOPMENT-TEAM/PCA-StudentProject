<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement("
            CREATE OR REPLACE PROCEDURE proc_create_applied_deduction(d_code INT, e_code INT, p_code INT)
            LANGUAGE plpgsql
            AS $$
            DECLARE
                c_link TEXT;
                com_array TEXT[];
                f_amount DECIMAL;
                r_percent DECIMAL;
                ceiling_amount DECIMAL;
                ac_amount DECIMAL;
                c_code INT;
                c_name VARCHAR(225);
                i INT;
                with_remittance DECIMAL;
            BEGIN
                SELECT deduction_types.fixed_amount INTO f_amount FROM deduction_types WHERE deduction_code = d_code;
                SELECT compensation_link INTO c_link FROM deduction_types WHERE deduction_code = d_code;
                SELECT remittance_percent INTO r_percent FROM deduction_types WHERE deduction_code = d_code;
                SELECT deduction_types.ceiling_amount INTO ceiling_amount FROM deduction_types WHERE deduction_code = d_code;

                com_array := string_to_array(c_link, ', ');

                IF f_amount != 0 AND c_link IS NOT NULL THEN
                    INSERT INTO applied_deductions(deduction_code, amount, employee_code, payroll_sheet_code)
                    VALUES (d_code, f_amount, e_code, p_code);
                ELSIF r_percent != 0 OR r_percent IS NULL AND com_array IS NOT NULL THEN
                    FOR i IN array_lower(com_array, 1)..array_upper(com_array, 1) LOOP
                        -- Check if the compensation type exists and get the amount
                        PERFORM applied_compensations.amount
                        FROM employees
                        JOIN applied_compensations
                            ON applied_compensations.employee_code = employees.employee_code
                        JOIN compensation_types
                            ON applied_compensations.compensation_code = compensation_types.compensation_code
                        WHERE compensation_types.name = com_array[i]
                        LIMIT 1;  -- Adding LIMIT to ensure we check for just one row

                        IF FOUND THEN
                            -- If amount is found (not null), store it in ac_amount and break the loop
                            SELECT applied_compensations.amount
                            INTO ac_amount
                            FROM employees
                            JOIN applied_compensations
                                ON applied_compensations.employee_code = employees.employee_code
                            JOIN compensation_types
                                ON applied_compensations.compensation_code = compensation_types.compensation_code
                            WHERE compensation_types.name = com_array[i]
                            LIMIT 1;

                            with_remittance :=  (r_percent / 100.0) * ac_amount;

                            IF with_remittance > ceiling_amount THEN
                                INSERT INTO applied_deductions(deduction_code, amount, employee_code, payroll_sheet_code)
                                VALUES (d_code, ceiling_amount, e_code, p_code);
                            ELSIF with_remittance != 0 AND with_remittance IS NOT NULL THEN
                                INSERT INTO applied_deductions(deduction_code, amount, employee_code, payroll_sheet_code)
                                VALUES (d_code, with_remittance, e_code, p_code);
                            END IF;

                            -- Exit the loop after finding the first match
                            EXIT;
                        END IF;
                    END LOOP;
                END IF;
            END;
            $$;
        ");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::statement("DROP PROCEDURE IF EXISTS proc_create_applied_deduction(INT, INT, INT);");
    }
};
