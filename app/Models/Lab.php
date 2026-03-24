<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
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
     public function doctors(): HasMany
    {
        return $this->hasMany(Doctor::class);
    }

    public function collectionCenters(): HasMany
    {
        return $this->hasMany(CollectionCenter::class);
    }

    public function users(): HasMany
    {
        return $this->hasMany(User::class);
    }

    public function permissions(): BelongsToMany
    {
        return $this->belongsToMany(Permission::class)
            ->withPivot('is_enabled')
            ->withTimestamps();
    }

}
