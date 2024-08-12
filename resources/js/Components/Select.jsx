import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function TextInput({ type = 'text', className = '', isFocused = false, ...props }, ref) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <select
            {...props}
           
            className={
                'w-full py-2 px-5 rounded-md border-1 border-slate-300 bg-transparent placeholder:text-xs placeholder:font-medium text-slate-900 transition-all duration-300  focus:outline-0 focus:ring-0  focus:bg-white focus:shadow-lg' +
                className
            }
           
            ref={input}
        />
    );
});
