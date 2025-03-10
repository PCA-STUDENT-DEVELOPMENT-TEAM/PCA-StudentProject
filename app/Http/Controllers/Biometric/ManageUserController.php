<?php

namespace App\Http\Controllers\Biometric;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Employee;

class ManageUserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $employees = Employee::with('position')->get();

        return Inertia::render('BioAdmin/ManageUsers', [
            'employees' => $employees,
        ]);
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
        // Validate the request data
        $validatedData = $request->validate([
            'first_name' => 'required|string|max:255',
            'middle_name' => 'nullable|string|max:255',
            'last_name' => 'required|string|max:255',
            'name_extension' => 'nullable|string|max:10',
            'device_bio_id' => 'nullable|integer',
            'salary_type' => 'required|string|max:50',
            'salary_step' => 'required|integer',
            'position_code' => 'required|string|max:50',
            'appointment_code' => 'required|string|max:50',
            'station_code' => 'required|string|max:50',
        ]);

        // Auto-generate the employee number
        $lastEmployee = \App\Models\Employee::orderBy('employee_code', 'desc')->first();
        $nextNumber = $lastEmployee ? (int) $lastEmployee->employee_number + 1 : 1;

        // Assign the auto-generated number
        $validatedData['employee_number'] = $nextNumber;


        // Check for duplicate employees based on custom logic
        $duplicateEmployee = Employee::where('first_name', $request->first_name)
            ->where('last_name', $request->last_name)
            ->where('middle_name', $request->middle_name)
            ->where('name_extension', $request->name_extension)
            ->first();

        if ($duplicateEmployee) {
            return redirect()->back()->withErrors([
                'duplicate' => 'An employee with the same name already exists.',
            ]);
        }
        // Create the employee
        $employee = Employee::create($validatedData);

        // Redirect back with a success message
        return redirect()->route('bioadmin.manageusers')->with('success', 'Employee created successfully.');
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
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
