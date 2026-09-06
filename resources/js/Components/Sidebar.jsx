import React from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function Sidebar() {
    const { url, props } = usePage();
    const user = props.auth.user;

    return (
        <aside className="w-64 bg-[#1f232b] border-r border-slate-700/50 flex flex-col hidden md:flex">
            <div className="p-4 mt-4 space-y-2">
                
                <Link 
                    href="/" 
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-md text-sm transition-colors ${
                        url === '/' 
                        ? 'bg-[#2a303c] text-blue-400 font-semibold border border-slate-700/50' 
                        : 'text-slate-400 hover:text-slate-200 hover:bg-[#2a303c]'
                    }`}
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
                    Dashboard Publik
                </Link>
                
                <Link 
                    href={user ? "/dashboard" : "/login"} 
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-md text-sm transition-colors ${
                        url.startsWith('/dashboard') || url.startsWith('/login')
                        ? 'bg-[#2a303c] text-blue-400 font-semibold border border-slate-700/50' 
                        : 'text-slate-400 hover:text-slate-200 hover:bg-[#2a303c]'
                    }`}
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                    Admin Panel
                </Link>

                {user && (
                    <Link 
                        href={route('logout')} 
                        method="post" 
                        as="button"
                        className="w-full flex items-center gap-3 text-slate-400 hover:text-red-400 hover:bg-[#2a303c] px-4 py-3 rounded-md text-sm transition-colors text-left mt-8"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                        Logout
                    </Link>
                )}
                
            </div>
        </aside>
    );
}