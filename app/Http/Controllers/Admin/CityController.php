<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\City;
use Inertia\Inertia;
use Illuminate\Http\Request;

class CityController extends Controller
{
    public function index()
    {
        $cities = City::orderBy('nama', 'asc')->get();
        return Inertia::render('Dashboard', [
            'cities' => $cities
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => 'required|string|unique:cities,nama',
            'provinsi' => 'nullable|string',
            'umr' => 'nullable|numeric',
            'waktu_tempuh' => 'nullable|numeric',
            'armada_online' => 'nullable|numeric',
            'kendaraan_pribadi' => 'nullable|numeric',
            'tarif_min' => 'nullable|numeric',
        ]);

        City::create($validated);

        return redirect()->back();
    }

    public function update(Request $request, City $city)
    {
        $validated = $request->validate([
            'nama' => 'required|string|unique:cities,nama,' . $city->id,
            'provinsi' => 'nullable|string',
            
            'umr' => 'nullable|numeric',
            'waktu_tempuh' => 'nullable|numeric',
            'armada_online' => 'nullable|numeric',
            'kendaraan_pribadi' => 'nullable|numeric',
            'tarif_min' => 'nullable|numeric',
        ]);

        $city->update($validated);

        return redirect()->back();
    }
}