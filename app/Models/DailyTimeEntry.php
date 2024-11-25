<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DailyTimeEntry extends Model
{
	protected $table = 'daily_time_entries';
	protected $primaryKey = 'dtr_entry_code';

	protected $fillable = [
		'date',
		'time_in_am',
		'time_out_am',
		'time_in_pm',
		'time_out_pm',
		'tardy_minutes',
		'undertime_minutes',
		'work_minutes',
		'employee_code'
	];

	public function employee() {
		return $this->belongsTo(Employee::class);
	}
}
