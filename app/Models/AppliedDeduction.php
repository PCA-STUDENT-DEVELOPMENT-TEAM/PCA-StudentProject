<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AppliedDeduction extends Model
{
	protected $table = 'applied_deductions';
	protected $primaryKey = 'app_ded_code';

    protected $fillable = [
		'amount',
		'employee_code',
		'deduction_code'
	];

	public function deductionType() {
		return $this->belongsTo(DeductionType::class);
	}

	public function employee() {
		return $this->belongsTo(Employee::class);
	}
}
