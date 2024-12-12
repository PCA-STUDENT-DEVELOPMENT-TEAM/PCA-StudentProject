<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class DemoSeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 */
	public function run(): void
	{
		DB::table('salary_grades')->insert([
			['grade' => 1,	'step1' => 13000, 	'step2' => 13109,  'step3' => 13219,  'step4' => 13329,  'step5' => 13441,   'step6' => 13553,   'step7' => 13666,  'step8' => 13780],
			['grade' => 2,	'step1' => 13819, 	'step2' => 13925,  'step3' => 14032,  'step4' => 14140,  'step5' => 14248,   'step6' => 14357,   'step7' => 14468,  'step8' => 14578],
			['grade' => 3,	'step1' => 14678, 	'step2' => 14792,  'step3' => 14905,  'step4' => 15020,  'step5' => 15136,   'step6' => 15251,   'step7' => 15369,  'step8' => 15486],
			['grade' => 4,	'step1' => 15586, 	'step2' => 15706,  'step3' => 15827,  'step4' => 15948,  'step5' => 16071,   'step6' => 16193,   'step7' => 16318,  'step8' => 16443],
			['grade' => 5,	'step1' => 16543, 	'step2' => 16671,  'step3' => 16799,  'step4' => 16928,  'step5' => 17057,   'step6' => 17189,   'step7' => 17321,  'step8' => 17453],
			['grade' => 6,	'step1' => 17553, 	'step2' => 17688,  'step3' => 17824,  'step4' => 17962,  'step5' => 18100,   'step6' => 18238,   'step7' => 18379,  'step8' => 18520],
			['grade' => 7,	'step1' => 18620, 	'step2' => 18763,  'step3' => 18907,  'step4' => 19053,  'step5' => 19198,   'step6' => 19346,   'step7' => 19494,  'step8' => 19644],
			['grade' => 8,	'step1' => 19744, 	'step2' => 19923,  'step3' => 20104,  'step4' => 20285,  'step5' => 20468,   'step6' => 20653,   'step7' => 20840,  'step8' => 21029],
			['grade' => 9,	'step1' => 21211, 	'step2' => 21388,  'step3' => 21567,  'step4' => 21747,  'step5' => 21929,   'step6' => 22112,   'step7' => 22297,  'step8' => 22483],
			['grade' => 10,	'step1' => 23176, 	'step2' => 23370,  'step3' => 23565,  'step4' => 23762,  'step5' => 23961,   'step6' => 24161,   'step7' => 24363,  'step8' => 24567],
			['grade' => 11,	'step1' => 27000, 	'step2' => 27284,  'step3' => 27573,  'step4' => 27865,  'step5' => 28161,   'step6' => 28462,   'step7' => 28766,  'step8' => 29075],
			['grade' => 12,	'step1' => 29165, 	'step2' => 29449,  'step3' => 29737,  'step4' => 30028,  'step5' => 30323,   'step6' => 30622,   'step7' => 30924,  'step8' => 31230],
			['grade' => 13,	'step1' => 31320, 	'step2' => 31633,  'step3' => 31949,  'step4' => 32269,  'step5' => 32594,   'step6' => 32922,   'step7' => 33254,  'step8' => 33591],
			['grade' => 14,	'step1' => 33843, 	'step2' => 34187,  'step3' => 34535,  'step4' => 34888,  'step5' => 35244,   'step6' => 35605,   'step7' => 35971,  'step8' => 36341],
			['grade' => 15,	'step1' => 36619, 	'step2' => 36997,  'step3' => 37380,  'step4' => 37768,  'step5' => 38160,   'step6' => 38557,   'step7' => 38959,  'step8' => 39367],
			['grade' => 16,	'step1' => 39672, 	'step2' => 40088,  'step3' => 40509,  'step4' => 40935,  'step5' => 41367,   'step6' => 41804,   'step7' => 42247,  'step8' => 42694],
			['grade' => 17,	'step1' => 43030, 	'step2' => 43488,  'step3' => 43951,  'step4' => 44420,  'step5' => 44895,   'step6' => 45376,   'step7' => 45862,  'step8' => 46355],
			['grade' => 18,	'step1' => 46725, 	'step2' => 47228,  'step3' => 47738,  'step4' => 48253,  'step5' => 48776,   'step6' => 49305,   'step7' => 49840,  'step8' => 50382],
			['grade' => 19,	'step1' => 51357, 	'step2' => 52096,  'step3' => 52847,  'step4' => 53610,  'step5' => 54386,   'step6' => 55174,   'step7' => 55976,  'step8' => 56790],
			['grade' => 20,	'step1' => 57347, 	'step2' => 58181,  'step3' => 59030,  'step4' => 59892,  'step5' => 60769,   'step6' => 61660,   'step7' => 62565,  'step8' => 63485],
			['grade' => 21,	'step1' => 63997, 	'step2' => 64940,  'step3' => 65899,  'step4' => 66873,  'step5' => 67864,   'step6' => 68870,   'step7' => 69893,  'step8' => 70933],
			['grade' => 22,	'step1' => 71511, 	'step2' => 72577,  'step3' => 73661,  'step4' => 74762,  'step5' => 75881,   'step6' => 77019,   'step7' => 78175,  'step8' => 79349],
			['grade' => 23,	'step1' => 80003, 	'step2' => 81207,  'step3' => 82432,  'step4' => 83683,  'step5' => 85049,   'step6' => 86437,   'step7' => 87847,  'step8' => 89281],
			['grade' => 24,	'step1' => 90078, 	'step2' => 91548,  'step3' => 93043,  'step4' => 94562,  'step5' => 96105,   'step6' => 97674,   'step7' => 99268,  'step8' => 100888],
			['grade' => 25,	'step1' => 102690, 	'step2' => 104366, 'step3' => 106069, 'step4' => 107800, 'step5' => 109560,  'step6' => 111348,  'step7' => 113166, 'step8' => 115012],
			['grade' => 26,	'step1' => 116040, 	'step2' => 117933, 'step3' => 119858, 'step4' => 121814, 'step5' => 123803,  'step6' => 125823,  'step7' => 127876, 'step8' => 129964],
			['grade' => 27,	'step1' => 131124, 	'step2' => 133264, 'step3' => 135440, 'step4' => 137650, 'step5' => 139897,  'step6' => 142180,  'step7' => 144501, 'step8' => 146859],
			['grade' => 28,	'step1' => 148171, 	'step2' => 150589, 'step3' => 153047, 'step4' => 155545, 'step5' => 158083,  'step6' => 160664,  'step7' => 163286, 'step8' => 165951],
			['grade' => 29,	'step1' => 167432, 	'step2' => 170166, 'step3' => 172943, 'step4' => 175766, 'step5' => 178634,  'step6' => 181550,  'step7' => 184513, 'step8' => 187525],
			['grade' => 30,	'step1' => 189199, 	'step2' => 192286, 'step3' => 195425, 'step4' => 198615, 'step5' => 201856,  'step6' => 205151,  'step7' => 208499, 'step8' => 211902],
			['grade' => 31,	'step1' => 278434, 	'step2' => 283872, 'step3' => 289416, 'step4' => 295069, 'step5' => 300833,  'step6' => 306708,  'step7' => 312699, 'step8' => 318806],
			['grade' => 32,	'step1' => 331954, 	'step2' => 338649, 'step3' => 345478, 'step4' => 352445, 'step5' => 359553,  'step6' => 366804,  'step7' => 374202, 'step8' => 381748],
			['grade' => 33,	'step1' => 419144, 	'step2' => 431718, 'step3' => 0,	  'step4' => 0,	     'step5' => 0,		 'step6' => 0,		 'step7' => 0,		'step8' => 0]
		]);

		DB::table('positions')->insert([
			[
				'position_title' => 'Project Manager I',
				'salary_grade_code' => 1
			]
		]);

		DB::table('stations')->insert([
			'station_name' => 'Caraga Regional Office',
			'street_address' => NULL,
			'barangay' => NULL,
			'city' => 'Butuan City',
			'province' => 'Agusan Del Norte',
			'postal_code' => 8600
		]);

		DB::table('appointments')->insert([
			'appointment_type' => 'Regular',
			'has_mandatory_deduction' => false,
			'basic_pay_type' => 'Basic',
			'tax_type' => 'Basic'
		]);

		DB::table('holidays')->insert([
			'holiday_name' => 'Christmas',
			'date' => '2024-12-25',
			'type' => 'Religious',
			'is_recurring' => true
		]);

		DB::table('income_taxes')->insert([
			'lowerbound' => 24000.0,
			'upperbound' => 48000.0,
			'base_amount' => 0.0,
			'tax_rate' => 12.0
		]);

		DB::table('employees')->insert([
			'employee_number' => '8',
			'first_name' => 'Clads',
			'middle_name' => 'Arshad',
			'last_name' => 'Alingasa',
			'name_extension' => NULL,
			'salary_type' => 'Fixed',
			'salary_step' => 1,
			'device_bio_id' => '1',
			'position_code' => 1,
			'appointment_code' => 1,
			'station_code' => 1
		]);

		DB::table('leave_requests')->insert([
			'date_filed' => '2024-01-01',
			'start_date' => '2024-01-01',
			'end_date' => '2024-01-01',
			'leave_request_type' => 'Sick Leave',
			'leave_request_description' => 'N/A',
			'leave_request_status' => 'Approved',
			'employee_code' => 1,
			'approver_code' => 1
		]);

		DB::table('travel_orders')->insert([
			'date_filed' => '2024-01-01',
			'start_date' => '2024-01-01',
			'end_date' => '2024-01-01',
			'travel_order_type' => 'Work in Different Region',
			'travel_order_description' => 'N/A',
			'travel_order_status' => 'Approved',
			'employee_code' => 1,
			'approver_code' => 1
		]);

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
			'date' => '2022-01-01',
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
			'date' => '2023-01-01',
			'time_in_am' => '10:00:00',
			'time_out_am' => '10:00:00',
			'time_in_pm' => '10:00:00',
			'time_out_pm' => '10:00:00',
			'tardy_minutes' => 10,
			'undertime_minutes' => 10,
			'work_minutes' => 10,
			'employee_code' => 1
		]);

		DB::table('job_orders')->insert([
			'start_date' => '2024-01-01',
			'end_date' => '2024-01-01',
			'employee_code' => 1
		]);

		DB::table('contracts')->insert([
			'start_date' => '2024-01-01',
			'end_date' => '2024-01-01',
			'employee_code' => 1
		]);

		DB::table('payroll_sheets')->insert([
			'payroll_name' => 'January Payroll',
			'payroll_type' => 'Regular',
			'start_date' => '2024-01-01',
			'end_date' => '2024-01-02',
			'date_created' => '2024-01-02',
			'date_posted' => '2024-01-02',
			'date_paid' => '2024-01-02',
			'prepared_by' => 'Joshua Libando',
			'recommended_by' => 'Lyndon King Obenza',
			'certified_by' => 'Sam Joash Antonio',
			'approved_by' => 'Tristan Rhyl Penaso'
		]);

		DB::table('compensation_types')->insert([
			'compensation_name' => 'Income',
			'shorthand' => 'INC',
			'amount' => 10000.0,
			'is_taxable' => false,
			'is_fixed' => true
		]);

		DB::table('deduction_types')->insert([
			'deduction_name' => 'GSIS Deduction',
			'shorthand' => 'GSIS DED',
			'amount' => 10000.0,
			'is_mandatory' => true,
			'remittance_percent' => 12.0,
			'ceiling_amount' => 0.0
		]);

        for ($i = 0; $i < 10; $i++) {
            DB::table('agency_shares')->insert([
                'agency_share_name' => $faker->company . ' Share',
                'shorthand' => strtoupper($faker->lexify('??')),
                'amount' => $faker->randomFloat(2, 50, 500),
                'is_mandatory' => $faker->boolean,
                'remittance_percent' => $faker->randomFloat(2, 0.01, 0.15),
                'ceiling_amount' => $faker->randomFloat(2, 10, 100),
                'compensation_links' => DB::raw('ARRAY[' . implode(',', $faker->randomElements([1, 2, 3, 4, 5], 3)) . ']'),
            ]);
        }

		DB::table('loan_types')->insert([
			'loan_name' => 'House Loan'
		]);

		DB::table('payroll_entries')->insert([
			'current_position' => 'Project Manager I',
			'employee_code' => 1,
			'payroll_sheet_code' => 1,
		]);

		DB::table('applied_compensations')->insert([
			'amount' => 100.0,
			'employee_code' => 1,
			'compensation_code' => 1
		]);

		DB::table('applied_deductions')->insert([
			'amount' => 100.0,
			'employee_code' => 1,
			'deduction_code' => 1
		]);

		DB::table('applied_shares')->insert([
			'amount' => 100.0,
			'employee_code' => 1,
			'agency_share_code' => 1
		]);

		DB::table('applied_loans')->insert([
			'start_date' => '2024-01-01',
			'end_date' => '2024-01-02',
			'monthly_amount' => 100.0,
			'begin_balance' => 100.0,
			'paid_amount' => 200.0,
			'balance' => 200.0,
			'previous_paid' => 100.01,
			'employee_code' => 1,
			'loan_code' => 1
		]);
	}
}
