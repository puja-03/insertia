<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\PermissionRequest;
use App\Models\Permission;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PermissionController extends Controller
{
    public function index(): Response
    {
        $permissions = Permission::orderBy('group')->orderBy('name')->get();
        return Inertia::render('admin/permissions/index', compact('permissions'));
    }

    public function create(): Response
    {
        return Inertia::render('admin/permissions/create');
    }

    public function store(PermissionRequest $request): RedirectResponse
    {
        Permission::create($request->validated());
        return redirect()->route('admin.permissions.index');
    }

    public function edit(Permission $permission): Response
    {
        return Inertia::render('admin/permissions/edit', ['permission' => $permission]);
    }

    public function update(PermissionRequest $request, Permission $permission): RedirectResponse
    {
        $permission->update($request->validated());
        return redirect()->route('admin.permissions.index');
    }

    public function destroy(Permission $permission): RedirectResponse
    {
        $permission->delete();
        return redirect()->route('admin.permissions.index');
    }
}
