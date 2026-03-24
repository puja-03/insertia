<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Lab extends Model
{
    protected $fillable = [
        'name',
        'code',
        'phone',
        'is_active',
        // Basic Information
        'logo_path',
        'email',
        'website',
        'established_year',
        // Address Information
        'address',
        'city',
        'state',
        'pincode',
        'nearest_location',
        // Payment Information
        // 'payment_receive_account',
        // 'upi_qr_code_path',
        // Booking Information
        'online_booking_available',
        'home_sample_collection',
        // Legal Information
        // 'gst_number',
        // 'lab_license_number',
        // 'lab_director_name',
        // Technician Information
        // 'technician_name',
        // 'technician_qualification',
        // 'technician_license_number',
        // 'technician_signature_path',
    ];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
            'online_booking_available' => 'boolean',
            'home_sample_collection' => 'boolean',
        ];
    }

}
