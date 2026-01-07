import { ButtonHTMLAttributes } from 'react';
import { clsx } from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'letter' | 'action' | 'special';
    label: string;
    subLabel?: string;
}

export function MembraneButton({ variant = 'letter', label, subLabel, className, ...props }: ButtonProps) {
    return (
        <button
            className={clsx(
                "relative group active:scale-[0.98] transition-transform duration-75 select-none touch-manipulation",
                // Shape and base style
                "w-full aspect-square rounded-xl flex flex-col items-center justify-center",
                // Backgrounds based on variant
                variant === 'letter' && "bg-[#F39C12] shadow-[0_4px_0_#D35400]",
                variant === 'action' && "bg-[#27AE60] shadow-[0_4px_0_#219150]", // Green for Go/Enter
                variant === 'special' && "bg-[#C0392B] shadow-[0_4px_0_#962D22]", // Red for Erase/Off
                // "Membrane" feel - flat but with a tactile ridge
                className
            )}
            {...props}
        >
            {/* Glossy overlay top half */}
            <div className="absolute inset-x-0 top-0 h-1/2 bg-white/20 rounded-t-xl pointer-events-none" />

            <span className="text-2xl font-bold text-retro-dark drop-shadow-sm font-sans z-10">
                {label}
            </span>
            {subLabel && (
                <span className="text-[0.6rem] font-bold text-retro-dark/70 uppercase absolute bottom-2 z-10">
                    {subLabel}
                </span>
            )}

            {/* Tactile circle in center simulation */}
            <div className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-white/5 opacity-0 group-active:opacity-100 transition-opacity" />
        </button>
    );
}
