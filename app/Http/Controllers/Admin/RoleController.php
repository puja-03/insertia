<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\RoleRequest;
use App\Models\Role;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Str;

class RoleController extends Controller
{
    public function index(): Response
    {
        $query = Role::query();

        if ($q = request('q')) {
            $query->where('name', 'like', "%{$q}%")->orWhere('slug', 'like', "%{$q}%");
        }

        if (request()->filled('is_system')) {
            $query->where('is_system', request('is_system'));
        }

        $roles = $query->orderBy('name')->paginate(10)->withQueryString();

        return Inertia::render('admin/roles/index', [
            'roles' => $roles,
            'filters' => request()->only(['q', 'is_system']),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/roles/create');
    }

    public function store(RoleRequest $request): RedirectResponse
    {
        $data = $request->validated();
        if (empty($data['slug']) && !empty($data['name'])) {
            $data['slug'] = Str::slug($data['name']);
        }
        Role::create($data);
        return redirect()->route('admin.roles.index');
    }

    public function edit(Role $role): Response
    {
        return Inertia::render('admin/roles/edit', ['role' => $role]);
    }

    public function update(RoleRequest $request, Role $role): RedirectResponse
    {
        $data = $request->validated();
        if (empty($data['slug']) && !empty($data['name'])) {
            $data['slug'] = Str::slug($data['name']);
        }
        $role->update($data);
        return redirect()->route('admin.roles.index');
    }

    public function destroy(Role $role): RedirectResponse
    {
        $role->delete();
        return redirect()->route('admin.roles.index');
    }
}
