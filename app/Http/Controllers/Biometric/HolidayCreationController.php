<?php

namespace App\Http\Controllers\Biometric;

use App\Http\Controllers\Controller;
use App\Models\Holiday;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HolidayCreationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $holidayData = Holiday::all();

        return Inertia::render('BioAdmin/HolidayCreation', [
            'holidayData' => $holidayData,
            'message' => 'All the leave data have been retrieved successfully.'
        ]);
    }

    public function istitk()
    {
        $holidayData = Holiday::all();

        return Inertia::render('BioAdmin/HolidayCreation', [
            'holidayData' => $holidayData,
            'message' => 'All the leave data have been retrieved successfully.'
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
            'holiday_name' => 'required|string|max:255',
            'date' => 'required|date',
            'type' => 'required|string|max:50',
            'is_recurring' => 'required|boolean',
        ]);

        // Create the holiday
        $holiday = Holiday::create($validatedData);

        // Redirect back with a success message
        return redirect()->route('bioadmin.holidaycreation')->with('success', 'Holiday created successfully.');
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
