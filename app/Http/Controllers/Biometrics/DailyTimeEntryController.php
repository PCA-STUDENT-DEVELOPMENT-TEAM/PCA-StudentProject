<?php

namespace App\Http\Controllers\Biometrics;

use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use App\Models\DailyTimeEntry;
use App\Models\Employee;
use Inertia\Inertia;
use Inertia\Response;
use Exception;
use DateTime;
use App\Libraries\ZKLibrary;

class DailyTimeEntryController extends Controller
{

	/* Retrieves all the current DTRs within the system. */
    public function index(): Response {
		/* Fetching all the entries stored within the database. */
		$allData = DailyTimeEntry::all();

		/* Returning a success message to the user. */
		return Inertia::render('BioAdmin/AttendanceList', ['allData' => $allData, 'message' => 'All the DTR entries have been retrieved successfully.']);
    }

    /* Generates a new batch of empty DTRs for all the employees in the system.
		If there are no employees, or if the date has not changed, then a new batch is not made. */

		protected $zk;

public function generateNewBatch()
{
    $this->zk = new ZKLibrary(env('BIOM_IP'), env('BIOM_PORT'));

    $currentDate = date('Y-m-d');
    $recentDate = DailyTimeEntry::latest()->first()->date ?? null;

    /* Checking if today matches the most recent DTR entry */
    if ($recentDate == $currentDate) {
        return;
    }

    try {
        $this->zk->connect();
        $this->zk->disableDevice();

        // Fetch all logs from the device
        $logs = $this->zk->getAttendance();

        // Time range boundaries
        $morningStart = new DateTime('08:00:00');
        $morningEnd = new DateTime('12:00:00');
        $afternoonStart = new DateTime('13:00:00');
        $afternoonEnd = new DateTime('17:00:00');

        foreach ($logs as $log) {
            try {
                // Extract log details
                $employeeNumber = $log[1];
                $logDateTime = new DateTime($log[3]);
                $logTime = $logDateTime->format('H:i:s');
                $logDate = $logDateTime->format('Y-m-d');
                $logType = $log[2]; // 0, 1, 4, 5

                // Find the employee by number
                $employee = Employee::where('employee_number', $employeeNumber)->first();

                if (!$employee) {
                    throw new Exception("Employee with employee_number {$employeeNumber} not found.");
                }

                // Find or create the time entry for this employee on this date
                $timeEntry = DailyTimeEntry::firstOrNew([
                    'date' => $logDate,
                    'employee_code' => $employee->employee_code
                ]);

								// Set default values for required fields
                if (!$timeEntry->exists) {
									$timeEntry->tardy_minutes = 1; // Default value
									$timeEntry->undertime_minutes = 0;
									$timeEntry->work_minutes = 0;
							}

                // Determine the field to update based on the log type and time
                if (in_array($logType, [0, 4])) { // Time in
                    if ($logTime >= $morningStart->format('H:i:s') && $logTime <= $morningEnd->format('H:i:s')) {
                        $timeEntry->time_in_am = $logTime;
                    } elseif ($logTime >= $afternoonStart->format('H:i:s') && $logTime <= $afternoonEnd->format('H:i:s')) {
                        $timeEntry->time_in_pm = $logTime;
                    }
                } elseif (in_array($logType, [1, 5])) { // Time out
                    if ($logTime >= $morningStart->format('H:i:s') && $logTime <= $morningEnd->format('H:i:s')) {
                        $timeEntry->time_out_am = $logTime;
                    } elseif ($logTime >= $afternoonStart->format('H:i:s') && $logTime <= $afternoonEnd->format('H:i:s')) {
                        $timeEntry->time_out_pm = $logTime;
                    }
                }

                // Save the time entry
                $timeEntry->save();

            } catch (Exception $e) {
                // Log errors for this specific log entry
                echo "Error processing log entry: " . $e->getMessage() . "\n";
                continue;
            }
        }

        $this->zk->enableDevice();
        $this->zk->disconnect();
    } catch (Exception $e) {
        // Handle connection or device-related errors
        echo "Device error: " . $e->getMessage() . "\n";
    }

    return;
}


	/* Creates and stores a single new daily_time_entries record. */
	public function store(Request $request) {
		/* Validating the request entries. */
		$validatedRequest = $request;

		/* Creating a new record.
			The dtr_entry_code is automatically formed upon creation. */
		DailyTimeEntry::create([
			'date' => date('Y-m-d'),
			'time_in_am' => $validatedRequest['time_in_am'],
			'time_out_am' => $validatedRequest['time_out_am'],
			'time_in_pm' => $validatedRequest['time_in_pm'],
			'time_out_pm' => $validatedRequest['time_out_pm'],
			'tardy_minutes' => $validatedRequest['tardy_minutes'],
			'undertime_minutes' => $validatedRequest['undertime_minutes'],
			'work_minutes' => $validatedRequest['work_minutes'],
			'employee_code' => $validatedRequest['employee_code']
		]);

		/* Returning a success message to the user. */
		return redirect()->back()->with('success', 'The new DTR entry was successfully saved.');
	}

    /* Displays a single DTR entry. */
    public function show(int $dtr_entry_code)
    {
		return DailyTimeEntry::where('dtr_entry_code', $dtr_entry_code);
    }

    /* Updates a single DTR entry. */
    public function update(Request $request, int $dtr_entry_code)
    {
		/* Validating the request entries. */
		$validatedRequest = $request;

		/* Finding and updating the record within the database. */
		DailyTimeEntry::where('dtr_entry_code', $dtr_entry_code)->update($validatedRequest);

		/* Returning a success message to the user. */
        return redirect()->back()->with('success', 'Successfully updated your chosen DTR entry.');
    }

    /* Deletes a single DTR entry. */
    public function destroy(int $dtr_entry_code)
    {
        /* Finding and deleting the record within the database. */
        DailyTimeEntry::where('dtr_entry_code', $dtr_entry_code)->delete();

		/* Returning a success message to the user. */
        return redirect()->back()->with('success', 'Successfully deleted your chosen DTR entry.');
    }

    public function showDtrEntries(Request $request)
    {

        // Validate the incoming request
        $validated = $request->validate([
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date', // Ensure end_date is after or equal to start_date
        ]);

        // Retrieve the start and end date from the request
        $startDate = $validated['start_date'];
        $endDate = $validated['end_date'];

        // Query the DTR entries within the given date range
        $dtrEntries = DailyTimeEntry::whereBetween('date', [$startDate, $endDate])
                              ->orderBy('date', 'asc') // Optionally order by date
                              ->get();

        // Return the entries (you can return a view or JSON response based on your need)
        return view('dtr.entries', compact('dtrEntries')); // For a Blade view
        // or
        // return response()->json($dtrEntries); // For an API response
    }
}
