import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="min-h-screen bg-[#1a1d24] text-slate-200 flex flex-col justify-center items-center px-4 py-10 sm:px-6">
            <div className="w-full max-w-2xl flex flex-col items-center text-center mb-8">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight group-hover:text-blue-400 transition-colors">
                    Sistem AHP & SAW
                </h1>
                <p className="mt-3 text-sm sm:text-base text-slate-400 leading-relaxed max-w-xl mx-auto">
                    Sistem perbandingan kota menggunakan metode Analytic Hierarchy Process (AHP) dan Simple Additive Weighting (SAW) untuk analisis preferensi dan rekomendasi tarif transportasi online.
                </p>
            </div>

            <div className="w-full sm:max-w-md bg-[#1f232b] border border-slate-700/50 rounded-xl shadow-2xl p-6 sm:p-8">
                {children}
            </div>

            <div className="mt-8 text-center">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-blue-400 transition-colors py-1.5 px-3 rounded-lg hover:bg-[#1f232b] border border-transparent hover:border-slate-700/50"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                    </svg>
                    Kembali ke Dashboard Publik
                </Link>
            </div>
        </div>
    );
}
