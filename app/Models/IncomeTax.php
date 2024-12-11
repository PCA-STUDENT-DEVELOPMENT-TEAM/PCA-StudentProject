<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class IncomeTax extends Model
{
	protected $table = 'income_taxes';
	protected $primaryKey = 'income_tax_code';

	protected $fillable = [
		'lowerbound',
		'upperbound',
		'base_amount',
		'tax_rate'
	];
}
