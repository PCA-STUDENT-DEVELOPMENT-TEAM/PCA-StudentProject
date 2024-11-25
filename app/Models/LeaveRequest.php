<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LeaveRequest extends Model
{
	protected $fillable = [
		'leave_request_code',
		'date_filed',
		'start_date',
		'end_date',
		'leave_request_type',
		'leave_request_description',
		'leave_request_status',
		'employee_code',
		'approver_code'
	];

	public function employee() {
		return $this->belongsTo(Employee::class);
	}
}
