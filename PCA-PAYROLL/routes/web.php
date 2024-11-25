<?php

use App\Http\Controllers\AdminPageController;
use App\Http\Controllers\BioAdminPageController;
use App\Http\Controllers\Biometric\DashboardController;
use App\Http\Controllers\Biometric\AttendanceListController;
use App\Http\Controllers\Biometric\AttendanceRecordController;
use App\Http\Controllers\Biometric\ManageUserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\SSLController;

Route::get('/', function () {
    return Inertia::render('Auth/Login', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});


// // Route for storing SSL data
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

////////////////////////////////bio routes
Route::domain('biometric.' . env('APP_URL'))->group(
    function () {
        Route::middleware(['auth'])->group(
            function () {
                // Route::get('dashboard', [DashboardController::class, 'index'])->name('bioadmin.dashboard');
                Route::get('attendancelist', [AttendanceListController::class, 'index'])->name('bioadmin.attendancelist');
                Route::get('attendancerecord', [AttendanceRecordController::class, 'index'])->name('bioadmin.attendancerecord');
                Route::get('manageuser', [AttendanceRecordController::class, 'index'])->name('bioadmin.manageuser');
            }
        );
    }
);
// Route::prefix('admin')->group(function () {
//     Route::get('dashboard', [DashboardController::class, 'index'])->name('bioadmin.dashboard');
// });

// Route::prefix('bioadmin')->middleware(['auth'])->group(function () {
//     Route::get('dashboard', [DashboardController::class, 'index'])->name('bioadmin.dashboard');
//     Route::get('attendancelist', [AttendanceListController::class, 'index'])->name('bioadmin.attendancelist');
//     Route::get('attendancerecord', [AttendanceRecordController::class, 'index'])->name('bioadmin.attendancerecord');
//     Route::get('manageuser', [AttendanceRecordController::class, 'index'])->name('bioadmin.manageuser');
// });

Route::middleware(['auth'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('bioadmin.dashboard');
    Route::get('attendancelists', [AttendanceListController::class, 'index'])->name('bioadmin.attendancelists');
    Route::get('attendancerecords', [AttendanceRecordController::class, 'index'])->name('bioadmin.attendancerecords');
    Route::get('manageusers', [ManageUserController::class, 'index'])->name('bioadmin.manageusers');
});
// Route::get('/dashboard', [DashboardController::class, 'index'])->name('bioadmin.dashboard');




// Route::get(
//     'dashboard',
//     function () {
//         return Inertia::render('BioAdmin/Dashboard');
//     }
// )->name('bioadmin.dashboard');

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
    //bioadmins
    // Route::get('dashboardb', [AdminPageController::class, 'dashboardb'])->name('admin.dashboardb');
    // Route::get('attendancelist', [AdminPageController::class, 'attendancelist'])->name('admin.attendancelist');
    // Route::get('attendancerecords', [AdminPageController::class, 'attendancerecords'])->name('admin.attendancerecords');
    // Route::get('manageusers', [AdminPageController::class, 'manageusers'])->name('admin.manageusers');

    // Route::get('ssl', [AdminPageController::class, 'ssl'])->name('admin.ssl');
    // Route::post('ssl/store', [AdminPageController::class, 'ssl_addData'])->name('store.ssl');
    // Route::put('/ssl/{salary_grade}', [AdminPageController::class, 'update'])->name('ssl.update');
});
///


// SSL CRUD
Route::prefix('admin')->group(function () {
    Route::get('ssl', [SSLController::class, 'index'])->name('admin.ssl');
    Route::post('ssl/store', [SSLController::class, 'store'])->name('store.ssl');
    Route::put('/ssl/{salary_grade}', [SSLController::class, 'update'])->name('update.ssl');
});


require __DIR__ . '/auth.php';
