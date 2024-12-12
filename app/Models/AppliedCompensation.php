<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AppliedCompensation extends Model
{
	protected $table = 'applied_compensations';
	protected $primaryKey = 'app_comp_code';

    protected $fillable = [
		'amount',
		'employee_code',
		'compensation_code'
	];

	public function compensationType() {
		return $this->belongsTo(CompensationType::class);
	}

	public function employee() {
		return $this->belongsTo(Employee::class);
	}
}
