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

    public function import(Request $request)
    {
        $request->validate([
            'file' => 'required|mimes:csv,txt|max:2048',
        ]);

        $file = $request->file('file');
        $fileData = fopen($file->getPathname(), 'r');
        $header = fgetcsv($fileData);

        while (($row = fgetcsv($fileData)) !== false) {
            if (count($header) !== count($row)) continue;

            $data = array_combine($header, $row);

            $namaRaw = str_replace(["\xA0", "\xC2\xA0"], ' ', $data['nama'] ?? '');
            $namaRaw = preg_replace('/[^\x20-\x7E]/', '', $namaRaw);
            $namaMentah = strtolower(trim($namaRaw));
            
            $namaTanpaAwalan = preg_replace('/^(kabupaten|kab\.|kab)\s+/i', '', $namaMentah);
            $namaTanpaSpasiGanda = preg_replace('/\s+/', ' ', $namaTanpaAwalan);
            $namaBersih = ucwords(trim($namaTanpaSpasiGanda));

            if ($namaBersih === '') continue;

            $cleanAngka = function($val) {
                if ($val === null || trim((string)$val) === '') {
                    return null;
                }
                $val = preg_replace('/[^0-9]/', '', (string)$val);
                return $val === '' ? null : $val;
            };

            $provinsiRaw = str_replace(["\xA0", "\xC2\xA0"], ' ', $data['provinsi'] ?? '');
            $provinsiRaw = preg_replace('/[^\x20-\x7E]/', '', $provinsiRaw);
            $provinsiFinal = trim($provinsiRaw) !== '' ? trim($provinsiRaw) : null;

            City::updateOrCreate(
                ['nama' => $namaBersih],
                [
                    'provinsi' => $provinsiFinal,
                    'latitude' => trim($data['latitude'] ?? '') === '' ? null : str_replace(',', '.', trim($data['latitude'])),
                    'longitude' => trim($data['longitude'] ?? '') === '' ? null : str_replace(',', '.', trim($data['longitude'])),
                    'umr' => $cleanAngka($data['umr'] ?? null),
                    'waktu_tempuh' => $cleanAngka($data['waktu_tempuh'] ?? null),
                    'armada_online' => $cleanAngka($data['armada_online'] ?? null),
                    'kendaraan_pribadi' => $cleanAngka($data['kendaraan_pribadi'] ?? null),
                    'tarif_min' => $cleanAngka($data['tarif_min'] ?? null),
                ]
            );
        }

        fclose($fileData);
        return redirect()->back();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => 'required|string|unique:cities,nama',
            'provinsi' => 'nullable|string',
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric',
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
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric',
            'umr' => 'nullable|numeric',
            'waktu_tempuh' => 'nullable|numeric',
            'armada_online' => 'nullable|numeric',
            'kendaraan_pribadi' => 'nullable|numeric',
            'tarif_min' => 'nullable|numeric',
        ]);

        $city->update($validated);

        return redirect()->back();
    }

    public function destroy(City $city)
    {
        $city->delete();

        return redirect()->back();
    }
}