<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TravelOrder extends Model
{
	protected $table = 'travel_orders';
	protected $primaryKey = 'travel_order_code';

	protected $fillable = [
		'date_filed',
		'start_date',
		'end_date',
		'travel_order_type',
		'travel_order_description',
		'travel_order_status',
		'employee_code',
		'approver_code'
	];

	public function employee() {
		return $this->belongsTo(Employee::class);
	}
}
