import React, { useState, useEffect } from 'react';
import { useForm, router } from '@inertiajs/react';
import FormInput from './FormInput';
import ImportCsv from './ImportCsv';
import CitySearch from './CitySearch';

export default function UpdateDataForm({ cities }) {
    const [selectedCityId, setSelectedCityId] = useState('');
    const [isNewMode, setIsNewMode] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [notification, setNotification] = useState('');

    const { data, setData, post, put, processing, reset, errors } = useForm({
        nama: '', provinsi: '', latitude: '', longitude: '',
        umr: '', waktu_tempuh: '', armada_online: '', kendaraan_pribadi: '', tarif_min: '',
    });

    useEffect(() => {
        if (!isNewMode && selectedCityId) {
            const city = cities.find(c => c.id.toString() === selectedCityId);
            if (city) {
                setData({
                    nama: city.nama || '', provinsi: city.provinsi || '',
                    latitude: city.latitude || '', longitude: city.longitude || '',
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
        }
    }, [selectedCityId, isNewMode]);

    const showNotification = (msg) => { setNotification(msg); setTimeout(() => setNotification(''), 3000); };

    const handleDelete = () => {
        if (!selectedCityId) return alert('Pilih kota terlebih dahulu!');
        const city = cities.find(c => c.id.toString() === selectedCityId);
        if (window.confirm(`Hapus data "${city?.nama}"?`)) {
            setIsDeleting(true);
            router.delete(route('cities.destroy', selectedCityId), {
                onSuccess: () => { setSelectedCityId(''); reset(); showNotification('🗑️ Data dihapus!'); },
                onFinish: () => setIsDeleting(false)
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (data.latitude && (parseFloat(data.latitude) < -90 || parseFloat(data.latitude) > 90)) return alert("Latitude tidak valid (-90 s/d 90).");
        if (data.longitude && (parseFloat(data.longitude) < -180 || parseFloat(data.longitude) > 180)) return alert("Longitude tidak valid (-180 s/d 180).");

        const action = isNewMode ? post(route('cities.store')) : put(route('cities.update', selectedCityId));
        action.then(() => {
            if (isNewMode) { reset(); setIsNewMode(false); }
            showNotification(isNewMode ? '✨ Data baru ditambahkan!' : '✅ Data diperbarui!');
        });
    };

    return (
        <div className="relative">
            {notification && (
                <div className="absolute -top-14 right-0 bg-green-500/20 border border-green-500/50 text-green-400 px-4 py-3 rounded-md shadow-lg flex items-center gap-3 backdrop-blur-sm transition-all animate-pulse z-50">
                    <span className="text-sm font-medium">{notification}</span>
                </div>
            )}

            <ImportCsv showNotification={showNotification} />

            <form onSubmit={handleSubmit} className="bg-[#1f232b] rounded-lg p-6 border border-slate-700/50 mb-8 transition-all">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-6">
                    <div className="w-full md:flex-1 relative">
                        <label className="block text-sm text-slate-400 mb-1">
                            {isNewMode ? 'Tambah Kota Baru' : 'Cari Kota / Provinsi untuk Diupdate'}
                        </label>
                        {!isNewMode && (
                            <CitySearch 
                                cities={cities} selectedCityId={selectedCityId} 
                                onCitySelect={setSelectedCityId} onClear={() => { setSelectedCityId(''); reset(); }} 
                            />
                        )}
                    </div>
                    <button type="button" onClick={() => setIsNewMode(!isNewMode)} className="shrink-0 bg-[#2a303c] hover:bg-slate-700 text-blue-400 border border-slate-600 px-4 py-2 rounded-md text-sm font-medium transition-colors h-[40px]">
                        {isNewMode ? 'Batal Tambah' : '+ Tambah Kota'}
                    </button>
                </div>

                {(isNewMode || selectedCityId) && (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-4 bg-slate-800/30 rounded-md border border-slate-700/50">
                            <FormInput label="Nama Kota" required value={data.nama} onChange={(e) => setData('nama', e.target.value)} placeholder="Contoh: Muara Enim" error={errors.nama} />
                            <FormInput label="Provinsi" value={data.provinsi} onChange={(e) => setData('provinsi', e.target.value)} placeholder="Contoh: Sumatera Selatan" error={errors.provinsi} />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <FormInput label="Latitude (Opsional)" type="number" step="any" min="-90" max="90" value={data.latitude} onChange={(e) => setData('latitude', e.target.value)} error={errors.latitude} />
                            <FormInput label="Longitude (Opsional)" type="number" step="any" min="-180" max="180" value={data.longitude} onChange={(e) => setData('longitude', e.target.value)} error={errors.longitude} />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                            <FormInput label="UMR" type="number" min="0" value={data.umr} onChange={(e) => setData('umr', e.target.value)} placeholder="0" />
                            <FormInput label="Waktu Tempuh (dtk/10km)" type="number" min="0" value={data.waktu_tempuh} onChange={(e) => setData('waktu_tempuh', e.target.value)} placeholder="0" />
                            <FormInput label="Jumlah Armada Online" type="number" min="0" value={data.armada_online} onChange={(e) => setData('armada_online', e.target.value)} placeholder="0" />
                            <FormInput label="Kendaraan Pribadi" type="number" min="0" value={data.kendaraan_pribadi} onChange={(e) => setData('kendaraan_pribadi', e.target.value)} placeholder="0" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                            <FormInput label="Tarif Minimum Aktual" type="number" min="0" value={data.tarif_min} onChange={(e) => setData('tarif_min', e.target.value)} placeholder="0" />
                        </div>
                    </>
                )}

                <div className="flex justify-end items-center gap-3">
                    {!isNewMode && (
                        <button type="button" onClick={handleDelete} disabled={!selectedCityId || isDeleting || processing} className="px-5 py-2 rounded-md text-sm font-semibold bg-red-600 hover:bg-red-700 disabled:opacity-40 text-white min-w-[130px]">
                            {isDeleting ? 'Menghapus...' : 'Delete Data'}
                        </button>
                    )}
                    <button type="submit" disabled={processing || isDeleting} className={`px-6 py-2 rounded-md text-sm font-semibold disabled:opacity-50 min-w-[140px] ${isNewMode ? 'bg-green-600 text-white' : 'bg-blue-600 text-white'}`}>
                        {processing ? 'Menyimpan...' : (isNewMode ? 'Simpan Data Baru' : 'Update Data')}
                    </button>
                </div>
            </form>
        </div>
    );
}