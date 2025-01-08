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
            CREATE OR REPLACE PROCEDURE proc_create_applied_compensation(c_code INT, e_code INT, p_code INT)
            LANGUAGE plpgsql
            AS $$
            DECLARE
                taxed BOOLEAN;
                fixed BOOLEAN;
                app_comp_amount DECIMAL;
                employee_grade INT;
                employee_step INT;
                d_code INT;
                tax_amount DECIMAL;
            BEGIN
                SELECT is_taxable INTO taxed FROM compensation_types WHERE compensation_code = c_code;
                SELECT is_fixed INTO fixed FROM compensation_types WHERE compensation_code = c_code;
                SELECT positions.salary_grade INTO employee_grade FROM positions JOIN employees ON employees.employee_code = positions.employee_code;
                SELECT salary_step INTO employee_step FROM employees WHERE employee_code = e_code;

                IF fixed THEN
                    SELECT compensation_types.fixed_amount INTO app_comp_amount FROM compensation_types WHERE compensation_code = c_code;
                ELSE
                    SELECT get_salary(employee_grade, employee_step) INTO app_comp_amount;
                END IF;

                INSERT INTO applied_compensations(amount, employee_code, compensation_code, payroll_sheet_code)
                VALUES (app_comp_amount, e_code, c_code, p_code);

                IF taxed THEN

                    IF app_comp_amount > 8000000.01 THEN
                        tax_amount := ((app_comp_amount) - 8000000) * 0.35 + 2202500;

                    ELSIF app_comp_amount > 2000000.01 THEN
                        tax_amount := ((app_comp_amount) - 2000000) * 0.30 + 402500;

                    ELSIF app_comp_amount > 800000.01 THEN
                        tax_amount := ((app_comp_amount) - 800000) * 0.25 + 102500;

                    ELSIF app_comp_amount > 400000.01 THEN
                        tax_amount := ((app_comp_amount) - 400000) * 0.20 + 22500;

                    ELSIF app_comp_amount > 250000.01 THEN
                        tax_amount := ((app_comp_amount) - 250000) * 0.15;

                    END IF;

                END IF;

                IF tax_amount > 0 THEN
                    SELECT deduction_code INTO d_code FROM deduction_types WHERE name = 'INCOME TAX';

                    IF (SELECT EXISTS (SELECT 1 FROM applied_deductions WHERE deduction_code = d_code AND payroll_sheet_code = p_code)) THEN
                        UPDATE applied_deductions SET amount = tax_amount WHERE deduction_code = d_code AND payroll_sheet_code = p_code;
                    ELSE
                        INSERT INTO applied_deductions(deduction_code, amount, employee_code, payroll_sheet_code)
                        VALUES (d_code, tax_amount, e_code, p_code);
                    END IF;
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
        DB::statement("DROP PROCEDURE IF EXISTS proc_create_applied_compensation(INT, INT, INT);");
    }
};
