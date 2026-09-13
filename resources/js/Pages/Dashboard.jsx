import React from 'react';
import { Head } from '@inertiajs/react';
import Sidebar from '@/Components/Sidebar';
import UpdateDataForm from '@/Components/UpdateDataForm';
import AdminDataTable from '@/Components/AdminDataTable';
import Footer from '@/Components/Footer';

export default function Dashboard({ auth, cities }) {
    return (
        <>
            <Head title="Admin Panel - Update Data Tarif" />
            <div className="min-h-screen bg-[#1a1d24] text-slate-300 flex font-sans">
                
                <Sidebar />

                <main className="flex-1 flex flex-col overflow-y-auto p-8">
                    <h1 className="text-xl font-medium text-white mb-6">Admin Panel - Update Data Tarif</h1>

                    <UpdateDataForm cities={cities} />
                    
                    <AdminDataTable cities={cities} />
                    <Footer />
                </main>             
            </div>
        </>
    );
}