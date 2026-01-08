
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
