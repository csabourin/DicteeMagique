import { useState, useEffect } from 'react';
import { RetroShell } from './components/RetroShell';
import { VFDDisplay } from './components/VFDDisplay';
import { MembraneKeyboard } from './components/MembraneKeyboard';
import { ListManager } from './components/ListManager';
import { useGame } from './hooks/useGame';
import { WordList } from './types';

function App() {
    const {
        gameState,
        message,
        startGame,
        handleInput,
        handleClear,
        handleEnter,
        handleReplay
    } = useGame();

    const [showListManager, setShowListManager] = useState(false);
    const [isInitializing, setIsInitializing] = useState(true);

    // Initial load check
    useEffect(() => {
        checkActiveList();
    }, []);

    const checkActiveList = async () => {
        // We don't automatically start, just checking readiness
        setIsInitializing(false);
    };

    const handleListSelect = (list: WordList) => {
        setShowListManager(false);
        startGame(list);
    };

    // Determine what to show on display
    const getDisplayText = () => {
        if (message) return message;
        if (gameState.status === 'WAITING_INPUT' || gameState.status === 'CHECKING') {
            return gameState.input || '_';
        }
        if (gameState.status === 'IDLE' && !gameState.activeList) {
            return "BONJOUR";
        }
        if (gameState.status === 'IDLE' && gameState.activeList) {
            return "PRET ?";
        }
        return "";
    };

    if (isInitializing) return <div className="bg-neutral-900 min-h-screen" />;

    return (
        <div className="min-h-screen bg-neutral-900 font-sans text-white">
            <RetroShell>

                {/* Screen Area */}
                <div className="mb-4 sm:mb-8 relative shrink-0" onClick={() => setShowListManager(true)}>
                    <VFDDisplay
                        text={getDisplayText()}
                        isBlinking={gameState.status === 'WAITING_INPUT' && gameState.input.length === 0}
                    />
                    {/* Invisible trigger for list manager on screen tap for simplicity on iPad,
                 or a dedicated button below? */}
                </div>

                {/* Keyboard Area */}
                <MembraneKeyboard
                    onKeyPress={handleInput}
                    onEnter={handleEnter}
                    onClear={handleClear}
                    onReplay={handleReplay}
                    disabled={gameState.status !== 'WAITING_INPUT' && gameState.status !== 'IDLE'}
                />

                {/* Control Buttons (Discreet) */}
                <div className="mt-4 sm:mt-8 flex gap-4 justify-center shrink-0 items-center">
                    <button
                        onClick={() => setShowListManager(true)}
                        className="text-[#803000] text-sm font-bold uppercase tracking-widest opacity-50 hover:opacity-100"
                    >
                        {gameState.activeList ? `Liste: ${gameState.activeList.name}` : "Choisir une liste"}
                    </button>
                </div>

            </RetroShell>

            {showListManager && (
                <ListManager
                    onSelect={handleListSelect}
                    onClose={() => setShowListManager(false)}
                />
            )}
        </div>
    );
}

export default App;
