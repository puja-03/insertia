<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class DoctorRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'lab_id' => ['nullable', 'exists:labs,id'],
            'collection_center_id' => ['nullable', 'exists:collection_centers,id'],
            'name' => ['required', 'string', 'max:255'],
            'phone' => ['nullable', 'string', 'max:20'],
            'email' => ['nullable', 'email', 'max:255'],
            'commission_type' => ['nullable', 'string', 'max:20'],
            'commission_value' => ['nullable', 'numeric'],
            'is_active' => ['sometimes', 'boolean'],
        ];
    }
}
