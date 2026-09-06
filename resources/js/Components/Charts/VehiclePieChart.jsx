import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = ['#4a85ce', '#2d4975', '#60a5fa', '#93c5fd'];
const INACTIVE_COLOR = ['#334155'];

export default function VehiclePieChart({ activeCity }) {
    const activePieData = activeCity ? [
        { name: 'Kendaraan Pribadi', value: activeCity.kendaraan_pribadi || 0 },
        { name: 'Ojek Online', value: activeCity.armada_online || 0 },
        { name: 'Kendaraan Umum', value: Math.round((activeCity.kendaraan_pribadi || 0) * 0.3) },
        { name: 'Kendaraan Barang', value: Math.round((activeCity.armada_online || 0) * 0.15) }
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
    );
}