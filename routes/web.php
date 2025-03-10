<?php

use App\Http\Controllers\Biometric\DashboardController;
use App\Http\Controllers\Biometric\AttendanceListController;
use App\Http\Controllers\Biometric\AttendanceRecordController;
use App\Http\Controllers\Biometric\ManageUserController;
use App\Http\Controllers\Payroll\PayrollSheetController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


// Controllers: Payroll
use App\Http\Controllers\Payroll\AdminPageController;
use App\Http\Controllers\Payroll\SalaryGradeController;
use App\Http\Controllers\Payroll\AgencyShareController;
use App\Http\Controllers\Payroll\AppointmentController;
use App\Http\Controllers\Payroll\CompensationTypeController;
use App\Http\Controllers\Payroll\DeductionTypeController;
use App\Http\Controllers\Payroll\EmployeeController;
use App\Http\Controllers\Payroll\LoanController;
use App\Http\Controllers\Payroll\SummaryController;
use App\Http\Controllers\Payroll\PayrollController;

// Controllers: Biometrics
use App\Http\Controllers\Biometrics\DailyTimeEntryController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\Biometric\HolidayCreationController;
use App\Http\Controllers\Biometric\LeaveOrderController;
use App\Http\Controllers\Biometric\TravelOrderController;

Route::get('/autogenerate-today', [DailyTimeEntryController::class, 'generateNewBatch'])->name('generate-DTRs');

// SUBDOMAIN FOR BIOADMIN
Route::domain('bioadmin.' . env('APP_URL'))->group(
    function () {
        // Route::prefix('admin')->middleware(['auth'], ['role']=="admin)->group( 
        Route::prefix('admin')->middleware(['auth'])->group(
            function () {
                // bioadmin.localhost:8000/admin/dashboard -> route
                Route::get('dashboard', [DashboardController::class, 'index'])->name('bioadmin.dashboard');
                Route::get('attendancelists', [AttendanceListController::class, 'index'])->name('bioadmin.attendancelists'); //attendance report
                Route::get('fetchlogs', [AttendanceListController::class, 'fetchLogs'])->name('bioadmin.fetchLogs'); // dinako oy
                // Route::get('autogenerate-today', [DailyTimeEntryController::class, 'generateNewBatch'])->name('generate-DTRs'); ala namani
                Route::get('attendancerecords', [AttendanceRecordController::class, 'index'])->name('bioadmin.attendancerecords'); //employeedtr
                Route::get('attendancecharls', [AttendanceRecordController::class, 'charls'])->name('charls.bioadmin.attendancerecords'); //employeedtr
                Route::get('manageusers', [ManageUserController::class, 'index'])->name('bioadmin.manageusers');
                // Route::post('manageusers', [ManageUserController::class, 'store'])->name('store.bioadmin.manageusers');
                Route::get('travelorder', [TravelOrderController::class, 'index'])->name('bioadmin.travelorder');
                Route::post('travelorder', [TravelOrderController::class, 'store'])->name('store.bioadmin.travelorder');
                Route::get('leaveorder', [LeaveOrderController::class, 'index'])->name('bioadmin.leaveorder');
                Route::get('holidaycreation', [HolidayCreationController::class, 'index'])->name('bioadmin.holidaycreation');
                Route::post('holidaycreation', [HolidayCreationController::class, 'store'])->name('store.bioadmin.holidaycreation');
                Route::get('holidayistitik', [HolidayCreationController::class, 'istitik'])->name('istitik.bioadmin.holidaycreation');
            }
        );
        // Route::prefix('superadmin')->middleware(['auth'], ['role']=="superadmin")->group( 
        // bioadmin.localhost:8000/superadmin/dashboard -> route
        // Route::prefix('employee')->middleware(['auth'], ['role']=="employee")->group( 

    }
);

// ->middleware(['auth'])
// SUBDOMAIN FOR PAYROLL
Route::domain('payroll.' . env('APP_URL'))->group(function () {

    Route::get('test', [AdminPageController::class, 'format'])->name('admin.formats');
    Route::get('login', function () {
        return Inertia::render("Payroll/LoginPage");
    })->name('payroll.login')->middleware('prevent.auth.access');

    Route::prefix('admin')->middleware(['auth'])->group(function () {
        // Route::prefix('admin')->group(function () {
        Route::get('dashboard', [AdminPageController::class, 'index'])->name('admin.dashboard');
        // PAYROLL ROUTES
        Route::get('payroll', [SummaryController::class, 'Summary'])->name('admin.payrolls');

        // LOANS ROUTES
        Route::get('loans', [AdminPageController::class, 'loans'])->name('admin.loans');
        Route::get('loans', [LoanController::class, 'index'])->name('admin.loans');

        // COMPENSATION ROUTES
        Route::get('compensations', [CompensationTypeController::class, 'index'])->name('admin.compensations');
        Route::post('compensations/store', [CompensationTypeController::class, 'store'])->name('store.compensations');
        Route::put('compensations/{compensation_code}', [CompensationTypeController::class, 'update'])->name('update.compensations');
        Route::delete('compensations/{compensation_code}', [CompensationTypeController::class, 'destroy'])->name('delete.compensations');

        // AGENCY ROUTES
        Route::get('governmentshares', [AgencyShareController::class, 'index'])->name('admin.governmentshare');
        Route::post('governmentshares/store', [AgencyShareController::class, 'store'])->name('store.governmentshare');
        Route::put('governmentshares/{agency_share_name}', [AgencyShareController::class, 'update'])->name('update.governmentshare');
        Route::delete('governmentshares/{agency_share_name}', [AgencyShareController::class, 'destroy'])->name('delete.governmentshare');

        // APPOINTMENT ROUTES
        Route::get('appointments', [AppointmentController::class, 'index'])->name('admin.appointment');
        Route::post('appointments/store', [AppointmentController::class, 'store'])->name('store.appointment');
        Route::put('appointments/{appointment_code}', [AppointmentController::class, 'update'])->name('update.appointment');
        Route::delete('appointments/{appointment_code}', [AppointmentController::class, 'destroy'])->name('delete.appointment');

        // DEDUCTIONS ROUTES
        Route::get('deductions', [DeductionTypeController::class, 'index'])->name('admin.deduction');
        Route::post('deductions/store', [DeductionTypeController::class, 'store'])->name('store.deduction');
        Route::put('deductions/{deduction_code}', [DeductionTypeController::class, 'update'])->name('update.deduction');
        Route::delete('deductions/{deduction_code}', [DeductionTypeController::class, 'destroy'])->name('delete.deduction');

        // EMPLOYEES ROUTES
        Route::get('employees', [EmployeeController::class, 'index'])->name('admin.employee');
        Route::put('employees/{employee_code}', [EmployeeController::class, 'update'])->name('update.employee');

        // SSL ROUTES
        Route::get('ssl', [SalaryGradeController::class, 'index'])->name('admin.ssl');
        Route::post('ssl/store', [SalaryGradeController::class, 'store'])->name('store.ssl');
        Route::put('ssl/{grade}', [SalaryGradeController::class, 'update'])->name('update.ssl');
        Route::delete('ssl/{grade}', [SalaryGradeController::class, 'destroy'])->name('delete.ssl');

        //Query routes
        Route::get('/test', [PageController::class, 'testingPage']);
        // Route::get('employee/{employee_code}', [EmployeeController::class, 'get_employee_data'])->name('admin.employee_data');
        Route::get('/employeelist', [PayrollSheetController::class, 'get_employees'])->name('admin.get_employee_data');

        //export to excel
        Route::get('/export-salary-grades', [SalaryGradeController::class, 'exportToExcel'])->name('export.salary_grades');
        Route::get('/export-payroll-function', [PayrollsheetController::class, 'exportPayrollFunction'])->name('export.payroll.function');
        Route::get('/export-payroll-entries', [PayrollController::class, 'exportPayrollEntries'])->name('export.payroll.entries');

        Route::get('/employee/{id}', [PayrollSheetController::class, 'get_employee'])->name('admin.get_employee');
        Route::get('/compensationTypes', [PayrollSheetController::class, 'get_all_compensatation_types'])->name('admin.get_all_compensations');
    });

    Route::prefix('employee')->group(function () {
        Route::get('mydtr', [PageController::class, 'mydtr'])->name('employee.mydtr');
        Route::get('mypayslip', [PageController::class, 'mypayslip'])->name('employee.mypayslip');
    });
    Route::fallback(function () {
        return redirect()->route('payroll.login');
    });
});


require __DIR__ . '/auth.php';
