import { WordList } from '../types';

export const DEFAULT_LISTS: Omit<WordList, 'id' | 'createdAt'>[] = [
    {
        name: "Semaine 3",
        words: [
            "BARRAGE", "BEIGE", "ÉLEVAGE", "NAUFRAGE", "GARAGE",
            "FEUILLAGE", "STAGE", "NETTOYAGE", "PARTAGE", "TIGE",
            "POURCENTAGE", "RIVAGE", "ÉTALAGE", "TISSAGE", "APPRENTISSAGE"
        ]
    },
    {
        name: "Semaine 4",
        words: [
            "SEAU", "SPORT", "SAUCE", "SALETÉ", "SÈVE",
            "SALUER", "SEMELLE", "SALAIRE", "SEMBLABLE", "SIFFLEMENT",
            "SONNER", "SANDWICH", "SOUFFLER", "SEL", "SIGNAL",
            "SÉCHER", "SOURD", "SIFFLET", "SAINT(E)", "SOUPLE",
            "CIRE", "CERF", "CENTAINE", "CÉLÈBRE", "CECI"
        ]
    },
    {
        name: "Semaine 5",
        words: [
            "ÉVIDENTE", "EXCELLENTE", "CLIENTE", "PARACHUTE", "ÉTROITE",
            "JOURNALISTE", "TOURISTE", "ÉLÉPHANTE", "RÉCOLTE", "EXPERTE",
            "PARFAITE", "MARMITE", "IDIOTE", "GÉANTE", "PUISSANTE",
            "VASTE", "MÉRITE", "SPÉCIALISTE", "VESTE", "INTÉRESSANTE",
            "BRILLANTE", "DISTRAITE"
        ]
    }
];
