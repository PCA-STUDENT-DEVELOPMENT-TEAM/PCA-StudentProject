<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
	protected $fillable = [
		'employee_code',
		'employee_number',
		'first_name',
		'middle_name',
		'last_name',
		'name_extension',
		'salary_type',
		'salary_step',
		'position_code',
		'appointment_code',
		'station_code'
	];

	public function position() {
		return $this->belongsTo(Position::class);
	}

	public function station() {
		return $this->belongsTo(Station::class);
	}

	public function appointment() {
		return $this->belongsTo(Appointment::class);
	}

	public function DTREntry() {
		return $this->hasMany(DTREntry::class);
	}

	public function travelOrder() {
		return $this->hasMany(TravelOrder::class);
	}

	public function leaveRequest() {
		return $this->hasMany(LeaveRequest::class);
	}

	public function jobOrder() {
		return $this->hasOne(JobOrder::class);
	}

	public function contract() {
		return $this->hasOne(Contract::class);
	}

	public function payrollEntry() {
		return $this->hasMany(PayrollEntry::class);
	}

	public function appliedCompensation() {
		return $this->hasMany(AppliedCompensation::class);
	}

	public function appliedDeduction() {
		return $this->hasMany(AppliedDeduction::class);
	}

	public function appliedShare() {
		return $this->hasMany(AppliedShare::class);
	}

	public function appliedLoan() {
		return $this->hasMany(AppliedLoan::class);
	}
}
