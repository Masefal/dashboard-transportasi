import React, { useState } from 'react';

export default function DataTable({ cities, activeCity, onCityClick }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const itemsPerPage = 4;

    const displayValue = (val) => val ? val : 0;
    const formatRp = (val) => val ? new Intl.NumberFormat('id-ID').format(val) : 0;

    const filteredCities = cities.filter(city => 
        (city.nama || '').toLowerCase().includes(searchQuery.toLowerCase())
    );

    const sortedCities = [...filteredCities].sort((a, b) => (b.umr || 0) - (a.umr || 0));

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentCities = sortedCities.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(sortedCities.length / itemsPerPage);

    const getPageNumbers = () => {
        if (totalPages <= 7) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }

        if (currentPage <= 3) {
            return [1, 2, 3, 4, '...', totalPages];
        }

        if (currentPage >= totalPages - 2) {
            return [1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
        }

        return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
    };

    return (
        <div className="bg-[#1f232b] border border-slate-700/50 rounded-lg p-5">
            <div className="flex justify-between items-center mb-4 gap-2">
                <h3 className="text-sm font-medium">Tabel Ringkasan Kota</h3>
                <input
                    type="text"
                    placeholder="Cari kota..."
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setCurrentPage(1);
                    }}
                    className="bg-[#2a303c] border border-slate-700 text-slate-300 text-xs rounded-md px-3 py-1.5 focus:outline-none focus:border-blue-500 w-32 md:w-48 transition-all"
                />
            </div>
            
            <div className="overflow-x-auto min-h-[220px]">
                <table className="w-full text-left text-sm text-slate-300">
                    <thead className="border-b border-slate-700 text-slate-400 font-normal">
                        <tr>
                            <th className="pb-3 font-medium px-2">Kota</th>
                            <th className="pb-3 font-medium">UMR</th>
                            <th className="pb-3 font-medium">Tarif Min.</th>
                            <th className="pb-3 font-medium">Waktu Tempuh</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentCities.length > 0 ? (
                            currentCities.map((kota) => (
                                <tr 
                                    key={kota.id} 
                                    onClick={() => onCityClick(kota)}
                                    className={`border-b border-slate-700/50 cursor-pointer transition-colors ${
                                        activeCity?.id === kota.id ? 'bg-[#2a303c] border-l-4 border-l-blue-500' : 'hover:bg-slate-800/50'
                                    }`}
                                >
                                    <td className="py-3 px-2 flex items-center gap-2">
                                        {kota.nama}
                                        {['umr', 'waktu_tempuh', 'armada_online', 'kendaraan_pribadi', 'tarif_min'].some(k => kota[k] === null) && 
                                            <span className="w-2 h-2 rounded-full bg-red-500" title="Data belum lengkap"></span>
                                        }
                                    </td>
                                    <td className="py-3">{formatRp(kota.umr)}</td>
                                    <td className="py-3">{formatRp(kota.tarif_min)}</td>
                                    <td className="py-3">{displayValue(kota.waktu_tempuh)}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="py-8 text-center text-slate-500 italic">
                                    Kota tidak ditemukan
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            
            {totalPages > 0 && (
                <div className="flex items-center justify-between mt-4">
                    <div className="text-xs text-slate-400">
                        Menampilkan {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, sortedCities.length)} dari {sortedCities.length} kota
                    </div>
                    <div className="flex gap-1 items-center">
                        <button 
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="px-3 py-1.5 bg-[#2a303c] text-slate-300 rounded text-xs font-medium disabled:opacity-50 hover:bg-slate-700 transition-colors cursor-pointer"
                        >
                            Prev
                        </button>
                        
                        {getPageNumbers().map((page, index) => (
                            <button
                                key={index}
                                onClick={() => typeof page === 'number' ? setCurrentPage(page) : null}
                                disabled={page === '...'}
                                className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                                    page === '...' 
                                    ? 'text-slate-500 cursor-default bg-transparent' 
                                    : currentPage === page 
                                        ? 'bg-blue-600 text-white' 
                                        : 'bg-[#2a303c] text-slate-300 hover:bg-slate-700 cursor-pointer'
                                }`}
                            >
                                {page}
                            </button>
                        ))}

                        <button 
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="px-3 py-1.5 bg-[#2a303c] text-slate-300 rounded text-xs font-medium disabled:opacity-50 hover:bg-slate-700 transition-colors cursor-pointer"
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}