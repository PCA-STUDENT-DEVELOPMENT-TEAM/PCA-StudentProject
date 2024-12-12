<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CompensationType extends Model
{
	protected $table = 'compensation_types';
	protected $primaryKey = 'compensation_code';

	protected $fillable = [
		'compensation_name',
		'shorthand',
		'amount',
		'is_taxable',
		'is_fixed'
	];

	public function appliedCompensation()
	{
		return $this->hasMany(AppliedCompensation::class);
	}
}
