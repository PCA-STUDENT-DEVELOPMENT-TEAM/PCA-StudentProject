<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JobOrder extends Model
{
	protected $table = 'job_orders';
	protected $primaryKey = 'job_order_code';

	protected $fillable = [
		'start_date',
		'end_date',
		'employee_code'
	];

	public function employee() {
		return $this->belongsTo(Employee::class);
	}
}
