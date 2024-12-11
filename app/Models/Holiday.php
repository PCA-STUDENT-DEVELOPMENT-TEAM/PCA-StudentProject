<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Holiday extends Model
{
	protected $table = 'holidays';
	protected $primaryKey = 'holiday_code';

	protected $fillable = [
		'holiday_name',
		'date',
		'type',
		'is_recurring'
	];
}
