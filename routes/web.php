<?php

use App\Http\Controllers\AdminPageController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\SSLController;

Route::get('/', function () {
    return Inertia::render('Payroll/Auth/Login', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});


// Route for storing SSL data
// Route::post('/admin/ssl/store', [AdminPageController::class, 'ssl_addData'])->name('store.ssl');

// Route::get('/admin/dashboard', function () {
//     return Inertia::render('Admin/Dashboard');
// })->middleware('auth', 'verified', 'usercheck:admin')->name('admin.dashboard');

// Route::get('/admin/salary', function () {
//     return Inertia::render('Admin/Salary');
// })->middleware('auth', 'verified', 'usercheck:admin')->name('admin.salary');

// Route::get('/admin/benefits', function () {
//     return Inertia::render('Admin/Benefits');
// })->middleware('auth', 'verified', 'usercheck:admin')->name('admin.benefits');

// Route::get('/admin/loans', function () {
//     return Inertia::render('Admin/Loans');
// })->middleware('auth', 'verified', 'usercheck:admin')->name('admin.loans');

// Route::get('/admin/records', function () {
//     return Inertia::render('Admin/Records');
// })->middleware('auth', 'verified', 'usercheck:admin')->name('admin.records');

// Route::get('/admin/designations', function () {
//     return Inertia::render('Admin/Designations');
// })->middleware('auth', 'verified', 'usercheck:admin')->name('admin.designations');

// Route::get('/admin/compensations', function () {
//     return Inertia::render('Admin/Compensations');
// })->middleware('auth', 'verified', 'usercheck:admin')->name('admin.compensations');

// Route::get('/admin/deductions', function () {
//     return Inertia::render('Admin/Deductions');
// })->middleware('auth', 'verified', 'usercheck:admin')->name('admin.deductions');




// Empoyee Routes

// Route::get('/employee/dashboard', function () {
//     return Inertia::render('Employee/Dashboard');
// })->middleware('auth', 'verified', 'usercheck:employee')->name('employee.dashboard');

// Route::get('/employee/salary', function () {
//     return Inertia::render('Employee/Salary');
// })->middleware('auth', 'verified', 'usercheck:employee')->name('employee.salary');

// Route::get('/employee/benefits', function () {
//     return Inertia::render('Employee/Benefits');
// })->middleware('auth', 'verified', 'usercheck:employee')->name('employee.benefits');

// Route::get('/employee/loans', function () {
//     return Inertia::render('Employee/Loans');
// })->middleware('auth', 'verified', 'usercheck:employee')->name('employee.loans');

// Route::get('/employee/records', function () {
//     return Inertia::render('Employee/Records');
// })->middleware('auth', 'verified', 'usercheck:employee')->name('employee.records');

// Route::get('/employee/designations', function () {
//     return Inertia::render('Employee/Designations');
// })->middleware('auth', 'verified', 'usercheck:employee')->name('employee.designations');

// Route::get('/employee/compensations', function () {
//     return Inertia::render('Employee/Compensations');
// })->middleware('auth', 'verified', 'usercheck:employee')->name('employee.compensations');

// Route::get('/employee/deductions', function () {
//     return Inertia::render('Employee/Deductions');
// })->middleware('auth', 'verified', 'usercheck:employee')->name('employee.deductions');


// SUBDOMAIN FOR PAYROLL
Route::domain('payroll.' . env('APP_URL'))->group(function () {
    Route::prefix('admin')->group(function () {
        Route::get('dashboard', [AdminPageController::class, 'index'])->name('admin.dashboard');
        Route::get('payrolls', [AdminPageController::class, 'payrolls'])->name('admin.payrolls');
        Route::get('loans', [AdminPageController::class, 'loans'])->name('admin.loans');
        Route::get('employees', [AdminPageController::class, 'employees'])->name('admin.employees');
        Route::get('compensations', [AdminPageController::class, 'compensations'])->name('admin.compensations');
        Route::get('deductions', [AdminPageController::class, 'deductions'])->name('admin.deductions');
        Route::get('governmentshare', [AdminPageController::class, 'governmentshare'])->name('admin.governmentshare');
        Route::get('formats', [AdminPageController::class, 'format'])->name('admin.formats');
        Route::get('appointments', [AdminPageController::class, 'appointments'])->name('admin.appointments');
    });

    // SSL CRUD
    Route::prefix('admin')->group(function () {
        Route::get('ssl', [SSLController::class, 'index'])->name('admin.ssl');
        Route::post('ssl/store', [SSLController::class, 'store'])->name('store.ssl');
        Route::put('/ssl/{salary_grade}', [SSLController::class, 'update'])->name('update.ssl');
        Route::delete('/ssl/{salary_grade}', [SSLController::class, 'destroy'])->name('delete.ssl');
    });
});

Route::get('/test', function () {
    return Inertia::render('Payroll/TestPage');
});


require __DIR__ . '/auth.php';
