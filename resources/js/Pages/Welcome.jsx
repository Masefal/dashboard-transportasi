import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import Sidebar from '@/Components/Sidebar';
import CityDetailPanel from '@/Components/CityDetailPanel';
import TransportMap from '@/Components/TransportMap';
import UmrBarChart from '@/Components/Charts/UmrBarChart';
import VehiclePieChart from '@/Components/Charts/VehiclePieChart';
import DataTable from '@/Components/DataTable';

export default function Welcome({ cities }) {
    const [activeCity, setActiveCity] = useState(null);

    return (
        <>
            <Head title="Dashboard Transportasi Multikriteria" />
            <div className="min-h-screen bg-[#1a1d24] text-slate-200 flex font-sans">
                
                <Sidebar />

                <main className="flex-1 flex flex-col overflow-y-auto">
                    <header className="px-6 py-4 border-b border-slate-700/50">
                        <h1 className="text-xl font-medium text-white">Dashboard Transportasi Multikriteria</h1>
                    </header>

                    <div className="p-6 space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                            
                            <div className="col-span-1 bg-[#1f232b] border border-slate-700/50 rounded-lg flex flex-col h-[400px]">
                                <CityDetailPanel activeCity={activeCity} />
                            </div>

                            <div className="col-span-1 lg:col-span-3 h-[400px] bg-[#1f232b] rounded-lg border border-slate-700/50 overflow-hidden relative z-0">
                                <TransportMap 
                                    activeCity={activeCity} 
                                    allCities={cities} 
                                    onCityClick={setActiveCity} 
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <UmrBarChart 
                                cities={cities} 
                                activeCity={activeCity} 
                                onCityClick={setActiveCity} 
                            />
                            <VehiclePieChart 
                                activeCity={activeCity} 
                            />
                        </div>

                        <DataTable 
                            cities={cities} 
                            activeCity={activeCity} 
                            onCityClick={setActiveCity} 
                        />

                    </div>
                </main>
            </div>
        </>
    );
}