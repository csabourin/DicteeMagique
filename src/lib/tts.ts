export class TTSService {
    private voices: SpeechSynthesisVoice[] = [];

    constructor() {
        this.initVoices();
        if (speechSynthesis.onvoiceschanged !== undefined) {
            speechSynthesis.onvoiceschanged = this.initVoices.bind(this);
        }
    }

    private initVoices() {
        this.voices = window.speechSynthesis.getVoices();
    }

    speak(text: string, onEnd?: () => void) {
        // Cancel any previous utterance
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'fr-FR';

        // Find a French voice if possible
        const frVoice = this.voices.find(v => v.lang.startsWith('fr'));
        if (frVoice) {
            utterance.voice = frVoice;
        }

        utterance.rate = 0.9; // Slightly slower for clarity
        utterance.pitch = 1.0;

        if (onEnd) {
            utterance.onend = onEnd;
        }

        window.speechSynthesis.speak(utterance);
    }

    speakWord(word: string, onEnd?: () => void) {
        this.speak(word, onEnd);
    }

    speakLetter(letter: string) {
        this.speak(letter);
    }
}

export const tts = new TTSService();
