<?php

namespace App\Http\Controllers\Payroll;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\CompensationType;
use Inertia\Inertia;

class CompensationTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //fetch data from the database
        $data = CompensationType::all();

        //return data to front end
        return Inertia::render('Payroll/Admin/CompensationsPage/CompensationsPage', ['data' => $data]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //validate user request
        $validated = $request->validate([
            'compensation_name' => 'required|string|max:100',
            'shorthand' => 'required|string|max:100',
            'amount' => 'required|numeric',
            'is_taxable' => 'boolean',
            'is_fixed' => 'boolean',
        ]);

        //Create a new profile record in the database
        CompensationType::create([
            'compensation_name' => $validated['compensation_name'],
            'shorthand' => $validated['shorthand'],
            'amount' => $validated['amount'],
            'is_taxable' => $validated['is_taxable'],
            'is_fixed' => $validated['is_fixed'],

        ]);

        //Redirect back or to a specific page after saving
        return redirect()->back()->with('success', 'Data saved successfully!');
    }

    //  TODO: SA PAG UPDATE SA MGA DAPAT NAKA UNIQUE LIKE SHORTHAND DAPAT MA ADDRESS
    // [x]: MANA NI BAAAAI
    public function update(Request $request, $compensation_code)
    {

        $validate = $request->validate([
            'compensation_name' => 'string|max:255|unique:compensation_types,compensation_name,' . $compensation_code . ',compensation_code',
            'shorthand' => 'string|max:255|unique:compensation_types,shorthand,' . $compensation_code . ',compensation_code',
            'amount' => 'numeric',
            'is_taxable' => 'boolean',
            'is_fixed' => 'boolean',
        ]);

        CompensationType::where('compensation_code', $compensation_code)->update($validate);
        return redirect()->back()->with('success', 'Successfully stored');
    }

    /**
     * Remove the specified resource from storage.
     */
    // TODO: APILON OG DELETE ANG COMPENSATION_CODE SA TABLE APPLIED_COMPENSATIONS
    public function destroy($compensation_code)
    {
        //Find the record by compensation_code
        CompensationType::where('compensation_code', $compensation_code)->delete();
        return redirect()->back()->with('success', 'Successfully deleted compensation!');
    }
}
