export interface WordList {
    id: string;
    name: string;
    words: string[];
    createdAt: number;
}

export interface GameState {
    status: 'IDLE' | 'DICTATING' | 'WAITING_INPUT' | 'CHECKING' | 'FEEDBACK_RETRY' | 'FEEDBACK_SUCCESS' | 'GAME_OVER';
    currentWordIndex: number;
    attempts: number; // 0 or 1
    input: string;
    score: number;
    activeList: WordList | null;
    shuffledWords: string[];
}
