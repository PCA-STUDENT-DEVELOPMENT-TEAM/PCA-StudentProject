<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Creating the stored procedure
        DB::unprepared("
            CREATE OR REPLACE PROCEDURE update_employee_details(
                IN emp_code INT,
                IN new_station_code INT,
                IN new_appointment_code INT,
                IN new_position_code INT,
                IN new_salary_step INT
            )
            LANGUAGE plpgsql
            AS $$
            BEGIN
                -- Update the 'station' for the employee
                UPDATE applied_stations AS ast
                SET station_code = new_station_code
                FROM employees AS e
                WHERE e.employee_code = ast.employee_code
                  AND e.employee_code = emp_code;

                -- Update employee appointment, position, and salary_step
                UPDATE employees
                SET
                    appointment_code = new_appointment_code,
                    position_code = new_position_code,
                    salary_step = new_salary_step
                WHERE employee_code = emp_code;

            END;
            $$;
        ");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Dropping the stored procedure if rolled back
        DB::unprepared("DROP PROCEDURE IF EXISTS update_employee_details");
    }
};
