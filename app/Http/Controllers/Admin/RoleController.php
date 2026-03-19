<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\RoleRequest;
use App\Models\Role;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class RoleController extends Controller
{
    public function index(): Response
    {
        $roles = Role::orderBy('name')->get();
        return Inertia::render('admin/roles/index', compact('roles'));
    }

    public function create(): Response
    {
        return Inertia::render('admin/roles/create');
    }

    public function store(RoleRequest $request): RedirectResponse
    {
        Role::create($request->validated());
        return redirect()->route('admin.roles.index');
    }

    public function edit(Role $role): Response
    {
        return Inertia::render('admin/roles/edit', ['role' => $role]);
    }

    public function update(RoleRequest $request, Role $role): RedirectResponse
    {
        $role->update($request->validated());
        return redirect()->route('admin.roles.index');
    }

    public function destroy(Role $role): RedirectResponse
    {
        $role->delete();
        return redirect()->route('admin.roles.index');
    }
}
