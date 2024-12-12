<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DeductionType extends Model
{
	protected $table = 'deduction_types';
	protected $primaryKey = 'deduction_code';

	protected $fillable = [
		'deduction_name',
		'shorthand',
		'amount',
		'is_mandatory',
		'remittance_percent',
		'ceiling_amount',
		'compensation_links'
	];


	public function appliedDeduction()
	{
		return $this->hasMany(AppliedDeduction::class);
	}
}
