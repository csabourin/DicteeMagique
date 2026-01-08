import { useState, useCallback, useEffect } from 'react';
import { tts } from '../lib/tts';
import { getRandomCompliment } from '../lib/language';
import { GameState, WordList } from '../types';

export function useGame() {
    const [gameState, setGameState] = useState<GameState>({
        status: 'IDLE',
        currentWordIndex: 0,
        attempts: 0,
        input: '',
        score: 0,
        activeList: null,
        shuffledWords: []
    });

    const [message, setMessage] = useState<string>('');

    const startGame = useCallback((list: WordList) => {
        // Shuffle words
        const shuffled = [...list.words].sort(() => Math.random() - 0.5);

        setGameState({
            status: 'IDLE',
            currentWordIndex: 0,
            attempts: 0,
            input: '',
            score: 0,
            activeList: list,
            shuffledWords: shuffled
        });
        setMessage(`PRÊT ?`);

        // Small delay before starting
        setTimeout(() => {
            playWord(shuffled[0]);
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

        const textToSpeak = word;

        tts.speak(textToSpeak, () => {
            setGameState(prev => ({ ...prev, status: 'WAITING_INPUT' }));
            setMessage("");
        });
    };

    const handleInput = useCallback((char: string) => {
        setGameState(prev => {
            // Allow input in IDLE for initial "wake up" or just waiting
            if (prev.status !== 'WAITING_INPUT') return prev;
            if (prev.input.length >= 16) return prev; // Increased for longer words (Pourcentage etc)

            // Normalize input? No, we want to allow accents now.
            return { ...prev, input: prev.input + char };
        });
    }, []);



    const handleClear = useCallback(() => {
        setGameState(prev => ({ ...prev, input: '' }));
    }, []);

    const handleReplay = useCallback(() => {
        const word = gameState.shuffledWords[gameState.currentWordIndex];
        if (word && gameState.status === 'WAITING_INPUT') {
            playWord(word);
        }
    }, [gameState]);

    const handleEnter = useCallback(() => {
        const { shuffledWords, currentWordIndex, input, attempts } = gameState;
        if (!shuffledWords || gameState.status !== 'WAITING_INPUT') return;

        const targetWord = shuffledWords[currentWordIndex];

        setGameState(prev => ({ ...prev, status: 'CHECKING' }));

        if (input === targetWord) {
            // Success
            if (attempts === 0) {
                setGameState(prev => ({ ...prev, score: prev.score + 1 }));
            }

            setMessage("BRAVO");
            tts.speak(getRandomCompliment());
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
            if (nextIndex >= (prev.shuffledWords?.length || 0)) {
                // End of list
                const total = prev.shuffledWords?.length || 0;
                const finalScore = prev.score;

                // Slight hack: The score update from handleEnter might be processed in this same tick if we are not careful?
                // Actually handleEnter ran 2s ago. So prev.score is accurate.

                setMessage(`SCORE ${finalScore}/${total}`);
                tts.speak(`La dictée est terminée. Ton score est de ${finalScore} sur ${total}`);
                return { ...prev, status: 'GAME_OVER' };
            }

            // Play next
            const nextWord = prev.shuffledWords[nextIndex];
            // Use timeout to break stack/render cycle slightly and allow state update
            setTimeout(() => playWord(nextWord), 500);

            return {
                ...prev,
                currentWordIndex: nextIndex,
                status: 'IDLE' // Temporary until playWord triggers
            };
        });
    };

    // Physical Keyboard Listener
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const key = e.key.toUpperCase();

            if (key === 'ENTER') {
                handleEnter();
                return;
            }
            if (key === 'BACKSPACE') {
                handleClear();
                return;
            }

            if ("ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-'.ÉÈÀÇÙ".includes(key)) {
                handleInput(key);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleEnter, handleInput, handleClear]);

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
