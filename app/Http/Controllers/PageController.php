<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class PageController extends Controller
{
    // Render the homepage
    public function testingPage()
    {
        return Inertia::render('testPage');
    }

    public function mydtr()
    {
        return Inertia::render('Payroll/Employee/MyDTR');
    }

    public function mypayslip()
    {
        return Inertia::render(component: 'Payroll/Employee/MyPayslip');
    }
}
