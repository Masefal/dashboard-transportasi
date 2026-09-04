<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class City extends Model
{
    protected $fillable = [
        'nama_kota',
        'umr',
        'waktu_tempuh',
        'jumlah_armada',
        'kendaraan_pribadi',
        'tarif_minimum'
    ];
}
