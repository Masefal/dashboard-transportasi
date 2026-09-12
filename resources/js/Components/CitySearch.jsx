import React, { useState, useEffect } from 'react';

export default function CitySearch({ cities, selectedCityId, onCitySelect, onClear }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        if (selectedCityId) {
            const city = cities.find(c => c.id.toString() === selectedCityId);
            if (city) setSearchTerm(`${city.nama} (${city.provinsi || 'Tanpa Provinsi'})`);
        } else {
            setSearchTerm('');
        }
    }, [selectedCityId, cities]);

    const filteredCities = cities.filter(city => 
        (city.nama && city.nama.toLowerCase().includes(searchTerm.toLowerCase())) || 
        (city.provinsi && city.provinsi.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="relative w-full">
            <input
                type="text" placeholder="Ketik nama kota atau provinsi..." value={searchTerm}
                onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setIsDropdownOpen(true);
                    if (e.target.value === '') onClear();
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
                                    onCitySelect(city.id.toString());
                                    setIsDropdownOpen(false);
                                }}
                                className="p-3 text-sm text-slate-300 hover:bg-blue-600 hover:text-white cursor-pointer border-b border-slate-700/50 last:border-none flex justify-between items-center"
                            >
                                <span className="font-semibold">{city.nama}</span>
                                <span className="text-xs opacity-70 bg-slate-800 px-2 py-1 rounded">{city.provinsi}</span>
                            </div>
                        ))
                    ) : (
                        <div className="p-3 text-sm text-slate-500 italic text-center">Kota atau provinsi tidak ditemukan</div>
                    )}
                </div>
            )}
        </div>
    );
}