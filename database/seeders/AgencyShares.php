<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AgencyShares extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

		/* These default values may be outdated. Further checking is required. */

        DB::table('agency_shares')->insert([
			['agency_share_name' => 'GSIS ECC', 'shorthand' => 'GSIS_ECC', 'amount' => 100.00, 'is_mandatory' => true, 'remittance_percent' => 12.00, 'ceiling_amount' => 0.00],
			['agency_share_name' => 'GSIS GOVERNMENT SHARE', 'shorthand' => 'GSIS_GS', 'amount' => 0.00, 'is_mandatory' => true, 'remittance_percent' => 12.00, 'ceiling_amount' => 0.00],
			['agency_share_name' => 'GSIS GOVERNMENT SHARE - ADDITIONAL', 'shorthand' => 'GSIS_GSA', 'amount' => 0.00, 'is_mandatory' => true, 'remittance_percent' => 12.00, 'ceiling_amount' => 0.00]
		]);
    }
}
