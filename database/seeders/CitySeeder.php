<?php

namespace Database\Seeders;

use App\Models\City;
use Illuminate\Database\Seeder;

class CitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $cities = [
            [
                'nama_kota' => 'DKI Jakarta',
                'umr' => 5067381.00,
                'waktu_tempuh' => 1957.00, // detik/km
                'jumlah_armada' => 1500,
                'kendaraan_pribadi' => 5000000,
                'tarif_minimum' => 15000.00,
            ],
            [
                'nama_kota' => 'Surabaya',
                'umr' => 4725479.00,
                'waktu_tempuh' => 1840.50,
                'jumlah_armada' => 800,
                'kendaraan_pribadi' => 2000000,
                'tarif_minimum' => 14000.00,
            ],
            [
                'nama_kota' => 'Bandung',
                'umr' => 4338274.00,
                'waktu_tempuh' => 2100.00,
                'jumlah_armada' => 600,
                'kendaraan_pribadi' => 1500000,
                'tarif_minimum' => 13000.00,
            ],
            [
                'nama_kota' => 'Medan',
                'umr' => 3769082.00,
                'waktu_tempuh' => 1750.00,
                'jumlah_armada' => 500,
                'kendaraan_pribadi' => 1200000,
                'tarif_minimum' => 12000.00,
            ],
            [
                'nama_kota' => 'Samarinda',
                'umr' => 3497124.00,
                'waktu_tempuh' => 1600.00,
                'jumlah_armada' => 150,
                'kendaraan_pribadi' => 300000,
                'tarif_minimum' => 16000.00,
            ],
        ];

        foreach ($cities as $city) {
            City::create($city);
        }
    }
}
