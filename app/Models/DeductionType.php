<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DeductionType extends Model
{
	protected $fillable = [
		'deduction_code',
		'deduction_name',
		'shorthand',
		'amount',
		'is_mandatory',
		'remittance_percent',
		'ceiling_amount'
	];

	public function appliedDeduction() {
		return $this->hasMany(AppliedDeduction::class);
	}
}
