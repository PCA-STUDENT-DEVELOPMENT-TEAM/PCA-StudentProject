<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Position extends Model
{
	protected $table = 'positions';
	protected $primaryKey = 'position_code';

	protected $fillable = [
		'position_title',
		'salary_grade_code'
	];

	public function salaryGrade()
	{
		return $this->belongsTo(SalaryGrade::class);
	}

	public function employee()
	{
		return $this->hasMany(Employee::class);
	}
	public function users()
	{
		return $this->hasMany(User::class, 'positioncode', 'positioncode');
	}
}
