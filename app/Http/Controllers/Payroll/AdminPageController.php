<?php

namespace App\Http\Controllers\Payroll;

use App\Http\Controllers\Controller;
use App\Models\SalaryGrade;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminPageController extends Controller
{

    public function index(): Response
    {
        return Inertia::render('Payroll/Admin/Dashboard');
    }

    public function compensations(): Response
    {
        return Inertia::render('Payroll/Admin/Compensations');
    }

    public function format(): Response
    {
        return Inertia::render('Payroll/Admin/Formats');
    }

    public function governmentshare(): Response
    {
        return Inertia::render('Payroll/Admin/GovernmentShares');
    }

    public function loans(): Response
    {
        return Inertia::render('Payroll/Admin/Loans');
    }
    public function payrolls(): Response
    {
        return Inertia::render('Payroll/Admin/Payrolls');
    }
    public function dashboardb(): Response
    {
        return Inertia::render('BioAdmin/Dashboard');
    }
    public function attendancelist(): Response
    {
        return Inertia::render('BioAdmin/AttendanceList');
    }

    public function attendancerecords(): Response
    {
        return Inertia::render('BioAdmin/AttendanceRecord');
    }

    public function manageusers(): Response
    {
        return Inertia::render('BioAdmin/ManageUsers');
    }
}
