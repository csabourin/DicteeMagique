import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface VFDProps {
    text: string;
    className?: string;
    isBlinking?: boolean;
}

export function VFDDisplay({ text, className, isBlinking }: VFDProps) {
    // Pad text to simulate fixed segments if needed, or just center it.
    // The original had 8 chars. We can allow more but maybe scroll or truncate?
    // For now, let's just display it.

    return (
        <div
            className={twMerge(
                "bg-vfd-bg border-4 border-gray-800 rounded-lg p-4 overflow-hidden shadow-[inset_0_2px_10px_rgba(0,0,0,0.8)]",
                className
            )}
        >
            <div
                className={clsx(
                    "font-digital text-vfd-on text-5xl tracking-widest text-center uppercase drop-shadow-[0_0_8px_rgba(51,255,0,0.6)]",
                    isBlinking && "animate-pulse"
                )}
                style={{
                    textShadow: "0 0 10px rgba(51, 255, 0, 0.8), 0 0 20px rgba(51, 255, 0, 0.4)"
                }}
            >
                {text || "\u00A0"}
            </div>
        </div>
    );
}
