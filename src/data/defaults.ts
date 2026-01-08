import { WordList } from '../types';

export const DEFAULT_LISTS: Omit<WordList, 'id' | 'createdAt'>[] = [
    {
        name: "Semaine 3",
        words: [
            "BARRAGE", "BEIGE", "ELEVAGE", "NAUFRAGE", "GARAGE",
            "FEUILLAGE", "STAGE", "NETTOYAGE", "PARTAGE", "TIGE",
            "POURCENTAGE", "RIVAGE", "ETALAGE", "TISSAGE", "APPRENTISSAGE"
        ]
    },
    {
        name: "Semaine 4",
        words: [
            "SEAU", "SPORT", "SAUCE", "SALETE", "SEVE",
            "SALUER", "SEMELLE", "SALAIRE", "SEMBLABLE", "SIFFLEMENT",
            "SONNER", "SANDWICH", "SOUFFLER", "SEL", "SIGNAL",
            "SECHER", "SOURD", "SIFFLET", "SAINTE", "SOUPLE",
            "CIRE", "CERF", "CENTAINE", "CELEBRE", "CECI"
        ]
    },
    {
        name: "Semaine 5",
        words: [
            "EVIDENTE", "EXCELLENTE", "CLIENTE", "PARACHUTE", "ETROITE",
            "JOURNALISTE", "TOURISTE", "ELEPHANTE", "RECOLTE", "EXPERTE",
            "PARFAITE", "MARMITE", "IDIOTE", "GEANTE", "PUISSANTE",
            "VASTE", "MERITE", "SPECIALISTE", "VESTE", "INTERESSANTE",
            "BRILLANTE", "DISTRAITE"
        ]
    }
];
