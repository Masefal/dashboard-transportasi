<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class City extends Model
{
    use HasFactory;

    protected $fillable = [
        'nama',
        'provinsi',
        'latitude',
        'longitude',
        'umr',
        'waktu_tempuh',
        'armada_online',
        'kendaraan_pribadi',
        'tarif_min',
    ];
}