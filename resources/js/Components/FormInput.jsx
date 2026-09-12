import React from 'react';

export default function FormInput({ label, type = "text", value, onChange, placeholder, error, required, min, max, step }) {
    return (
        <div>
            <label className="block text-sm text-slate-400 mb-1">{label}</label>
            <input
                type={type}
                required={required}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                min={min}
                max={max}
                step={step}
                className="w-full bg-[#2a303c] border-none rounded-md text-slate-300 p-2.5 text-sm focus:ring-1 focus:ring-blue-500"
            />
            {error && <div className="text-red-500 text-xs mt-1">{error}</div>}
        </div>
    );
}