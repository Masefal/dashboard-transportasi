import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function UmrBarChart({ cities, activeCity, onCityClick }) {
    const sortedCities = [...cities].sort((a, b) => (b.umr || 0) - (a.umr || 0));
    
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

    return (
        <div 
            className="bg-[#1f232b] border border-slate-700/50 rounded-lg p-5 h-72 cursor-default" 
            onClick={() => onCityClick(null)}
        >
            <h3 className="text-sm font-medium mb-4">Top 10 Kota dengan UMR Tertinggi</h3>
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
                                const clickedCity = cities.find(c => c.nama === data.kota);
                                if (clickedCity) onCityClick(clickedCity);
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
    );
}