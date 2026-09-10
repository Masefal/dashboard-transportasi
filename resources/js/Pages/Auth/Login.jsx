import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log In" />

            <div className="mb-6 border-b border-slate-700/50 pb-4">
                <h2 className="text-xl font-semibold text-white">Login Admin</h2>
            </div>

            {status && (
                <div className="mb-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30 p-3 text-sm font-medium text-emerald-400 flex items-center gap-2">
                    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{status}</span>
                </div>
            )}

            <form onSubmit={submit} className="space-y-5">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1.5">
                        Email
                    </label>

                    <input
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="w-full bg-[#2a303c] border border-slate-700/60 rounded-lg text-slate-200 placeholder-slate-500 px-3.5 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
                        autoComplete="username"
                        autoFocus
                        placeholder="admin@example.com"
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    {errors.email && (
                        <p className="mt-1.5 text-xs text-red-400 font-medium">{errors.email}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-1.5">
                        Password
                    </label>

                    <input
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="w-full bg-[#2a303c] border border-slate-700/60 rounded-lg text-slate-200 placeholder-slate-500 px-3.5 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
                        autoComplete="current-password"
                        placeholder="••••••••"
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    {errors.password && (
                        <p className="mt-1.5 text-xs text-red-400 font-medium">{errors.password}</p>
                    )}
                </div>

                <div className="flex items-center justify-between pt-1">
                    <label className="flex items-center cursor-pointer select-none">
                        <input
                            type="checkbox"
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                            className="rounded border-slate-700 bg-[#2a303c] text-blue-600 focus:ring-blue-500 focus:ring-offset-[#1f232b] h-4 w-4"
                        />
                        <span className="ms-2 text-sm text-slate-400 hover:text-slate-300">
                            Ingat saya
                        </span>
                    </label>

                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="text-xs text-blue-400 hover:text-blue-300 hover:underline transition-colors"
                        >
                            Lupa password?
                        </Link>
                    )}
                </div>

                <div className="pt-2">
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg shadow-md transition-all duration-150 disabled:opacity-50 text-sm cursor-pointer"
                    >
                        {processing ? (
                            <>
                                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                <span>Memproses...</span>
                            </>
                        ) : (
                            <span>Masuk</span>
                        )}
                    </button>
                </div>
            </form>
        </GuestLayout>
    );
}
