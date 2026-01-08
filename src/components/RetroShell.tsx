import { ReactNode } from 'react';

interface ShellProps {
    children: ReactNode;
}

export function RetroShell({ children }: ShellProps) {
    return (
        <div className="min-h-screen h-screen overflow-hidden bg-neutral-800 flex flex-col items-center justify-center p-2 sm:p-4">
            <div className="relative w-full max-w-[600px] h-full max-h-[90vh] flex flex-col bg-retro-orange rounded-[30px] sm:rounded-[40px] p-4 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_-8px_10px_rgba(0,0,0,0.3)] border-b-8 border-[#A04000]">

                {/* Handle (La poignée typique) - Hidden on small vertical screens to save space? Or scaled. */}
                <div className="absolute -top-12 sm:-top-16 left-1/2 -translate-x-1/2 w-32 sm:w-48 h-16 sm:h-20 border-[16px] sm:border-[24px] border-retro-orange rounded-t-[30px] sm:rounded-t-[40px] border-b-0 shadow-[inset_0_10px_10px_rgba(0,0,0,0.2)] z-0 flex items-end justify-center">
                    {/* Inner part of handle background */}
                    <div className="w-full h-full bg-neutral-800 rounded-t-[15px] sm:rounded-t-[20px] translate-y-2 opacity-50 blur-sm"></div>
                </div>

                {/* Main Content Area */}
                <div className="relative z-10 flex flex-col gap-4 sm:gap-6 flex-1 h-full">
                    {/* Brand Logo Area */}
                    <div className="flex justify-between items-center px-2 sm:px-4 shrink-0">
                        <div className="text-2xl font-black italic tracking-tighter text-[#803000] opacity-80" style={{ fontFamily: 'sans-serif' }}>
                            La Dictée Magique
                        </div>
                        {/* Speaker Grille Simulation */}
                        <div className="grid grid-cols-6 gap-1">
                            {[...Array(12)].map((_, i) => (
                                <div key={i} className="w-2 h-2 bg-[#803000] rounded-full opacity-60 shadow-[inset_0_1px_2px_rgba(0,0,0,0.8)]" />
                            ))}
                        </div>
                    </div>

                    {/* Children (Display + Keyboard) */}
                    {children}

                </div>

                {/* Glossy highlights on the case */}
                <div className="absolute top-4 left-4 w-full h-[200px] bg-gradient-to-b from-white/20 to-transparent rounded-[30px] pointer-events-none" />
            </div>
        </div>
    );
}
