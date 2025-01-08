<?php

namespace App\Http\Controllers\Payroll;

use App\Http\Controllers\Controller;
use App\Models\CompensationType;
use App\Models\DeductionType;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;

class DeductionTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        // Fetch data from the database
        $data = DeductionType::all();

        $compensationTypes = CompensationType::pluck('name');

        // Return the data to the frontend
        return Inertia::render('Payroll/Admin/DeductionsPage/DeductionsPage', ['data' => $data, 'compensationTypes' => $compensationTypes]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        // Convert Array Input to String
        $links = $request->input('compensation_link')
            ? implode(", ", $request->input('compensation_link'))
            : null;

        // dd($links, $request);

        /* Validating the user request. */
        $validated = $request->validate([
            'name' => 'required|string|unique:deduction_types',
            'shorthand' => 'required|string|unique:deduction_types',
            'fixed_amount' => 'required|numeric',
            'is_mandatory' => 'required|boolean',
            'remittance_percent' => 'required|numeric',
            'ceiling_amount' => 'required|numeric',
            'compensation_link' => 'array|nullable',
            'compensation_link.*' => 'string|nullable',
        ]);

        // Create a new profile record in the database
        DeductionType::create([
            'name' => $validated['name'],
            'shorthand' => $validated['shorthand'],
            'fixed_amount' => $validated['fixed_amount'],
            'is_mandatory' => $validated['is_mandatory'],
            'remittance_percent' => $validated['remittance_percent'],
            'ceiling_amount' => $validated['ceiling_amount'],
            'compensation_link' => $links,
        ]);

        // Redirect back or to a specific page after saving
        return redirect()->back()->with('success', 'Data saved successfully!');
    }

    /**
     * Update the specified resource in storage.
     */
    //  TODO: SA PAG UPDATE SA MGA DAPAT NAKA UNIQUE LIKE SHORTHAND DAPAT MA ADDRESS
    public function update(Request $request, string $deduction_code)
    {

        $links = $request->input('compensation_link')
            ? implode(", ", $request->input('compensation_link'))
            : null;

        // sample code
        // 'shorthand' => 'required|string|max:50|unique:agency_shares,shorthand,' . $agency_share_code . ',agency_share_code',

        /* Validating the user request. */
        $validated = $request->validate([
            'name' => 'required|string|unique:deduction_types,name,'.$deduction_code.',deduction_code',
            'shorthand' => 'required|string|unique:deduction_types,name,'.$deduction_code.',deduction_code',
            'fixed_amount' => 'required|numeric',
            'is_mandatory' => 'required|boolean',
            'remittance_percent' => 'required|numeric',
            'ceiling_amount' => 'required|numeric',
            'compensation_link' => 'array|nullable',
            'compensation_link.*' => 'string|nullable',
        ]);

        $validated['compensation_link'] = $links;

        DeductionType::where('deduction_code', $deduction_code)->update($validated);
        return redirect()->back()->with('success', 'Successfully stored deduction type');
    }

    /**
     * Remove the specified resource from storage.
     */
    // TODO: APILON PUD DELETE ANG FOREIGN KEY SA TABLE NGA APPLIED_DEDUCTIONS (DEDUCTION_CODE)
    public function destroy($deduction_code)
    {
        // Find the record by salary_grade
        DeductionType::where('deduction_code', $deduction_code)->delete();
        return redirect()->back()->with('success', 'Successfully deduction type');
    }
}
