import { useState, useEffect } from 'react';
import { WordList } from '../types';
import { saveList, getLists, setActiveListId, deleteList } from '../lib/storage';
import { DEFAULT_LISTS } from '../data/defaults';

interface ListManagerProps {
    onSelect: (list: WordList) => void;
    onClose: () => void;
}

export function ListManager({ onSelect, onClose }: ListManagerProps) {
    const [lists, setLists] = useState<WordList[]>([]);
    const [mode, setMode] = useState<'SELECT' | 'CREATE'>('SELECT');
    const [newName, setNewName] = useState('');
    const [newWords, setNewWords] = useState('');

    useEffect(() => {
        loadLists();
    }, []);

    const loadLists = async () => {
        let loaded = await getLists();

        // Initial population
        if (loaded.length === 0) {
            const now = Date.now();
            for (const def of DEFAULT_LISTS) {
                const list: WordList = {
                    id: def.id,
                    name: def.name,
                    words: def.words,
                    createdAt: now
                };
                await saveList(list);
            }
            loaded = await getLists();
        }

        setLists(loaded);
    };

    const handleCreate = async () => {
        if (!newName || !newWords) return;

        const wordsArray = newWords
            .split(/[\n,]+/)
            .map(w => w.trim().toUpperCase())
            .filter(w => w.length > 0);

        if (wordsArray.length === 0) return;

        const newList: WordList = {
            id: crypto.randomUUID(),
            name: newName,
            words: wordsArray,
            createdAt: Date.now()
        };

        await saveList(newList);
        await loadLists();
        setMode('SELECT');
        setNewName('');
        setNewWords('');
    };

    const handleSelect = async (list: WordList) => {
        await setActiveListId(list.id);
        onSelect(list);
    };

    const handleDelete = async (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        if (confirm('Supprimer cette liste ?')) {
            await deleteList(id);
            loadLists();
        }
    };

    return (
        <div className="absolute inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
            <div className="bg-white text-black p-6 rounded-lg max-w-md w-full shadow-2xl">
                <h2 className="text-2xl font-bold mb-4 text-retro-dark">
                    {mode === 'SELECT' ? 'Choisir une liste' : 'Nouvelle liste'}
                </h2>

                {mode === 'SELECT' ? (
                    <div className="space-y-4">
                        <div className="max-h-60 overflow-y-auto space-y-2">
                            {lists.length === 0 && (
                                <p className="text-gray-500 italic">Aucune liste trouvée.</p>
                            )}
                            {lists.map(list => (
                                <div
                                    key={list.id}
                                    onClick={() => handleSelect(list)}
                                    className="p-3 bg-gray-100 hover:bg-orange-100 cursor-pointer rounded flex justify-between items-center group"
                                >
                                    <span className="font-bold">{list.name}</span>
                                    <span className="text-sm text-gray-500 mr-2">({list.words.length} mots)</span>
                                    <button
                                        onClick={(e) => handleDelete(list.id, e)}
                                        className="text-red-500 opacity-0 group-hover:opacity-100 px-2"
                                    >
                                        🗑️
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="flex gap-2 pt-4 border-t">
                            <button
                                onClick={() => setMode('CREATE')}
                                className="flex-1 bg-retro-orange text-white py-2 rounded font-bold hover:bg-orange-600"
                            >
                                + Créer une liste
                            </button>
                            <button
                                onClick={onClose}
                                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
                            >
                                Fermer
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold mb-1">Nom de la liste</label>
                            <input
                                value={newName}
                                onChange={e => setNewName(e.target.value)}
                                className="w-full p-2 border rounded"
                                placeholder="Ex: Mots de la semaine"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold mb-1">Mots (séparés par des lignes ou virgules)</label>
                            <textarea
                                value={newWords}
                                onChange={e => setNewWords(e.target.value)}
                                className="w-full p-2 border rounded h-32"
                                placeholder="CHAT, CHIEN, MAISON..."
                            />
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={handleCreate}
                                className="flex-1 bg-retro-orange text-white py-2 rounded font-bold hover:bg-orange-600"
                            >
                                Sauvegarder
                            </button>
                            <button
                                onClick={() => setMode('SELECT')}
                                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
                            >
                                Annuler
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
