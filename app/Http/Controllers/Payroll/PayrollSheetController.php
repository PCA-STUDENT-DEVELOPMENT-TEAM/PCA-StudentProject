<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PayrollSheet;
use Inertia\Inertia;
use Inertia\Response;

class PayrollSheetController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $payrollSheets = PayrollSheet::all();

        return Inertia::render('Payroll/Admin/PayrollsPage/PayrollsPage', ['data' => $payrollSheets]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $payroll_name)
    {
        $validated = $request->validate([
            'payroll_name' => 'required|string|max:255',
            'payroll_type' => 'required|string|max:255',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'date_created' => 'nullable|date',
            'date_posted' => 'nullable|date',
            'date_paid' => 'nullable|date',
            'prepared_by' => 'string|required',
            'recommended_by' => 'string|required',
            'certified_by' => 'string|required',
            'approved_by' => 'string|required',
            'fund_cluster' => 'string',
            'include_deduction' => 'boolean',
        ]);

        PayrollSheet::where('payroll_name', $payroll_name)->update($validated);
        return redirect()->back()->with('success', 'Successfully stored Payroll Sheet');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
