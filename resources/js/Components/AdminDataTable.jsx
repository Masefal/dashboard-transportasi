import React from 'react';

export default function AdminDataTable({ cities }) {
    const formatRp = (val) => val ? new Intl.NumberFormat('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(val) : '0.00';

    const sortedCities = [...cities].sort((a, b) => {
        const provA = a.provinsi || '';
        const provB = b.provinsi || '';
        if (provA < provB) return -1;
        if (provA > provB) return 1;
        return (a.nama < b.nama) ? -1 : 1;
    });

    return (
        <div className="bg-[#1f232b] rounded-lg border border-slate-700/50 p-6 flex-1 flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium text-white">Tabel Data (by Provinsi)</h3>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 bg-[#2a303c] hover:bg-slate-700 text-slate-300 px-4 py-2 rounded-md text-sm transition-colors border border-slate-600">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
                        Print
                    </button>
                    <button className="flex items-center gap-2 bg-[#e5e7eb] hover:bg-white text-slate-800 px-4 py-2 rounded-md text-sm font-medium transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                        Export (CSV)
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-300">
                    <thead className="border-b border-slate-700 text-slate-400 font-medium">
                        <tr>
                            <th className="pb-3 px-2">No</th>
                            <th className="pb-3 px-2">Provinsi</th>
                            <th className="pb-3 px-2">Kota</th>
                            <th className="pb-3 px-2">UMR</th>
                            <th className="pb-3 px-2">Waktu Tempuh</th>
                            <th className="pb-3 px-2">Armada</th>
                            <th className="pb-3 px-2">Kendaraan Pribadi</th>
                            <th className="pb-3 px-2">Tarif</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700/50">
                        {sortedCities.map((city, index) => {
                            const showProvinsi = index === 0 || city.provinsi !== sortedCities[index - 1].provinsi;

                            return (
                                <tr key={city.id} className="hover:bg-slate-800/30 transition-colors">
                                    <td className="py-4 px-2">{index + 1}</td>
                                    <td className="py-4 px-2">{showProvinsi ? city.provinsi : ''}</td>
                                    <td className="py-4 px-2">{city.nama}</td>
                                    <td className="py-4 px-2">{formatRp(city.umr)}</td>
                                    <td className="py-4 px-2">{city.waktu_tempuh || '-'}</td>
                                    <td className="py-4 px-2">{city.armada_online || '-'}</td>
                                    <td className="py-4 px-2">{city.kendaraan_pribadi || '-'}</td>
                                    <td className="py-4 px-2">{formatRp(city.tarif_min)}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}