import React from 'react';
import { useForm } from '@inertiajs/react';

export default function ImportCsv({ showNotification }) {
    const { data, setData, post, processing } = useForm({
        file: null,
    });

    const handleImport = (e) => {
        e.preventDefault();
        post(route('cities.import'), {
            onSuccess: () => {
                showNotification('🚀 File CSV Berhasil Di-import!');
                setData('file', null);
            }
        });
    };

    return (
        <form onSubmit={handleImport} className="bg-[#1f232b] rounded-lg p-6 border border-slate-700/50 mb-6 flex flex-col md:flex-row items-center gap-4">
            <div className="flex-1 w-full">
                <label className="block text-sm text-slate-400 mb-1">Import Data via CSV</label>
                <input 
                    type="file" 
                    accept=".csv" 
                    onChange={(e) => setData('file', e.target.files[0])}
                    className="w-full text-sm text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer"
                />
            </div>
            <button 
                type="submit" 
                disabled={!data.file || processing} 
                className="shrink-0 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white px-6 py-2 rounded-md text-sm font-semibold transition-colors mt-5 md:mt-0"
            >
                {processing ? 'Mengimpor...' : 'Upload CSV'}
            </button>
        </form>
    );
}