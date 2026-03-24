<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;     

class CollectionCenter extends Model
{
    protected $fillable = [
        'lab_id',
        'name',
        'phone',
        'address',
        'commission_type',
        'commission_value',
        'price_margin_type',
        'price_margin_value',
        'is_active',
    ];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'commission_value' => 'decimal:2',
            'price_margin_value' => 'decimal:2',
            'is_active' => 'boolean',
        ];
    }
    public function lab(): BelongsTo
    {
        return $this->belongsTo(Lab::class);
    }

    public function users(): HasMany
    {
        return $this->hasMany(User::class);
    }

    public function doctors(): HasMany
    {
        return $this->hasMany(Doctor::class);
    }
}
