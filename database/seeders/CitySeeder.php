<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\City;

class CitySeeder extends Seeder
{
    public function run(): void
    {
        $cities = [
            [
                'nama' => 'Samarinda', 'provinsi' => 'Kalimantan Timur', 'latitude' => -0.5022, 'longitude' => 117.1536,
                'umr' => 3220000, 'waktu_tempuh' => 42, 'armada_online' => 150, 'kendaraan_pribadi' => 60, 'tarif_min' => 16000
            ],
            [
                'nama' => 'Surabaya', 'provinsi' => 'Jawa Timur', 'latitude' => -7.2504, 'longitude' => 112.7688,
                'umr' => 4525000, 'waktu_tempuh' => 35, 'armada_online' => 420, 'kendaraan_pribadi' => 210, 'tarif_min' => 14000
            ],
            [
                'nama' => 'Bandung', 'provinsi' => 'Jawa Barat', 'latitude' => -6.9175, 'longitude' => 107.6191,
                'umr' => 4048000, 'waktu_tempuh' => 55, 'armada_online' => 310, 'kendaraan_pribadi' => 180, 'tarif_min' => 15000
            ],
            [
                'nama' => 'Medan', 'provinsi' => 'Sumatera Utara', 'latitude' => 3.5952, 'longitude' => 98.6722,
                'umr' => 3624000, 'waktu_tempuh' => null, 'armada_online' => null, 'kendaraan_pribadi' => 120, 'tarif_min' => 12000
            ],
            [
                'nama' => 'Jakarta', 'provinsi' => 'DKI Jakarta', 'latitude' => -6.2088, 'longitude' => 106.8456,
                'umr' => 4900000, 'waktu_tempuh' => 65, 'armada_online' => 550, 'kendaraan_pribadi' => 320, 'tarif_min' => 15000
            ],
            [
                'nama' => 'Makassar', 'provinsi' => 'Sulawesi Selatan', 'latitude' => -5.1476, 'longitude' => 119.4327,
                'umr' => 3385000, 'waktu_tempuh' => 40, 'armada_online' => 180, 'kendaraan_pribadi' => 85, 'tarif_min' => 14000
            ]
        ];

        foreach ($cities as $city) {
            City::create($city);
        }
    }
}