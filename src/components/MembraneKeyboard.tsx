import { MembraneButton } from './MembraneButton';

interface KeyboardProps {
    onKeyPress: (key: string) => void;
    onEnter: () => void;
    onClear: () => void;
    onReplay: () => void;
    disabled?: boolean;
}

// The original Speak & Spell has A-M top row, N-Z bottom row roughly.
// Or a grid 5x? 
// Let's use a standard grid for usability but styled like the original.
// Original layout:
// A B C D E
// F G H I J
// K L M N O
// P Q R S T
// U V W X Y
// Z ' - . enter

export function MembraneKeyboard({ onKeyPress, onEnter, onClear, onReplay, disabled }: KeyboardProps) {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');

    return (
        <div className="grid grid-cols-5 gap-3 p-4 bg-[#A04000] rounded-xl shadow-[inset_0_2px_8px_rgba(0,0,0,0.4)]">
            {/* Letters */}
            {letters.map((char) => (
                <MembraneButton
                    key={char}
                    label={char}
                    onClick={() => onKeyPress(char)}
                    disabled={disabled}
                />
            ))}

            {/* Special Keys */}
            <MembraneButton
                variant="special"
                label="EFFACER"
                className="col-span-2 text-sm"
                onClick={onClear}
                disabled={disabled}
            />

            <MembraneButton
                variant="special"
                label="RÉPÉTER"
                // icon? 
                className="col-span-1"
                onClick={onReplay}
                disabled={disabled}
            />

            <MembraneButton
                variant="action"
                label="ENTRÉE"
                className="col-span-2"
                onClick={onEnter}
                disabled={disabled}
            />
        </div>
    );
}
