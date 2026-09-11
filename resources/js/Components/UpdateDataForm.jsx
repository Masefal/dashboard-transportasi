import React, { useState, useEffect } from 'react';
import { useForm, router } from '@inertiajs/react';

export default function UpdateDataForm({ cities }) {
    const [selectedCityId, setSelectedCityId] = useState('');
    const [isNewMode, setIsNewMode] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [notification, setNotification] = useState('');
    
    const [searchTerm, setSearchTerm] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const { data, setData, post, put, processing, reset, errors } = useForm({
        nama: '',
        provinsi: '',
        latitude: '',
        longitude: '',
        umr: '',
        waktu_tempuh: '',
        armada_online: '',
        kendaraan_pribadi: '',
        tarif_min: '',
    });

    const { data: fileData, setData: setFileData, post: postFile, processing: importing } = useForm({
        file: null,
    });

    useEffect(() => {
        if (!isNewMode && selectedCityId) {
            const city = cities.find(c => c.id.toString() === selectedCityId);
            if (city) {
                setSearchTerm(`${city.nama} (${city.provinsi || 'Tanpa Provinsi'})`);
                setData({
                    nama: city.nama || '',
                    provinsi: city.provinsi || '',
                    latitude: city.latitude || '',
                    longitude: city.longitude || '',
                    umr: city.umr !== null ? city.umr : '',
                    waktu_tempuh: city.waktu_tempuh !== null ? city.waktu_tempuh : '',
                    armada_online: city.armada_online !== null ? city.armada_online : '',
                    kendaraan_pribadi: city.kendaraan_pribadi !== null ? city.kendaraan_pribadi : '',
                    tarif_min: city.tarif_min !== null ? city.tarif_min : '',
                });
            }
        } else if (isNewMode) {
            reset();
            setSelectedCityId('');
            setSearchTerm('');
        }
    }, [selectedCityId, isNewMode]);

    const showNotification = (message) => {
        setNotification(message);
        setTimeout(() => setNotification(''), 3000);
    };

    const handleImport = (e) => {
        e.preventDefault();
        postFile(route('cities.import'), {
            onSuccess: () => {
                showNotification('🚀 File CSV Berhasil Di-import!');
                setFileData('file', null);
            }
        });
    };

    const handleDelete = () => {
        if (!selectedCityId) return alert('Pilih kota terlebih dahulu yang ingin dihapus!');
        const city = cities.find(c => c.id.toString() === selectedCityId);
        const cityName = city ? city.nama : 'kota ini';

        if (window.confirm(`Apakah Anda yakin ingin menghapus data "${cityName}"?`)) {
            setIsDeleting(true);
            router.delete(route('cities.destroy', selectedCityId), {
                onSuccess: () => {
                    setSelectedCityId('');
                    setSearchTerm('');
                    reset();
                    showNotification('🗑️ Data kota berhasil dihapus!');
                },
                onFinish: () => setIsDeleting(false)
            });
        }
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
                onSuccess: () => showNotification('✅ Data kota berhasil diperbarui!')
            });
        }
    };

    const filteredCities = cities.filter(city => 
        (city.nama && city.nama.toLowerCase().includes(searchTerm.toLowerCase())) || 
        (city.provinsi && city.provinsi.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="relative">
            {notification && (
                <div className="absolute -top-14 right-0 bg-green-500/20 border border-green-500/50 text-green-400 px-4 py-3 rounded-md shadow-lg flex items-center gap-3 backdrop-blur-sm transition-all animate-pulse z-50">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span className="text-sm font-medium">{notification}</span>
                </div>
            )}

            <form onSubmit={handleImport} className="bg-[#1f232b] rounded-lg p-6 border border-slate-700/50 mb-6 flex flex-col md:flex-row items-center gap-4">
                <div className="flex-1 w-full">
                    <label className="block text-sm text-slate-400 mb-1">Import Data via CSV</label>
                    <input 
                        type="file" 
                        accept=".csv"
                        onChange={(e) => setFileData('file', e.target.files[0])}
                        className="w-full text-sm text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer"
                    />
                </div>
                <button 
                    type="submit" 
                    disabled={!fileData.file || importing}
                    className="shrink-0 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white px-6 py-2 rounded-md text-sm font-semibold transition-colors mt-5 md:mt-0"
                >
                    {importing ? 'Mengimpor...' : 'Upload CSV'}
                </button>
            </form>

            <form onSubmit={handleSubmit} className="bg-[#1f232b] rounded-lg p-6 border border-slate-700/50 mb-8 transition-all">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-6">
                    <div className="w-full md:flex-1 relative">
                        <label className="block text-sm text-slate-400 mb-1">
                            {isNewMode ? 'Tambah Kota Baru' : 'Cari Kota / Provinsi untuk Diupdate'}
                        </label>
                        {!isNewMode && (
                            <div className="relative w-full">
                                <input
                                    type="text"
                                    placeholder="Ketik nama kota atau provinsi..."
                                    value={searchTerm}
                                    onChange={(e) => {
                                        setSearchTerm(e.target.value);
                                        setIsDropdownOpen(true);
                                        if (e.target.value === '') {
                                            setSelectedCityId('');
                                            reset();
                                        }
                                    }}
                                    onFocus={() => setIsDropdownOpen(true)}
                                    onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
                                    className="w-full bg-[#2a303c] border-none rounded-md text-slate-300 p-2.5 text-sm focus:ring-1 focus:ring-blue-500 placeholder-slate-500"
                                />
                                
                                {isDropdownOpen && (
                                    <div className="absolute z-50 w-full mt-1 bg-[#2a303c] border border-slate-700 rounded-md shadow-xl max-h-60 overflow-y-auto">
                                        {filteredCities.length > 0 ? (
                                            filteredCities.map(city => (
                                                <div
                                                    key={city.id}
                                                    onClick={() => {
                                                        setSelectedCityId(city.id.toString());
                                                        setSearchTerm(`${city.nama} (${city.provinsi || 'Tanpa Provinsi'})`);
                                                        setIsDropdownOpen(false);
                                                    }}
                                                    className="p-3 text-sm text-slate-300 hover:bg-blue-600 hover:text-white cursor-pointer transition-colors border-b border-slate-700/50 last:border-none flex justify-between items-center"
                                                >
                                                    <span className="font-semibold">{city.nama}</span>
                                                    <span className="text-xs opacity-70 bg-slate-800 px-2 py-1 rounded">{city.provinsi}</span>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="p-3 text-sm text-slate-500 italic text-center">
                                                Kota atau provinsi tidak ditemukan
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
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
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-4 bg-slate-800/30 rounded-md border border-slate-700/50">
                            <div>
                                <label className="block text-sm text-slate-400 mb-1">Nama Kota</label>
                                <input
                                    type="text" required value={data.nama} onChange={(e) => setData('nama', e.target.value)}
                                    placeholder="Contoh: Muara Enim"
                                    className="w-full bg-[#2a303c] border-none rounded-md text-slate-300 p-2.5 text-sm focus:ring-1 focus:ring-blue-500"
                                />
                                {errors.nama && <div className="text-red-500 text-xs mt-1">{errors.nama}</div>}
                            </div>
                            <div>
                                <label className="block text-sm text-slate-400 mb-1">Provinsi</label>
                                <input
                                    type="text" value={data.provinsi} onChange={(e) => setData('provinsi', e.target.value)}
                                    placeholder="Contoh: Sumatera Selatan"
                                    className="w-full bg-[#2a303c] border-none rounded-md text-slate-300 p-2.5 text-sm focus:ring-1 focus:ring-blue-500"
                                />
                                {errors.provinsi && <div className="text-red-500 text-xs mt-1">{errors.provinsi}</div>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-sm text-slate-400 mb-1">Latitude (Opsional)</label>
                                <input 
                                    type="number" step="any" value={data.latitude} onChange={(e) => setData('latitude', e.target.value)} 
                                    placeholder="Contoh: -6.200000" 
                                    className="w-full bg-[#2a303c] border-none rounded-md text-slate-300 p-2.5 text-sm focus:ring-1 focus:ring-blue-500" 
                                />
                                {errors.latitude && <div className="text-red-500 text-xs mt-1">{errors.latitude}</div>}
                            </div>
                            <div>
                                <label className="block text-sm text-slate-400 mb-1">Longitude (Opsional)</label>
                                <input 
                                    type="number" step="any" value={data.longitude} onChange={(e) => setData('longitude', e.target.value)} 
                                    placeholder="Contoh: 106.816666" 
                                    className="w-full bg-[#2a303c] border-none rounded-md text-slate-300 p-2.5 text-sm focus:ring-1 focus:ring-blue-500" 
                                />
                                {errors.longitude && <div className="text-red-500 text-xs mt-1">{errors.longitude}</div>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                            <div>
                                <label className="block text-sm text-slate-400 mb-1">UMR</label>
                                <input type="number" value={data.umr} onChange={(e) => setData('umr', e.target.value)} placeholder="0" className="w-full bg-[#2a303c] border-none rounded-md text-slate-300 p-2.5 text-sm focus:ring-1 focus:ring-blue-500" />
                            </div>
                            <div>
                                <label className="block text-sm text-slate-400 mb-1">Waktu Tempuh (dtk/10km)</label>
                                <input type="number" value={data.waktu_tempuh} onChange={(e) => setData('waktu_tempuh', e.target.value)} placeholder="0" className="w-full bg-[#2a303c] border-none rounded-md text-slate-300 p-2.5 text-sm focus:ring-1 focus:ring-blue-500" />
                            </div>
                            <div>
                                <label className="block text-sm text-slate-400 mb-1">Jumlah Armada Online</label>
                                <input type="number" value={data.armada_online} onChange={(e) => setData('armada_online', e.target.value)} placeholder="0" className="w-full bg-[#2a303c] border-none rounded-md text-slate-300 p-2.5 text-sm focus:ring-1 focus:ring-blue-500" />
                            </div>
                            <div>
                                <label className="block text-sm text-slate-400 mb-1">Kendaraan Pribadi</label>
                                <input type="number" value={data.kendaraan_pribadi} onChange={(e) => setData('kendaraan_pribadi', e.target.value)} placeholder="0" className="w-full bg-[#2a303c] border-none rounded-md text-slate-300 p-2.5 text-sm focus:ring-1 focus:ring-blue-500" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                            <div>
                                <label className="block text-sm text-slate-400 mb-1">Tarif Minimum Aktual</label>
                                <input type="number" value={data.tarif_min} onChange={(e) => setData('tarif_min', e.target.value)} placeholder="0" className="w-full bg-[#2a303c] border-none rounded-md text-slate-300 p-2.5 text-sm focus:ring-1 focus:ring-blue-500" />
                            </div>
                        </div>
                    </>
                )}

                <div className="flex justify-end items-center gap-3">
                    {!isNewMode && (
                        <button
                            type="button" onClick={handleDelete} disabled={!selectedCityId || isDeleting || processing}
                            className="px-5 py-2 rounded-md text-sm font-semibold bg-red-600 hover:bg-red-700 disabled:opacity-40 text-white min-w-[130px]"
                        >
                            {isDeleting ? 'Menghapus...' : 'Delete Data'}
                        </button>
                    )}
                    <button
                        type="submit" disabled={processing || isDeleting}
                        className={`px-6 py-2 rounded-md text-sm font-semibold disabled:opacity-50 min-w-[140px] ${isNewMode ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
                    >
                        {processing ? 'Menyimpan...' : (isNewMode ? 'Simpan Data Baru' : 'Update Data')}
                    </button>
                </div>
            </form>
        </div>
    );
}