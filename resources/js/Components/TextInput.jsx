import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

export default forwardRef(function TextInput(
    { type = 'text', className = '', isFocused = false, ...props },
    ref,
) {
    const localRef = useRef(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    return (
        <input
            {...props}
            type={type}
            className={
                'rounded-lg border border-slate-700/60 bg-[#2a303c] text-slate-200 placeholder-slate-500 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 ' +
                className
            }
            ref={localRef}
        />
    );
});
