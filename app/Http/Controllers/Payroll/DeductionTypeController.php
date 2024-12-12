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

        $compensationTypes = CompensationType::pluck('compensation_name');

        // Return the data to the frontend
        return Inertia::render('Payroll/Admin/DeductionsPage/DeductionsPage', ['data' => $data, 'compensationTypes' => $compensationTypes]);
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


        /* Validating the user request. */
        $validated = $request->validate([
            'deduction_name' => 'required|string',
            'shorthand' => 'required|string',
            'amount' => 'required|numeric',
            'is_mandatory' => 'required|boolean',
            'remittance_percent' => 'required|numeric',
            'ceiling_amount' => 'required|numeric',
            'compensation_links' => 'array|nullable',
            'compensation_links.*' => 'string|nullable',
        ]);

        // Create a new profile record in the database
        DeductionType::create([
            'deduction_name' => $validated['deduction_name'],
            'shorthand' => $validated['shorthand'],
            'amount' => $validated['amount'],
            'is_mandatory' => $validated['is_mandatory'],
            'remittance_percent' => $validated['remittance_percent'],
            'ceiling_amount' => $validated['ceiling_amount'],
            'compensation_links' => $links,
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

        $links = $request->input('compensation_links')
            ? implode(", ", $request->input('compensation_links'))
            : null;

        /* Validating the user request. */
        $validated = $request->validate([
            'deduction_name' => 'required|string',
            'shorthand' => 'required|string',
            'amount' => 'required|numeric',
            'is_mandatory' => 'required|boolean',
            'remittance_percent' => 'required|numeric',
            'ceiling_amount' => 'required|numeric',
            'compensation_links' => 'array|nullable',
            'compensation_links.*' => 'string|nullable',
        ]);

        $validated['compensation_links'] = $links;

        DeductionType::where('deduction_code', $deduction_code)->update($validated);
        return redirect()->back()->with('success', 'Successfully stored ssl');
    }

    /**
     * Remove the specified resource from storage.
     */
    // TODO: APILON PUD DELETE ANG FOREIGN KEY SA TABLE NGA APPLIED_DEDUCTIONS (DEDUCTION_CODE)
    public function destroy($deduction_code)
    {
        // Find the record by salary_grade
        DeductionType::where('deduction_code', $deduction_code)->delete();
        return redirect()->back()->with('success', 'Successfully deleted ssl');
    }
}
