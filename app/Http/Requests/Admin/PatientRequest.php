<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class PatientRequest extends FormRequest
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
            'uhid' => ['nullable', 'string', 'max:100'],
            'name' => ['required', 'string', 'max:255'],
            'phone' => ['nullable', 'string', 'max:20'],
            'email' => ['nullable', 'email', 'max:255'],
            'date_of_birth' => ['nullable', 'date'],
            'age_years' => ['nullable', 'integer'],
            'age_months' => ['nullable', 'integer'],
            'age_days' => ['nullable', 'integer'],
        ];
    }
}
