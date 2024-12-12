<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Contract extends Model
{
	protected $table = 'contracts';
	protected $primaryKey = 'contract_code';

    protected $fillable = [
		'start_date',
		'end_date',
		'employee_code'
	];

	public function employee() {
		return $this->belongsTo(Employee::class);
	}
}
