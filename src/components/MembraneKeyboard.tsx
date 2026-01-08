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
    const accents = "ÉÈÀÇ".split('');

    return (
        <div className="grid grid-cols-5 gap-2 sm:gap-3 p-2 sm:p-4 bg-[#A04000] rounded-xl shadow-[inset_0_2px_8px_rgba(0,0,0,0.4)] flex-1 content-start overflow-y-auto min-h-0">
            {/* Letters */}
            {letters.map((char) => (
                <MembraneButton
                    key={char}
                    label={char}
                    onClick={() => onKeyPress(char)}
                    disabled={disabled}
                />
            ))}

            {/* Accents Row (New) */}
            {accents.map((char) => (
                <MembraneButton
                    key={char}
                    label={char}
                    variant="letter"
                    className="bg-[#E67E22]" // Slightly different shade for accents?
                    onClick={() => onKeyPress(char)}
                    disabled={disabled}
                />
            ))}

            {/* Spacer to fill the row if needed, or just flow? 
                26 letters. 
                + 4 accents = 30 keys. Perfect 5x6 grid.
                Wait, 30 keys fills 6 rows exactly.
            */}

            {/* Special Keys - Need to be strategically placed or added after */
                /* Currently: Clear (2), Replay (1), Enter (2) = 5 slots.
                   So we have 30 keys (letters+accents) + 5 specials = 35 slots = 7 rows of 5. Perfect.
                */
            }

            <MembraneButton
                variant="special"
                label="EFFACER"
                className="col-span-2 text-sm !aspect-[2/1]"
                onClick={onClear}
                disabled={disabled}
            />

            <MembraneButton
                variant="special"
                label="RÉPÉTER"
                className="col-span-1"
                onClick={onReplay}
                disabled={disabled}
            />

            <MembraneButton
                variant="action"
                label="ENTRÉE"
                className="col-span-2 !aspect-[2/1]"
                onClick={onEnter}
                disabled={disabled}
            />
        </div>
    );
}
