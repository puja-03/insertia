<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\PatientRequest;
use App\Models\Patient;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class PatientController extends Controller
{
    public function __construct()
    {
        $this->middleware(function ($request, $next) {
            $user = $request->user();
            if (! $user || ! $user->hasPermission('manage-patients')) {
                abort(403);
            }
            return $next($request);
        })->only(['create','store','edit','update','destroy','index']);
    }
    public function index(): Response
    {
        $query = Patient::query();

        if ($q = request('q')) {
            $query->where('name', 'like', "%{$q}%")->orWhere('uhid', 'like', "%{$q}%")->orWhere('phone', 'like', "%{$q}%");
        }

        if ($lab = request('lab_id')) {
            $query->where('lab_id', $lab);
        }

        $patients = $query->orderBy('name')->paginate(10)->withQueryString();

        return Inertia::render('admin/patients/index', [
            'patients' => $patients,
            'filters' => request()->only(['q', 'lab_id']),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/patients/create');
    }

    public function store(PatientRequest $request): RedirectResponse
    {
        Patient::create($request->validated());
        return redirect()->route('admin.patients.index');
    }

    public function edit(Patient $patient): Response
    {
        return Inertia::render('admin/patients/edit', ['patient' => $patient]);
    }

    public function update(PatientRequest $request, Patient $patient): RedirectResponse
    {
        $patient->update($request->validated());
        return redirect()->route('admin.patients.index');
    }

    public function destroy(Patient $patient): RedirectResponse
    {
        $patient->delete();
        return redirect()->route('admin.patients.index');
    }
}
