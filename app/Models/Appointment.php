<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{
	protected $table = 'appointments';
	protected $primaryKey = 'appointment_code';

	protected $fillable = [
		'type',
		'compensation_code',
		'has_mandatory_deduction',
	];

	public function employee() {
		return $this->hasMany(Employee::class);
	}
}
