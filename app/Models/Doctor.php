<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Doctor extends Model
{
    protected $fillable = [
        'lab_id',
        'collection_center_id',
        'name',
        'phone',
        'email',
        'doctor_type',
        'specialization',
        'can_approve_reports',
        'consultation_fee',
        'commission_type',
        'commission_value',
        'is_active',
    ];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'commission_value' => 'decimal:2',
            'consultation_fee' => 'decimal:2',
            'can_approve_reports' => 'boolean',
            'is_active' => 'boolean',
        ];
    }

}
