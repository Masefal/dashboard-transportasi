<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\City;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ApiCityController extends Controller
{
    /**
     * Get detail of a specific city.
     * Often used when a city is clicked on the frontend map.
     */
    public function show($id): JsonResponse
    {
        $city = City::find($id);

        if (!$city) {
            return response()->json([
                'success' => false,
                'message' => 'City not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $city
        ]);
    }

    /**
     * Get chart data (Top UMR and Top Waktu Tempuh).
     */
    public function chartData(): JsonResponse
    {
        // Top 5 cities by UMR
        $topUmr = City::orderBy('umr', 'desc')
            ->take(5)
            ->get(['id', 'nama_kota', 'umr']);

        // Top 5 cities by Waktu Tempuh
        $topWaktuTempuh = City::orderBy('waktu_tempuh', 'desc')
            ->take(5)
            ->get(['id', 'nama_kota', 'waktu_tempuh']);

        return response()->json([
            'success' => true,
            'data' => [
                'top_umr' => $topUmr,
                'top_waktu_tempuh' => $topWaktuTempuh
            ]
        ]);
    }
}
