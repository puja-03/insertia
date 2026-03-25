<?php

use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

use App\Http\Controllers\Admin\RoleController;
use App\Http\Controllers\Admin\PermissionController;
use App\Http\Controllers\Admin\LabController;
use App\Http\Controllers\Admin\DoctorController;
use App\Http\Controllers\Admin\CollectionCenterController;
use App\Http\Controllers\Admin\PatientController;

Route::prefix('admin')->name('admin.')->middleware(['auth','verified'])->group(function () {
    Route::get('roles', [RoleController::class, 'index'])->name('roles.index');
    Route::get('roles/create', [RoleController::class, 'create'])->name('roles.create');
    Route::post('roles', [RoleController::class, 'store'])->name('roles.store');
    Route::get('roles/{role}/edit', [RoleController::class, 'edit'])->name('roles.edit');
    Route::put('roles/{role}', [RoleController::class, 'update'])->name('roles.update');
    Route::delete('roles/{role}', [RoleController::class, 'destroy'])->name('roles.destroy');

    Route::get('permissions', [PermissionController::class, 'index'])->name('permissions.index');
    Route::get('permissions/create', [PermissionController::class, 'create'])->name('permissions.create');
    Route::post('permissions', [PermissionController::class, 'store'])->name('permissions.store');
    Route::get('permissions/{permission}/edit', [PermissionController::class, 'edit'])->name('permissions.edit');
    Route::put('permissions/{permission}', [PermissionController::class, 'update'])->name('permissions.update');
    Route::delete('permissions/{permission}', [PermissionController::class, 'destroy'])->name('permissions.destroy');

    // Labs
    Route::get('labs', [LabController::class, 'index'])->name('labs.index');
    Route::get('labs/create', [LabController::class, 'create'])->name('labs.create');
    Route::post('labs', [LabController::class, 'store'])->name('labs.store');
    Route::get('labs/{lab}/edit', [LabController::class, 'edit'])->name('labs.edit');
    Route::put('labs/{lab}', [LabController::class, 'update'])->name('labs.update');
    Route::delete('labs/{lab}', [LabController::class, 'destroy'])->name('labs.destroy');

    // Doctors
    Route::get('doctors', [DoctorController::class, 'index'])->name('doctors.index');
    Route::get('doctors/create', [DoctorController::class, 'create'])->name('doctors.create');
    Route::post('doctors', [DoctorController::class, 'store'])->name('doctors.store');
    Route::get('doctors/{doctor}/edit', [DoctorController::class, 'edit'])->name('doctors.edit');
    Route::put('doctors/{doctor}', [DoctorController::class, 'update'])->name('doctors.update');
    Route::delete('doctors/{doctor}', [DoctorController::class, 'destroy'])->name('doctors.destroy');

    // Collection Centers
    Route::get('collection-centers', [CollectionCenterController::class, 'index'])->name('collection-centers.index');
    Route::get('collection-centers/create', [CollectionCenterController::class, 'create'])->name('collection-centers.create');
    Route::post('collection-centers', [CollectionCenterController::class, 'store'])->name('collection-centers.store');
    Route::get('collection-centers/{collectionCenter}/edit', [CollectionCenterController::class, 'edit'])->name('collection-centers.edit');
    Route::put('collection-centers/{collectionCenter}', [CollectionCenterController::class, 'update'])->name('collection-centers.update');
    Route::delete('collection-centers/{collectionCenter}', [CollectionCenterController::class, 'destroy'])->name('collection-centers.destroy');

    // Patients
    Route::get('patients', [PatientController::class, 'index'])->name('patients.index');
    Route::get('patients/create', [PatientController::class, 'create'])->name('patients.create');
    Route::post('patients', [PatientController::class, 'store'])->name('patients.store');
    Route::get('patients/{patient}/edit', [PatientController::class, 'edit'])->name('patients.edit');
    Route::put('patients/{patient}', [PatientController::class, 'update'])->name('patients.update');
    Route::delete('patients/{patient}', [PatientController::class, 'destroy'])->name('patients.destroy');
});

require __DIR__.'/settings.php';
