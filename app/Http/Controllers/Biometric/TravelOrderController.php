<?php

namespace App\Http\Controllers\Biometric;

use App\Http\Controllers\Controller;
use App\Models\TravelOrder;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TravelOrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $travelOrderData = TravelOrder::all();
        return Inertia::render('BioAdmin/TravelOrder', [
            'travelOrderData' => $travelOrderData,
            'message' => 'All the travel order data have been retrieved successfully.'
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        // Validate the incoming request data
        $validatedData = $request->validate([
            'type' => 'required|string|max:255',
            'description' => 'nullable|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'file_date' => 'required|date',
            'is_approved' => 'nullable|boolean',
            'employee_number' => 'required|exists:employees,employee_number', // Assuming you have an employees table
        ]);

        // Create a new TravelOrder instance with the validated data
        $travelOrder = TravelOrder::create([
            'type' => $validatedData['type'],
            'description' => $validatedData['description'],
            'start_date' => $validatedData['start_date'],
            'end_date' => $validatedData['end_date'],
            'file_date' => $validatedData['file_date'],
            'is_approved' => $validatedData['is_approved'] ?? false, // Default to false if not provided
        ]);

        // Associate the travel order with an employee
        $travelOrder->employee()->associate($validatedData['employee_number']);
        $travelOrder->save();

        // Redirect or return a response
        return redirect()->route('bioadmin.travelorder')->with('success', 'Travel Order created successfully.');
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
