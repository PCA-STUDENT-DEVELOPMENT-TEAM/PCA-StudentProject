<?php

use App\Http\Controllers\AdminPageController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SSLController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Auth/Login', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});


// Admin Routes
Route::middleware(['auth', 'verified','usercheck:2'])->group(function () {
    Route::get('/admin/dashboard', [AdminPageController::class, 'index'])->name('admin.dashboard');
    Route::get('/admin/payroll', [AdminPageController::class, 'payrolls'])->name('admin.payroll');
    Route::get('/admin/loans', [AdminPageController::class, 'loans'])->name('admin.loans');
    Route::get('/admin/employees', [AdminPageController::class, 'employees'])->name('admin.employees');
    Route::get('/admin/compensations', [AdminPageController::class, 'compensations'])->name('admin.compensations');
    Route::get('/admin/deductions', [AdminPageController::class, 'deduction'])->name('admin.deductions');
    Route::get('/admin/governmentshare', [AdminPageController::class, 'governmentshare'])->name('admin.governmentshare');
    Route::get('/admin/formats', [AdminPageController::class, 'format'])->name('admin.formats');
    Route::get('/admin/appointments',[AdminPageController::class,'appointments'])->name('admin.appointments');
    Route::post('/admin/ssl/store', [AdminPageController::class, 'ssl_addData'])->name('store.ssl');
});

// Employee Routes

//Soon





require __DIR__ . '/auth.php';
