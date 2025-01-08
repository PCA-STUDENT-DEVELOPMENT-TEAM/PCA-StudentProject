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
            CREATE OR REPLACE FUNCTION get_salary(input_grade INT, step INT)
            RETURNS INT AS $$
            DECLARE
                result INT;
            BEGIN
                IF step = 1 THEN
                    SELECT step1 INTO result FROM salary_grades WHERE salary_grades.grade = input_grade;
                ELSIF step = 2 THEN
                    SELECT step2 INTO result FROM salary_grades WHERE salary_grades.grade = input_grade;
                ELSIF step = 3 THEN
                    SELECT step3 INTO result FROM salary_grades WHERE salary_grades.grade = input_grade;
                ELSIF step = 4 THEN
                    SELECT step4 INTO result FROM salary_grades WHERE salary_grades.grade = input_grade;
                ELSIF step = 5 THEN
                    SELECT step5 INTO result FROM salary_grades WHERE salary_grades.grade = input_grade;
                ELSIF step = 6 THEN
                    SELECT step6 INTO result FROM salary_grades WHERE salary_grades.grade = input_grade;
                ELSIF step = 7 THEN
                    SELECT step7 INTO result FROM salary_grades WHERE salary_grades.grade = input_grade;
                ELSIF step = 8 THEN
                    SELECT step8 INTO result FROM salary_grades WHERE salary_grades.grade = input_grade;
                ELSE
                    result := 0;
                END IF;

                RETURN result;
            END;
            $$ LANGUAGE plpgsql;
        ");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::statement("DROP FUNCTION IF EXISTS get_salary(INT, INT);");
    }
};
