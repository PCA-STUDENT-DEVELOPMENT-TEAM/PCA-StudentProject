<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AppliedLoan extends Model
{
    protected $fillable = [
		'app_loan_code',
		'start_date',
		'end_date',
		'monthly_amount',
		'begin_balance',
		'paid_amount',
		'balance',
		'employee_code',
		'loan_code'
	];

	public function loanType() {
		return $this->belongsTo(LoanType::class);
	}

	public function employee() {
		return $this->belongsTo(Employee::class);
	}
}
