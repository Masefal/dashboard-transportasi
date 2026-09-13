import React from 'react';

export default function Footer() {
    return (
        <footer className="w-full mt-8 py-5 border-t border-slate-700/50">
            <div className="flex flex-col md:flex-row justify-between items-center px-6 gap-2 text-xs text-slate-500">
                <div>
                    &copy; {new Date().getFullYear()} Dashboard Data Transportasi.
                </div>
                <div className="flex gap-4">
                    <span>Sistem Informasi Geografis</span>
                </div>
            </div>
        </footer>
    );
}