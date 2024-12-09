<?php

namespace App\Http\Controllers;

use App\Models\SalaryGrade;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class EmployeePageController extends Controller
{

    public function mydtr(): Response
    {
        return Inertia::render('Payroll/Employee/MyDTR');
    }

    public function mypayslip(): Response
    {
        return Inertia::render('Payroll/Employee/MyPayslip');
    }
}
