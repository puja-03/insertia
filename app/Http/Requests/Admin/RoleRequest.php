<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class RoleRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    public function rules(): array
    {
        $roleId = $this->route('role')?->id ?? null;

        return [
            'name' => ['required', 'string', 'max:120'],
            'slug' => ['required', 'string', 'max:120', 'unique:roles,slug' . ($roleId ? ',' . $roleId : '')],
            'description' => ['nullable', 'string', 'max:255'],
            'is_system' => ['sometimes', 'boolean'],
        ];
    }
}
