<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\LabRequest;
use App\Models\Lab;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class LabController extends Controller
{
    public function __construct()
    {
        $this->middleware(function ($request, $next) {
            $user = $request->user();
            if (! $user || ! $user->hasPermission('manage-labs')) {
                abort(403);
            }
            return $next($request);
        })->only(['create','store','edit','update','destroy','index']);
    }
    public function index(): Response
    {
        $query = Lab::query();

        if ($q = request('q')) {
            $query->where('name', 'like', "%{$q}%")->orWhere('code', 'like', "%{$q}%");
        }

        $labs = $query->orderBy('name')->paginate(10)->withQueryString();

        return Inertia::render('admin/labs/index', [
            'labs' => $labs,
            'filters' => request()->only(['q']),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/labs/create');
    }

    public function store(LabRequest $request): RedirectResponse
    {
        Lab::create($request->validated());
        return redirect()->route('admin.labs.index');
    }

    public function edit(Lab $lab): Response
    {
        return Inertia::render('admin/labs/edit', ['lab' => $lab]);
    }

    public function update(LabRequest $request, Lab $lab): RedirectResponse
    {
        $lab->update($request->validated());
        return redirect()->route('admin.labs.index');
    }

    public function destroy(Lab $lab): RedirectResponse
    {
        $lab->delete();
        return redirect()->route('admin.labs.index');
    }
}
