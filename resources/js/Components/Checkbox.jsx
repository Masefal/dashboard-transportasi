export default function Checkbox({ className = '', ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                'rounded border-slate-700 bg-[#2a303c] text-blue-600 shadow-sm focus:ring-blue-500 focus:ring-offset-[#1f232b] ' +
                className
            }
        />
    );
}
