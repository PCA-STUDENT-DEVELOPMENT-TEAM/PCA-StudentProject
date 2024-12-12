<?php

namespace App\Http\Controllers\Biometric;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\DailyTimeEntry;

class AttendanceListController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
		/* Fetching all the entries stored within the database. */
		$allData = DailyTimeEntry::all();

		/* Returning a success message to the user. */
		return Inertia::render('BioAdmin/AttendanceList', ['allData' => $allData, 'message' => 'All the DTR entries have been retrieved successfully.']);
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
