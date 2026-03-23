<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\PermissionRequest;
use App\Models\Permission;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Str;

class PermissionController extends Controller
{
    public function index(): Response
    {
        $query = Permission::query();

        if ($q = request('q')) {
            $query->where('name', 'like', "%{$q}%")->orWhere('slug', 'like', "%{$q}%");
        }

        if ($group = request('group')) {
            $query->where('group', $group);
        }

        $permissions = $query->orderBy('group')->orderBy('name')->paginate(10)->withQueryString();

        return Inertia::render('admin/permissions/index', [
            'permissions' => $permissions,
            'filters' => request()->only(['q', 'group']),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/permissions/create');
    }

    public function store(PermissionRequest $request): RedirectResponse
    {
        $data = $request->validated();
        if (empty($data['slug']) && !empty($data['name'])) {
            $data['slug'] = Str::slug($data['name']);
        }
        // Ensure group is set to default 'general' when empty to avoid DB not-null violation
        if (!array_key_exists('group', $data) || $data['group'] === null || $data['group'] === '') {
            $data['group'] = 'general';
        }
        Permission::create($data);
        return redirect()->route('admin.permissions.index');
    }

    public function edit(Permission $permission): Response
    {
        return Inertia::render('admin/permissions/edit', ['permission' => $permission]);
    }

    public function update(PermissionRequest $request, Permission $permission): RedirectResponse
    {
        $data = $request->validated();
        if (empty($data['slug']) && !empty($data['name'])) {
            $data['slug'] = Str::slug($data['name']);
        }
        // Ensure group is set to default 'general' when empty to avoid DB not-null violation
        if (!array_key_exists('group', $data) || $data['group'] === null || $data['group'] === '') {
            $data['group'] = 'general';
        }
        $permission->update($data);
        return redirect()->route('admin.permissions.index');
    }

    public function destroy(Permission $permission): RedirectResponse
    {
        $permission->delete();
        return redirect()->route('admin.permissions.index');
    }
}
