<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\DoctorRequest;
use App\Models\Doctor;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class DoctorController extends Controller
{
    public function __construct()
    {
        $this->middleware(function ($request, $next) {
            $user = $request->user();
            if (! $user || ! $user->hasPermission('manage-doctors')) {
                abort(403);
            }
            return $next($request);
        })->only(['create','store','edit','update','destroy','index']);
    }
    public function index(): Response
    {
        $query = Doctor::with('lab', 'collectionCenter');

        if ($q = request('q')) {
            $query->where('name', 'like', "%{$q}%")->orWhere('email', 'like', "%{$q}%")->orWhere('phone', 'like', "%{$q}%");
        }

        if ($lab = request('lab_id')) {
            $query->where('lab_id', $lab);
        }

        $doctors = $query->orderBy('name')->paginate(10)->withQueryString();

        return Inertia::render('admin/doctors/index', [
            'doctors' => $doctors,
            'filters' => request()->only(['q', 'lab_id']),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/doctors/create');
    }

    public function store(DoctorRequest $request): RedirectResponse
    {
        Doctor::create($request->validated());
        return redirect()->route('admin.doctors.index');
    }

    public function edit(Doctor $doctor): Response
    {
        return Inertia::render('admin/doctors/edit', ['doctor' => $doctor]);
    }

    public function update(DoctorRequest $request, Doctor $doctor): RedirectResponse
    {
        $doctor->update($request->validated());
        return redirect()->route('admin.doctors.index');
    }

    public function destroy(Doctor $doctor): RedirectResponse
    {
        $doctor->delete();
        return redirect()->route('admin.doctors.index');
    }
}
