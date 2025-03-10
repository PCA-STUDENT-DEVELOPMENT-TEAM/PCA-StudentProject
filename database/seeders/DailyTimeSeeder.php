<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DailyTimeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        DB::table('daily_time_entries')->insert([
            'date' => '2024-01-01',
            'time_in_am' => '10:00:00',
            'time_out_am' => '10:00:00',
            'time_in_pm' => '10:00:00',
            'time_out_pm' => '10:00:00',
            'tardy_minutes' => 10,
            'undertime_minutes' => 10,
            'work_minutes' => 10,
            'employee_code' => 1
        ]);
        DB::table('daily_time_entries')->insert([
            'date' => '2024-01-02',
            'time_in_am' => '10:00:00',
            'time_out_am' => '10:00:00',
            'time_in_pm' => '10:00:00',
            'time_out_pm' => '10:00:00',
            'overtime_in' => '10:00:00',
            'overtime_out' => '10:00:00',
            'tardy_minutes' => 10,
            'undertime_minutes' => 10,
            'overtime_minutes' => null,
            'work_minutes' => 10,
            'employee_code' => 1,
        ]);
    }
}
