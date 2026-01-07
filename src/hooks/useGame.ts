import { useState, useCallback } from 'react';
import { WordList, GameState } from '../types';
import { tts } from '../lib/tts';

export function useGame() {
    const [gameState, setGameState] = useState<GameState>({
        status: 'IDLE',
        currentWordIndex: 0,
        attempts: 0,
        input: '',
        score: 0,
        activeList: null
    });

    const [message, setMessage] = useState<string>('');

    const startGame = useCallback((list: WordList) => {
        setGameState({
            status: 'IDLE',
            currentWordIndex: 0,
            attempts: 0,
            input: '',
            score: 0,
            activeList: list
        });
        setMessage(`PRÊT ?`);

        // Small delay before starting
        setTimeout(() => {
            playWord(list.words[0]);
        }, 1000);
    }, []);

    const playWord = (word: string) => {
        setGameState(prev => ({
            ...prev,
            status: 'DICTATING',
            input: '',
            attempts: 0
        }));
        setMessage("ÉCOUTE");

        tts.speakWord(word, () => {
            setGameState(prev => ({ ...prev, status: 'WAITING_INPUT' }));
            setMessage("");
        });
    };

    const handleInput = useCallback((char: string) => {
        setGameState(prev => {
            if (prev.status !== 'WAITING_INPUT') return prev;
            if (prev.input.length >= 10) return prev; // Max length safety
            return { ...prev, input: prev.input + char };
        });
    }, []);

    const handleClear = useCallback(() => {
        setGameState(prev => ({ ...prev, input: '' }));
    }, []);

    const handleReplay = useCallback(() => {
        const word = gameState.activeList?.words[gameState.currentWordIndex];
        if (word && gameState.status === 'WAITING_INPUT') {
            tts.speakWord(word);
        }
    }, [gameState]);

    const handleEnter = useCallback(() => {
        const { activeList, currentWordIndex, input, attempts } = gameState;
        if (!activeList || gameState.status !== 'WAITING_INPUT') return;

        const targetWord = activeList.words[currentWordIndex];

        setGameState(prev => ({ ...prev, status: 'CHECKING' }));

        if (input === targetWord) {
            // Success
            setMessage("BRAVO");
            tts.speak("C'est exact !"); // Or "Très bien"
            setTimeout(() => {
                nextWord();
            }, 2000);
        } else {
            // Failure
            if (attempts === 0) {
                // First fail
                setMessage("NON");
                tts.speak("Essaie encore.");
                setTimeout(() => {
                    setGameState(prev => ({
                        ...prev,
                        status: 'WAITING_INPUT',
                        attempts: prev.attempts + 1,
                        input: ''
                    }));
                    setMessage("");
                }, 2000);
            } else {
                // Second fail -> Correction
                setMessage(targetWord);
                tts.speak(`Le mot était ${targetWord}`);
                // Spell it?
                // "C... H... A... T"
                // For now just show and move on.
                setTimeout(() => {
                    nextWord();
                }, 3000);
            }
        }
    }, [gameState]);

    const nextWord = () => {
        setGameState(prev => {
            const nextIndex = prev.currentWordIndex + 1;
            if (nextIndex >= (prev.activeList?.words.length || 0)) {
                // End of list
                setMessage("FINI !");
                tts.speak("La dictée est terminée.");
                return { ...prev, status: 'GAME_OVER' };
            }

            // Play next
            const nextWord = prev.activeList!.words[nextIndex];
            // Use timeout to break stack/render cycle slightly and allow state update
            setTimeout(() => playWord(nextWord), 500);

            return {
                ...prev,
                currentWordIndex: nextIndex,
                status: 'IDLE' // Temporary until playWord triggers
            };
        });
    };

    return {
        gameState,
        message,
        startGame,
        handleInput,
        handleClear,
        handleEnter,
        handleReplay
    };
}
