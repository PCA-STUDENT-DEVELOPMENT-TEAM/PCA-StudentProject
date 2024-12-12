<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PayrollSheet extends Model
{
	protected $table = 'payroll_sheets';
	protected $primaryKey = 'payroll_sheet_code';

	protected $fillable = [
		'payroll_name',
		'payroll_type',
		'start_date',
		'end_date',
		'date_created',
		'date_posted',
		'date_paid',
		'prepared_by',
		'recommended_by',
		'certified_by',
		'approved_by',
		'fund_cluster',
		'include_deduction',
	];
	public function payrollEntry() {
		return $this->hasMany(PayrollEntry::class);
	}
}
