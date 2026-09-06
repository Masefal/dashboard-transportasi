import React, { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';

export default function UpdateDataForm({ cities }) {
    const [selectedCityId, setSelectedCityId] = useState('');
    const [isNewMode, setIsNewMode] = useState(false);
    
    const [notification, setNotification] = useState('');

    const { data, setData, post, put, processing, reset } = useForm({
        nama: '',
        provinsi: '',
        umr: '',
        waktu_tempuh: '',
        armada_online: '',
        kendaraan_pribadi: '',
        tarif_min: '',
    });

    useEffect(() => {
        if (!isNewMode && selectedCityId) {
            const city = cities.find(c => c.id.toString() === selectedCityId);
            if (city) {
                setData({
                    nama: city.nama || '',
                    provinsi: city.provinsi || '',
                    umr: city.umr || '',
                    waktu_tempuh: city.waktu_tempuh || '',
                    armada_online: city.armada_online || '',
                    kendaraan_pribadi: city.kendaraan_pribadi || '',
                    tarif_min: city.tarif_min || '',
                });
            }
        } else if (isNewMode) {
            reset();
            setSelectedCityId('');
        }
    }, [selectedCityId, isNewMode]);

    const showNotification = (message) => {
        setNotification(message);
        setTimeout(() => {
            setNotification('');
        }, 3000);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (isNewMode) {
            post(route('cities.store'), {
                onSuccess: () => {
                    reset();
                    setIsNewMode(false);
                    showNotification('✨ Data kota baru berhasil ditambahkan!');
                }
            });
        } else {
            if (!selectedCityId) return alert("Pilih kota terlebih dahulu!");
            put(route('cities.update', selectedCityId), {
                onSuccess: () => {
                    showNotification('✅ Data kota berhasil diperbarui!');
                }
            });
        }
    };

    return (
        <div className="relative">
            {notification && (
                <div className="absolute -top-14 right-0 bg-green-500/20 border border-green-500/50 text-green-400 px-4 py-3 rounded-md shadow-lg flex items-center gap-3 backdrop-blur-sm transition-all animate-pulse">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span className="text-sm font-medium">{notification}</span>
                </div>
            )}

            <form onSubmit={handleSubmit} className="bg-[#1f232b] rounded-lg p-6 border border-slate-700/50 mb-8 transition-all">
                
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-6">
                    <div className="w-full md:flex-1">
                        <label className="block text-sm text-slate-400 mb-1">
                            {isNewMode ? 'Tambah Kota Baru' : 'Pilih Kota untuk Diupdate'}
                        </label>
                        
                        {!isNewMode && (
                            <select 
                                className="w-full bg-[#2a303c] border-none rounded-md text-slate-300 p-2.5 text-sm focus:ring-1 focus:ring-blue-500 cursor-pointer"
                                value={selectedCityId}
                                onChange={(e) => setSelectedCityId(e.target.value)}
                            >
                                <option value="">Pilih Kota...</option>
                                {cities.map(city => (
                                    <option key={city.id} value={city.id}>{city.nama}</option>
                                ))}
                            </select>
                        )}
                    </div>

                    <button 
                        type="button"
                        onClick={() => setIsNewMode(!isNewMode)}
                        className="shrink-0 bg-[#2a303c] hover:bg-slate-700 text-blue-400 border border-slate-600 px-4 py-2 rounded-md text-sm font-medium transition-colors h-[40px]"
                    >
                        {isNewMode ? 'Batal Tambah' : '+ Tambah Kota'}
                    </button>
                </div>

                {(isNewMode || selectedCityId) && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-4 bg-slate-800/30 rounded-md border border-slate-700/50">
                        <div>
                            <label className="block text-sm text-slate-400 mb-1">Nama Kota (Sesuaikan dengan nama di GeoJSON)</label>
                            <input 
                                type="text" 
                                required
                                value={data.nama}
                                onChange={(e) => setData('nama', e.target.value)}
                                placeholder="Contoh: Muara Enim" 
                                className="w-full bg-[#2a303c] border-none rounded-md text-slate-300 p-2.5 text-sm placeholder-slate-500 focus:ring-1 focus:ring-blue-500" 
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-slate-400 mb-1">Provinsi</label>
                            <input 
                                type="text" 
                                value={data.provinsi}
                                onChange={(e) => setData('provinsi', e.target.value)}
                                placeholder="Contoh: Sumatera Selatan" 
                                className="w-full bg-[#2a303c] border-none rounded-md text-slate-300 p-2.5 text-sm placeholder-slate-500 focus:ring-1 focus:ring-blue-500" 
                            />
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div>
                        <label className="block text-sm text-slate-400 mb-1">UMR</label>
                        <input type="number" value={data.umr} onChange={(e) => setData('umr', e.target.value)} placeholder="UMR" className="w-full bg-[#2a303c] border-none rounded-md text-slate-300 p-2.5 text-sm placeholder-slate-500 focus:ring-1 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label className="block text-sm text-slate-400 mb-1">Waktu Tempuh (detik/10km)</label>
                        <input type="number" value={data.waktu_tempuh} onChange={(e) => setData('waktu_tempuh', e.target.value)} placeholder="Waktu Tempuh" className="w-full bg-[#2a303c] border-none rounded-md text-slate-300 p-2.5 text-sm placeholder-slate-500 focus:ring-1 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label className="block text-sm text-slate-400 mb-1">Jumlah Armada Online</label>
                        <input type="number" value={data.armada_online} onChange={(e) => setData('armada_online', e.target.value)} placeholder="Jumlah Armada" className="w-full bg-[#2a303c] border-none rounded-md text-slate-300 p-2.5 text-sm placeholder-slate-500 focus:ring-1 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label className="block text-sm text-slate-400 mb-1">Input Kendaraan Pribadi</label>
                        <input type="number" value={data.kendaraan_pribadi} onChange={(e) => setData('kendaraan_pribadi', e.target.value)} placeholder="Kendaraan Pribadi" className="w-full bg-[#2a303c] border-none rounded-md text-slate-300 p-2.5 text-sm placeholder-slate-500 focus:ring-1 focus:ring-blue-500" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div>
                        <label className="block text-sm text-slate-400 mb-1">Tarif Minimum Aktual</label>
                        <input type="number" value={data.tarif_min} onChange={(e) => setData('tarif_min', e.target.value)} placeholder="Tarif Minimum" className="w-full bg-[#2a303c] border-none rounded-md text-slate-300 p-2.5 text-sm placeholder-slate-500 focus:ring-1 focus:ring-blue-500" />
                    </div>
                </div>

                <div className="flex justify-end">
                    <button 
                        type="submit" 
                        disabled={processing}
                        className={`px-6 py-2 rounded-md text-sm font-semibold transition-colors disabled:opacity-50 flex items-center justify-center min-w-[140px] ${
                            isNewMode 
                            ? 'bg-green-600 hover:bg-green-700 text-white' 
                            : 'bg-blue-600 hover:bg-blue-700 text-white'
                        }`}
                    >
                        {processing ? (
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : (
                            isNewMode ? 'Simpan Data Baru' : 'Update Data'
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}