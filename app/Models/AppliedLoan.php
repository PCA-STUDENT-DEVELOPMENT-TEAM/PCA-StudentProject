<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AppliedLoan extends Model
{
	protected $table = 'applied_loans';
	protected $primaryKey = 'app_loan_code';

    protected $fillable = [
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
