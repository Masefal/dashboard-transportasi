import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import TransportMap from '@/Components/TransportMap';
import { 
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell 
} from 'recharts';

const MASTER_DATA_KOTA = [
    { id: 1, nama: 'Samarinda', provinsi: 'Kalimantan Timur', umr: 3220000, waktuTempuh: 42, armadaOnline: 150, kendaraanPribadi: 60, jumlahPenduduk: 880000, rataJarak: 14, kepadatan: 8, tarifMin: 16000, emisi: 2.8, koordinat: [-0.5022, 117.1536] },
    { id: 2, nama: 'Surabaya', provinsi: 'Jawa Timur', umr: 4525000, waktuTempuh: 35, armadaOnline: 420, kendaraanPribadi: 210, jumlahPenduduk: 2800000, rataJarak: 18, kepadatan: 22, tarifMin: 14000, emisi: 3.5, koordinat: [-7.2504, 112.7688] },
    { id: 3, nama: 'Bandung', provinsi: 'Jawa Barat', umr: 4048000, waktuTempuh: 55, armadaOnline: 310, kendaraanPribadi: 180, jumlahPenduduk: 2500000, rataJarak: 12, kepadatan: 28, tarifMin: 15000, emisi: 4.1, koordinat: [-6.9175, 107.6191] },
    { id: 4, nama: 'Medan', provinsi: 'Sumatera Utara', umr: 3624000, waktuTempuh: null, armadaOnline: null, kendaraanPribadi: 120, jumlahPenduduk: null, rataJarak: 15, kepadatan: null, tarifMin: 12000, emisi: null, koordinat: [3.5952, 98.6722] },
    { id: 5, nama: 'Jakarta', provinsi: 'DKI Jakarta', umr: 4900000, waktuTempuh: 65, armadaOnline: 550, kendaraanPribadi: 320, jumlahPenduduk: 10560000, rataJarak: 22, kepadatan: 35, tarifMin: 15000, emisi: 4.8, koordinat: [-6.2088, 106.8456] },
    { id: 6, nama: 'Makassar', provinsi: 'Sulawesi Selatan', umr: 3385000, waktuTempuh: 40, armadaOnline: 180, kendaraanPribadi: 85, jumlahPenduduk: 1420000, rataJarak: 16, kepadatan: 12, tarifMin: 14000, emisi: 3.1, koordinat: [-5.1476, 119.4327] }
];

const COLORS = ['#4a85ce', '#2d4975', '#60a5fa', '#93c5fd'];
const INACTIVE_COLOR = ['#334155'];

export default function Welcome() {
    const [activeCity, setActiveCity] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    const displayValue = (val) => val ? val : 0;
    const formatRp = (val) => val ? new Intl.NumberFormat('id-ID').format(val) : 0;

    const sortedCities = [...MASTER_DATA_KOTA].sort((a, b) => {
        const umrA = a.umr || 0;
        const umrB = b.umr || 0;
        return umrB - umrA;
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentCities = sortedCities.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(sortedCities.length / itemsPerPage);

    let chartCities = sortedCities.slice(0, 10);
    if (activeCity && !chartCities.find(c => c.id === activeCity.id)) {
        chartCities.pop(); 
        chartCities.push(activeCity);
        chartCities.sort((a, b) => (b.umr || 0) - (a.umr || 0));
    }

    const dataUMR = chartCities.map(c => ({
        kota: c.nama,
        umr: c.umr || 0
    }));

    const activePieData = activeCity ? [
        { name: 'Kendaraan Pribadi', value: activeCity.kendaraanPribadi || 0 },
        { name: 'Ojek Online', value: activeCity.armadaOnline || 0 },
        { name: 'Kendaraan Umum', value: Math.round((activeCity.kendaraanPribadi || 0) * 0.3) },
        { name: 'Kendaraan Barang', value: Math.round((activeCity.armadaOnline || 0) * 0.15) }
    ] : [
        { name: 'Belum Ada Data', value: 100 }
    ];

    const currentPieColors = activeCity ? COLORS : INACTIVE_COLOR;

    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
        if (!activeCity || percent === 0) return null;
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
        const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);
        
        return (
            <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize="10px" fontWeight="bold">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    return (
        <>
            <Head title="Dashboard Transportasi Multikriteria" />
            <div className="min-h-screen bg-[#1a1d24] text-slate-200 flex font-sans">
                
                <aside className="w-64 bg-[#1f232b] border-r border-slate-700/50 flex flex-col hidden md:flex">
                    <div className="p-4 mt-4 space-y-2">
                        <button className="w-full flex items-center gap-3 bg-[#2a303c] text-blue-400 px-4 py-3 rounded-md text-sm font-semibold border border-slate-700/50">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
                            Dashboard
                        </button>
                        <button className="w-full flex items-center gap-3 text-slate-400 hover:text-slate-200 hover:bg-[#2a303c] px-4 py-3 rounded-md text-sm transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                            Admin Login
                        </button>
                    </div>
                </aside>

                <main className="flex-1 flex flex-col overflow-y-auto">
                    <header className="px-6 py-4 border-b border-slate-700/50">
                        <h1 className="text-xl font-medium text-white">Dashboard Transportasi Multikriteria</h1>
                    </header>

                    <div className="p-6 space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                            
                            <div className="col-span-1 bg-[#1f232b] border border-slate-700/50 rounded-lg flex flex-col h-[400px]">
                                <div className="bg-[#e5e7eb] text-slate-800 px-4 py-2 font-bold text-sm rounded-t-lg">
                                    Detail Kota
                                </div>
                                <div className="p-4 overflow-y-auto text-sm flex-1 flex flex-col text-slate-300">
                                    {activeCity ? (
                                        <div className="space-y-3">
                                            <div><p className="text-slate-400 text-xs">Nama Kota:</p><p className="font-semibold text-white">{activeCity.nama}</p></div>
                                            <div><p className="text-slate-400 text-xs">Provinsi:</p><p className="font-semibold text-white">{activeCity.provinsi}</p></div>
                                            <div><p className="text-slate-400 text-xs">UMR:</p><p className="font-semibold text-white">{formatRp(activeCity.umr)}</p></div>
                                            <div><p className="text-slate-400 text-xs">Waktu Tempuh (detik/10km):</p><p className="font-semibold text-white">{displayValue(activeCity.waktuTempuh)}</p></div>
                                            <div><p className="text-slate-400 text-xs">Jumlah Armada Online:</p><p className="font-semibold text-white">{displayValue(activeCity.armadaOnline)}</p></div>
                                            <div><p className="text-slate-400 text-xs">Jumlah Kendaraan Pribadi:</p><p className="font-semibold text-white">{displayValue(activeCity.kendaraanPribadi)}</p></div>
                                            <div><p className="text-slate-400 text-xs">Jumlah Penduduk (Jiwa):</p><p className="font-semibold text-white">{formatRp(activeCity.jumlahPenduduk)}</p></div>
                                            <div><p className="text-slate-400 text-xs">Rata-rata Jarak Tempuh (km):</p><p className="font-semibold text-white">{displayValue(activeCity.rataJarak)}</p></div>
                                            <div><p className="text-slate-400 text-xs">Kepadatan Kendaraan (Unit/km²):</p><p className="font-semibold text-white">{displayValue(activeCity.kepadatan)}</p></div>
                                        </div>
                                    ) : (
                                        <div className="flex-1 flex items-center justify-center text-center px-4 text-slate-500 italic">
                                            <p>Silakan pilih kota pada peta atau tabel untuk melihat detail datanya.</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="col-span-1 lg:col-span-3 h-[400px] bg-[#1f232b] rounded-lg border border-slate-700/50 overflow-hidden relative z-0">
                                <TransportMap 
                                    activeCity={activeCity} 
                                    allCities={MASTER_DATA_KOTA} 
                                    onCityClick={(kota) => setActiveCity(kota)} 
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div 
                                className="bg-[#1f232b] border border-slate-700/50 rounded-lg p-5 h-72 cursor-default" 
                                onClick={() => setActiveCity(null)}
                            >
                                <h3 className="text-sm font-medium mb-4">Diagram Batang UMR antar Kota</h3>
                                <div className="w-full h-full pb-4 [&_.recharts-surface]:outline-none [&_.recharts-wrapper]:outline-none">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart 
                                            data={dataUMR} 
                                            margin={{ top: 10, right: 10, left: -20, bottom: 0 }} 
                                            style={{ outline: 'none' }} 
                                        >
                                            <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                                            <XAxis dataKey="kota" stroke="#94a3b8" fontSize={11} tickLine={false} />
                                            <YAxis stroke="#94a3b8" fontSize={11} tickFormatter={(value) => `${value / 1000000}M`} tickLine={false} axisLine={false} />
                                            
                                            <Tooltip 
                                                contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', outline: 'none' }}
                                                itemStyle={{ color: '#f8fafc', fontWeight: 'bold' }} 
                                                labelStyle={{ color: '#94a3b8', marginBottom: '4px' }}
                                                cursor={{fill: '#334155', opacity: 0.4}}
                                                formatter={(value) => [new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumSignificantDigits: 3 }).format(value), 'UMR']}
                                            />
                                            
                                            <Bar 
                                                dataKey="umr" 
                                                radius={[4, 4, 0, 0]} 
                                                barSize={30} 
                                                cursor="pointer"
                                                onClick={(data, index, event) => {
                                                    if (event && typeof event.stopPropagation === 'function') {
                                                        event.stopPropagation();
                                                    }
                                                    const clickedCity = MASTER_DATA_KOTA.find(c => c.nama === data.kota);
                                                    if (clickedCity) setActiveCity(clickedCity);
                                                }}
                                            >
                                                {dataUMR.map((entry, index) => {
                                                    const isSelected = activeCity ? activeCity.nama === entry.kota : true;
                                                    return (
                                                        <Cell 
                                                            key={`cell-${index}`} 
                                                            fill={isSelected ? '#4a85ce' : '#334155'} 
                                                            style={{ outline: 'none', transition: 'fill 0.3s ease' }}
                                                        />
                                                    );
                                                })}
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            <div className="bg-[#1f232b] border border-slate-700/50 rounded-lg p-5 h-72">
                                <h3 className="text-sm font-medium mb-4">
                                    Diagram Lingkaran Proporsi Kendaraan {activeCity ? `- ${activeCity.nama}` : ''}
                                </h3>
                                <div className="w-full h-full pb-4 flex items-center justify-center [&_.recharts-surface]:outline-none [&_.recharts-wrapper]:outline-none">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart style={{ outline: 'none' }}>
                                            <Pie
                                                data={activePieData}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={45}
                                                outerRadius={75}
                                                paddingAngle={activeCity ? 2 : 0} 
                                                dataKey="value"
                                                stroke="none"
                                                labelLine={false}
                                                label={renderCustomizedLabel}
                                                style={{ outline: 'none' }}
                                            >
                                                {activePieData.map((entry, index) => (
                                                    <Cell 
                                                        key={`cell-${index}`} 
                                                        fill={currentPieColors[index % currentPieColors.length]} 
                                                        style={{ outline: 'none' }} 
                                                    />
                                                ))}
                                            </Pie>
                                            {activeCity && (
                                                <Tooltip 
                                                    contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', outline: 'none' }}
                                                    itemStyle={{ color: '#f8fafc' }}
                                                />
                                            )}
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>

                        <div className="bg-[#1f232b] border border-slate-700/50 rounded-lg p-5">
                            <h3 className="text-sm font-medium mb-4">Tabel Ringkasan Kota Terpilih</h3>
                            <div className="overflow-x-auto min-h-[220px]">
                                <table className="w-full text-left text-sm text-slate-300">
                                    <thead className="border-b border-slate-700 text-slate-400 font-normal">
                                        <tr>
                                            <th className="pb-3 font-medium px-2">Kota</th>
                                            <th className="pb-3 font-medium">UMR</th>
                                            <th className="pb-3 font-medium">Tarif Min.</th>
                                            <th className="pb-3 font-medium">Waktu Tempuh</th>
                                            <th className="pb-3 font-medium">Rata-rata Emisi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentCities.map((kota) => (
                                            <tr 
                                                key={kota.id} 
                                                onClick={() => setActiveCity(kota)}
                                                className={`border-b border-slate-700/50 cursor-pointer transition-colors ${
                                                    activeCity?.id === kota.id ? 'bg-[#2a303c] border-l-4 border-l-blue-500' : 'hover:bg-slate-800/50'
                                                }`}
                                            >
                                                <td className="py-3 px-2 flex items-center gap-2">
                                                    {kota.nama}
                                                    {Object.values(kota).includes(null) && <span className="w-2 h-2 rounded-full bg-red-500" title="Data belum lengkap"></span>}
                                                </td>
                                                <td className="py-3">{formatRp(kota.umr)}</td>
                                                <td className="py-3">{formatRp(kota.tarifMin)}</td>
                                                <td className="py-3">{displayValue(kota.waktuTempuh)}</td>
                                                <td className="py-3">{displayValue(kota.emisi)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            
                            <div className="flex items-center justify-between mt-4">
                                <div className="text-xs text-slate-400">
                                    Menampilkan {sortedCities.length > 0 ? indexOfFirstItem + 1 : 0} - {Math.min(indexOfLastItem, sortedCities.length)} dari {sortedCities.length} kota
                                </div>
                                <div className="flex gap-1">
                                    <button 
                                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                        disabled={currentPage === 1}
                                        className="px-3 py-1.5 bg-[#2a303c] text-slate-300 rounded text-xs font-medium disabled:opacity-50 hover:bg-slate-700 transition-colors"
                                    >
                                        Sebelumnya
                                    </button>
                                    
                                    {[...Array(totalPages)].map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setCurrentPage(index + 1)}
                                            className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                                                currentPage === index + 1 
                                                ? 'bg-blue-600 text-white' 
                                                : 'bg-[#2a303c] text-slate-300 hover:bg-slate-700'
                                            }`}
                                        >
                                            {index + 1}
                                        </button>
                                    ))}

                                    <button 
                                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                        disabled={currentPage === totalPages}
                                        className="px-3 py-1.5 bg-[#2a303c] text-slate-300 rounded text-xs font-medium disabled:opacity-50 hover:bg-slate-700 transition-colors"
                                    >
                                        Selanjutnya
                                    </button>
                                </div>
                            </div>
                            
                        </div>

                    </div>
                </main>
            </div>
        </>
    );
}