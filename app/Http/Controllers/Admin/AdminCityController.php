<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\City;
use Illuminate\Http\Request;

class AdminCityController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $cities = City::orderBy('id', 'desc')->get();
        // Since frontend is handled separately, we could return JSON or a basic view.
        // Returning JSON is safest if this is an API-only backend for Admin as well.
        // Assuming admin also consumes API:
        return response()->json([
            'success' => true,
            'data' => $cities
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama_kota' => 'required|string|max:255',
            'umr' => 'nullable|numeric|min:0',
            'waktu_tempuh' => 'nullable|numeric|min:0',
            'jumlah_armada' => 'nullable|integer|min:0',
            'kendaraan_pribadi' => 'nullable|integer|min:0',
            'tarif_minimum' => 'nullable|numeric|min:0',
        ]);

        $city = City::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'City created successfully',
            'data' => $city
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $city = City::findOrFail($id);
        return response()->json([
            'success' => true,
            'data' => $city
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $city = City::findOrFail($id);

        $validated = $request->validate([
            'nama_kota' => 'required|string|max:255',
            'umr' => 'nullable|numeric|min:0',
            'waktu_tempuh' => 'nullable|numeric|min:0',
            'jumlah_armada' => 'nullable|integer|min:0',
            'kendaraan_pribadi' => 'nullable|integer|min:0',
            'tarif_minimum' => 'nullable|numeric|min:0',
        ]);

        $city->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'City updated successfully',
            'data' => $city
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $city = City::findOrFail($id);
        $city->delete();

        return response()->json([
            'success' => true,
            'message' => 'City deleted successfully'
        ]);
    }
}
