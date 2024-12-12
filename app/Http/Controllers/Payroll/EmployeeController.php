<?php

namespace App\Http\Controllers\Payroll;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use App\Models\Employee;
use App\Models\Position;
use App\Models\SalaryGrade;
use App\Models\Station;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        // Fetch data from the database
        $data = Employee::all();

        $stations = Station::pluck('station_name');
        $appointments = Appointment::pluck('appointment_type');
        $position = Position::pluck('position_title');
        $employee = Employee::pluck('salary_type');
        // Return the data to the frontend
        return Inertia::render('Payroll/Admin/EmployeesPage', ['data' => $data]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        /* Validating the user request. */
        $validated = $request->validate([
            'employee_number' => 'required|unique:employees|string',
            'first_name' => 'required|string',
            'middle_name' => 'required|string',
            'last_name' => 'required|string',
            'name_extension' => 'required|string',
            'salary_type' => 'required|string',
            'salary_step' => 'required|numeric|min:0',
            'position_code' => 'required',
            'appointment_code' => 'required',
            'station_code' => 'required'
        ]);

        // Create a new profile record in the database
        Employee::create([
            'employee_number' => $validated['employee_number'],
            'first_name' => $validated['first_name'],
            'middle_name' => $validated['middle_name'],
            'last_name' => $validated['last_name'],
            'name_extension' => $validated['name_extension'],
            'salary_type' => $validated['salary_type'],
            'salary_step' => $validated['salary_step'],
            'position_code' => $validated['position_code'],
            'stepappointment_code' => $validated['appointment_code'],
            'station_code' => $validated['station_code'],
        ]);

        // Redirect back or to a specific page after saving
        return redirect()->back()->with('success', 'Data saved successfully!');
    }

    /**
     * Update the specified resource in storage.
     */
    //  TODO: SA PAG UPDATE SA MGA DAPAT NAKA UNIQUE LIKE SHORTHAND DAPAT MA ADDRESS
    public function update(Request $request, string $grade)
    {
        /* Validating the user request. */
        $validated = $request->validate([
            'employee_number' => 'required|unique:employees|string',
            'first_name' => 'required|string',
            'middle_name' => 'required|string',
            'last_name' => 'required|string',
            'name_extension' => 'required|string',
            'salary_type' => 'required|string',
            'salary_step' => 'required|numeric|min:0',
            'position_code' => 'required',
            'appointment_code' => 'required',
            'station_code' => 'required'
        ]);

        Employee::where('grade', $grade)->update($validated);
        return redirect()->back()->with('success', 'Successfully stored ssl');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($grade)
    {
        // Find the record by salary_grade
        Employee::where('grade', $grade)->delete();
        return redirect()->back()->with('success', 'Successfully deleted ssl');
    }

    // custom query function
    public function get_employee_data()
    {
        $data = DB::table('employees as e')
            ->join('stations as s', 'e.station_code', '=', 's.station_code')
            ->join('appointments as a', 'e.appointment_code', '=', 'a.appointment_code')
            ->join('positions as p', 'e.position_code', '=', 'p.position_code')
            ->join('salary_grades as sg', 'p.salary_grade_code', '=', 'sg.salary_grade_code')
            ->select(
                'e.last_name',
                'e.first_name',
                'e.middle_name',
                'e.name_extension',
                's.station_name',
                'a.appointment_type',
                'p.position_title',
                'e.salary_type',
                'e.employee_number',
                'sg.grade',
                'e.salary_step',
                DB::raw("
                CASE
                    WHEN e.salary_step = '1' THEN sg.step1
                    WHEN e.salary_step = '2' THEN sg.step2
                    WHEN e.salary_step = '3' THEN sg.step3
                    WHEN e.salary_step = '4' THEN sg.step4
                    WHEN e.salary_step = '5' THEN sg.step5
                    WHEN e.salary_step = '6' THEN sg.step6
                    WHEN e.salary_step = '7' THEN sg.step7
                    WHEN e.salary_step = '8' THEN sg.step8
                    ELSE NULL
                END AS salary
            ")
            )->get();


        // return Inertia::render('Payroll/Admin/Employees', [
        //     'data' => $data
        // ]);

        return response()->json([
            'data' => $data
        ]);
    }
}
