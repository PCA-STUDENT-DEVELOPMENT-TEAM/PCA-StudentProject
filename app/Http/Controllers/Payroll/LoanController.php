<?php

namespace App\Http\Controllers\Payroll;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
// TODO : ADD CRUD FOR LOAN CONTROLLER 

class LoanController extends Controller
{
    public function index()
    {
        // Query to get employee loan details
        $loans = DB::table('employees as e')
            ->join('applied_loans as al', 'e.employee_code', '=', 'al.employee_code')
            ->join('loan_types as lt', 'al.loan_code', '=', 'lt.loan_code')
            ->select(
                // 'lt.loan_name',
                DB::raw("CONCAT(e.first_name, ' ', e.middle_name, ' ', e.last_name, ' ', COALESCE(e.name_extension, '')) AS full_name"),
                'e.employee_number',
                'al.monthly_amount',
                'al.begin_balance',
                'al.previous_paid',
                'al.paid_amount',
                // 'al.balance',
                // 'al.start_date',
                // 'al.end_date'
            )
            ->get();

        // Return the data to an Inertia view
        return Inertia::render('Payroll/Admin/LoansPage/LoansPage', [
            'employeeDetails' => $loans,
        ]);
        //json
        // return response()->json([
        //     'success' => true,
        //     'data' => $loans,
        // ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // validate request data
        $validated = $request->validate([]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update() {}

    /**
     * Remove the specified resource from storage.
     */
    public function destroy() {}
}
