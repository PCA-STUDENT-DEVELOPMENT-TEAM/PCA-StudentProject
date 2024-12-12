<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Station extends Model
{
	protected $table = 'stations';
	protected $primaryKey = 'station_code';

	protected $fillable = [
		'station_name',
		'street_address',
		'barangay',
		'city',
		'province',
		'postal_code'
	];

	public function employee() {
		return $this->hasMany(Employee::class);
	}
}
