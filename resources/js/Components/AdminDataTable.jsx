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

    const handleExportCSV = () => {
        if (!sortedCities || sortedCities.length === 0) {
            alert('Tidak ada data kota untuk diexport.');
            return;
        }

        const headers = [
            'No',
            'Provinsi',
            'Kota',
            'UMR (Rp)',
            'Waktu Tempuh (detik/10km)',
            'Armada Online',
            'Kendaraan Pribadi',
            'Tarif Minimum (Rp)'
        ];

        const escapeCSV = (value) => {
            if (value === null || value === undefined) return '""';
            const str = String(value).replace(/"/g, '""');
            return `"${str}"`;
        };

        const rows = sortedCities.map((city, index) => [
            index + 1,
            escapeCSV(city.provinsi || ''),
            escapeCSV(city.nama || ''),
            city.umr !== null && city.umr !== undefined ? city.umr : '',
            city.waktu_tempuh !== null && city.waktu_tempuh !== undefined ? city.waktu_tempuh : '',
            city.armada_online !== null && city.armada_online !== undefined ? city.armada_online : '',
            city.kendaraan_pribadi !== null && city.kendaraan_pribadi !== undefined ? city.kendaraan_pribadi : '',
            city.tarif_min !== null && city.tarif_min !== undefined ? city.tarif_min : ''
        ]);

        const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', `data-transportasi-kota-${new Date().toISOString().slice(0, 10)}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const handlePrint = () => {
        if (!sortedCities || sortedCities.length === 0) {
            alert('Tidak ada data kota untuk dicetak.');
            return;
        }

        const printWindow = window.open('', '_blank');
        if (!printWindow) {
            window.print();
            return;
        }

        const tableRows = sortedCities.map((city, index) => `
            <tr>
                <td style="text-align: center; padding: 8px; border: 1px solid #cbd5e1;">${index + 1}</td>
                <td style="padding: 8px; border: 1px solid #cbd5e1;">${city.provinsi || '-'}</td>
                <td style="padding: 8px; border: 1px solid #cbd5e1; font-weight: 600;">${city.nama}</td>
                <td style="text-align: right; padding: 8px; border: 1px solid #cbd5e1;">Rp ${formatRp(city.umr)}</td>
                <td style="text-align: center; padding: 8px; border: 1px solid #cbd5e1;">${city.waktu_tempuh || '-'}</td>
                <td style="text-align: center; padding: 8px; border: 1px solid #cbd5e1;">${city.armada_online || '-'}</td>
                <td style="text-align: center; padding: 8px; border: 1px solid #cbd5e1;">${city.kendaraan_pribadi || '-'}</td>
                <td style="text-align: right; padding: 8px; border: 1px solid #cbd5e1;">Rp ${formatRp(city.tarif_min)}</td>
            </tr>
        `).join('');

        const currentDate = new Date().toLocaleDateString('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        printWindow.document.write(`
            <!DOCTYPE html>
            <html lang="id">
            <head>
                <meta charset="UTF-8">
                <title>Laporan Data Transportasi & Tarif Kota</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        color: #1e293b;
                        margin: 20px;
                        font-size: 12px;
                    }
                    .header {
                        text-align: center;
                        margin-bottom: 24px;
                        border-bottom: 2px solid #0284c7;
                        padding-bottom: 12px;
                    }
                    .header h1 {
                        margin: 0 0 6px 0;
                        font-size: 18px;
                        color: #0f172a;
                    }
                    .header p {
                        margin: 0;
                        color: #64748b;
                        font-size: 12px;
                    }
                    table {
                        width: 100%;
                        border-collapse: collapse;
                        margin-top: 12px;
                    }
                    th {
                        background-color: #f1f5f9;
                        color: #334155;
                        padding: 10px 8px;
                        border: 1px solid #cbd5e1;
                        font-size: 11px;
                        text-transform: uppercase;
                        letter-spacing: 0.5px;
                    }
                    tr:nth-child(even) {
                        background-color: #f8fafc;
                    }
                    .footer {
                        margin-top: 24px;
                        display: flex;
                        justify-content: space-between;
                        color: #64748b;
                        font-size: 11px;
                    }
                    @media print {
                        body { margin: 10mm; }
                        @page { size: landscape; }
                    }
                </style>
            </head>
            <body>
                <div class="header">
                    <h1>Sistem AHP & SAW - Laporan Data Transportasi & Tarif Kota</h1>
                    <p>Dicetak pada: ${currentDate}</p>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Provinsi</th>
                            <th>Kota</th>
                            <th>UMR</th>
                            <th>Waktu Tempuh (dtk/10km)</th>
                            <th>Armada Online</th>
                            <th>Kendaraan Pribadi</th>
                            <th>Tarif Minimum</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${tableRows}
                    </tbody>
                </table>
                <div class="footer">
                    <div>Total Data: ${sortedCities.length} Kota</div>
                    <div>Admin Panel - Sistem Transportasi Multikriteria</div>
                </div>
                <script>
                    window.onload = function() {
                        window.print();
                    };
                </script>
            </body>
            </html>
        `);
        printWindow.document.close();
    };

    return (
        <div className="bg-[#1f232b] rounded-lg border border-slate-700/50 p-6 flex-1 flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium text-white">Tabel Data (by Provinsi)</h3>
                <div className="flex gap-3">
                    <button 
                        type="button"
                        onClick={handlePrint}
                        className="flex items-center gap-2 bg-[#2a303c] hover:bg-slate-700 active:bg-slate-800 text-slate-300 px-4 py-2 rounded-md text-sm transition-colors border border-slate-600 cursor-pointer select-none"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
                        Print
                    </button>
                    <button 
                        type="button"
                        onClick={handleExportCSV}
                        className="flex items-center gap-2 bg-[#e5e7eb] hover:bg-white active:bg-slate-200 text-slate-800 px-4 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer select-none"
                    >
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