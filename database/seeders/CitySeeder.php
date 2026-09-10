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
                'nama_kota' => 'Jakarta',
                'umr' => 5067381,
                'waktu_tempuh' => 1531,
                'jumlah_armada' => 1000000,
                'kendaraan_pribadi' => 24356669,
                'tarif_minimum' => 10500,
            ],
            [
                'nama_kota' => 'Surabaya',
                'umr' => 4725479,
                'waktu_tempuh' => 1619,
                'jumlah_armada' => 15350,
                'kendaraan_pribadi' => 3810000,
                'tarif_minimum' => 8000,
            ],
            [
                'nama_kota' => 'Bandung',
                'umr' => 4338274,
                'waktu_tempuh' => 1957,
                'jumlah_armada' => 30000,
                'kendaraan_pribadi' => 2360000,
                'tarif_minimum' => 8000,
            ],
            [
                'nama_kota' => 'Medan',
                'umr' => 3769082,
                'waktu_tempuh' => 1923,
                'jumlah_armada' => 2000,
                'kendaraan_pribadi' => 3690000,
                'tarif_minimum' => 8000,
            ],
            [
                'nama_kota' => 'Palembang',
                'umr' => 3680000,
                'waktu_tempuh' => 1675,
                'jumlah_armada' => 25000,
                'kendaraan_pribadi' => 1640000,
                'tarif_minimum' => 8000,
            ],
        ];

        foreach ($cities as $city) {
            City::create($city);
        }
    }
}
