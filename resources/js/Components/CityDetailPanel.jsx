import React from 'react';

export default function CityDetailPanel({ activeCity }) {
    const displayValue = (val) => val ? val : 0;
    const formatRp = (val) => val ? new Intl.NumberFormat('id-ID').format(val) : 0;

    return (
        <>
            <div className="bg-[#e5e7eb] text-slate-800 px-4 py-2 font-bold text-sm rounded-t-lg">
                Detail Kota
            </div>
            <div className="p-4 overflow-y-auto text-sm flex-1 flex flex-col text-slate-300">
                {activeCity ? (
                    <div className="space-y-3">
                        <div><p className="text-slate-400 text-xs">Nama Kota:</p><p className="font-semibold text-white">{activeCity.nama}</p></div>
                        <div><p className="text-slate-400 text-xs">Provinsi:</p><p className="font-semibold text-white">{activeCity.provinsi}</p></div>
                        <div><p className="text-slate-400 text-xs">UMR:</p><p className="font-semibold text-white">{formatRp(activeCity.umr)}</p></div>
                        <div><p className="text-slate-400 text-xs">Waktu Tempuh (detik/10km):</p><p className="font-semibold text-white">{displayValue(activeCity.waktu_tempuh)}</p></div>
                        <div><p className="text-slate-400 text-xs">Jumlah Armada Online:</p><p className="font-semibold text-white">{displayValue(activeCity.armada_online)}</p></div>
                        <div><p className="text-slate-400 text-xs">Jumlah Kendaraan Pribadi:</p><p className="font-semibold text-white">{displayValue(activeCity.kendaraan_pribadi)}</p></div>
                        <div><p className="text-slate-400 text-xs">Tarif Minimum:</p><p className="font-semibold text-white">{formatRp(activeCity.tarif_min)}</p></div>
                    </div>
                ) : (
                    <div className="flex-1 flex items-center justify-center text-center px-4 text-slate-500 italic">
                        <p>Silakan pilih kota pada peta atau tabel untuk melihat detail datanya.</p>
                    </div>
                )}
            </div>
        </>
    );
}