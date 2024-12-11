<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AgencyShare extends Model
{
	protected $table = 'agency_shares';
	protected $primaryKey = 'agency_share_code';

	protected $fillable = [
		'agency_share_name',
		'shorthand',
		'amount',
		'is_mandatory',
		'remittance_percent',
		'ceiling_amount',
		'compensation_links'
	];
	public function appliedShare()
	{
		return $this->hasMany(AppliedShare::class);
	}
}
