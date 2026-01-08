export function getDeterminer(word: string): string {
    const w = word.toUpperCase();
    // Vowel start = L'
    if (/^[AEIOUHYÉÈÊÂÎÔÛ]/.test(w)) return "L'";

    // Common endings heuristic (Not perfect but decent for a toy)
    // Feminine endings
    if (w.endsWith("E") || w.endsWith("ION") || w.endsWith("TE") || w.endsWith("ADE")) {
        // Exceptions (Masculine ending in E)
        const mascExceptions = ["LYCÉE", "MUSÉE", "MONDE", "LIVRE", "VERRE", "FROMAGE", "VISAGE", "VILLAGE", "STAGE", "GARAGE", "BARRAGE", "ÉLEVAGE", "NETTOYAGE", "PARTAGE", "POURCENTAGE", "RIVAGE", "ÉTALAGE", "TISSAGE", "APPRENTISSAGE", "SIFFLET", "SEAU", "SERVICE", "SILENCE", "STADE", "SUCRE", "SYMBOLE", "SYSTEME"];
        if (mascExceptions.includes(w)) return "LE ";

        // Default Feminine
        return "LA ";
    }

    // Default Masculine
    return "LE ";
}

const COMPLIMENTS = [
    "C'est exact !",
    "Bravo !",
    "Très bien !",
    "C'est correct !",
    "Excellent !",
    "Super !",
    "C'est ça !"
];

export function getRandomCompliment(): string {
    return COMPLIMENTS[Math.floor(Math.random() * COMPLIMENTS.length)];
}
