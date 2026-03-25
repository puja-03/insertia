<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class CollectionCenterRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'lab_id' => ['nullable', 'exists:labs,id'],
            'name' => ['required', 'string', 'max:255'],
            'phone' => ['nullable', 'string', 'max:20'],
            'address' => ['nullable', 'string', 'max:1000'],
            'commission_type' => ['nullable', 'string', 'max:20'],
            'commission_value' => ['nullable', 'numeric'],
            'is_active' => ['sometimes', 'boolean'],
        ];
    }
}
