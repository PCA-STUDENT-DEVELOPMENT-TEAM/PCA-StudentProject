<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SalaryGrade extends Model
{
	protected $table = 'salary_grades';
	protected $primaryKey = 'salary_grade_code';

	protected $fillable = [
		'grade',
		'step1',
		'step2',
		'step3',
		'step4',
		'step5',
		'step6',
		'step7',
		'step8'
	];

	public function position()
	{
		return $this->hasMany(Position::class);
	}
}
