<?php

namespace App\Http\Controllers\Payroll;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\AgencyShare;
use App\Models\CompensationType;
use Inertia\Inertia;

class AgencyShareController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //fetch data from the database
        $data = AgencyShare::all();

        $compensationTypes = CompensationType::pluck('compensation_name');

        //return data to front end
        return Inertia::render('Payroll/Admin/GovernmentSharesPage/GovernmentSharesPage', ['data' => $data, 'compensationTypes' => $compensationTypes]);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Convert Array Input to String
        $links = $request->input('compensation_links')
            ? implode(", ", $request->input('compensation_links'))
            : null;

        // Validate user request
        $validate = $request->validate([
            'agency_share_name' => 'required|string|max:255',
            'shorthand' => 'required|string|max:50',
            'amount' => 'required|numeric',
            'is_mandatory' => 'required|boolean',
            'remittance_percent' => 'required|numeric',
            'ceiling_amount' => 'required|numeric',
            'compensation_links' => 'array|nullable',
            'compensation_links.*' => 'string|nullable',
        ]);

        // Create new AgencyShare
        AgencyShare::create([
            'agency_share_name' => $validate['agency_share_name'],
            'shorthand' => $validate['shorthand'],
            'amount' => $validate['amount'],
            'is_mandatory' => $validate['is_mandatory'],
            'remittance_percent' => $validate['remittance_percent'],
            'ceiling_amount' => $validate['ceiling_amount'],
            'compensation_links' => $links,
        ]);

        return redirect()->back()->with('success', 'Data received successfully!');
    }

    /**
     * Update the specified resource in storage.
     */

    //  TODO: SA PAG UPDATE SA MGA DAPAT NAKA UNIQUE LIKE SHORTHAND DAPAT MA ADDRESS
    // [x]: MANA BAIIII
    public function update(Request $request, $agency_share_name)
    {
        $links = $request->input('compensation_links')
            ? implode(", ", $request->input('compensation_links'))
            : null;

        //validate user request
        $validate = $request->validate([
            'agency_share_name' => 'required|string|max:255',
            'shorthand' => 'required|string|max:50|unique:agency_shares,shorthand,' . $agency_share_name . ',agency_share_name',
            'amount' => 'required|numeric',
            'is_mandatory' => 'required|boolean',
            'remittance_percent' => 'required|numeric',
            'ceiling_amount' => 'required|numeric',
            'compensation_links' => 'array|nullable',
            'compensation_links.*' => 'string|nullable',

        ]);

        $validate['compensation_links'] = $links;
        AgencyShare::where('agency_share_name', $agency_share_name)->update($validate);
        return redirect()->back()->with('success', 'successfully stored Government Share!');
    }

    /**
     * Remove the specified resource from storage.
     */
    // TODO: NEED I APIL OG DELETE ANG SA APPLIED_SHARES (AGENCY_SHARE_CODE)
    public function destroy($agency_share_code)
    {
        //find the specific column
        AgencyShare::where('agency_share_code', $agency_share_code)->delete();
        return redirect()->back()->with('success', 'Successfully deleted government share');
    }
}
