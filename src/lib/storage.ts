import { openDB, DBSchema } from 'idb';
import { WordList } from '../types';

interface DicteeDB extends DBSchema {
    lists: {
        key: string;
        value: WordList;
    };
    settings: {
        key: string;
        value: { id: string; activeListId: string | null };
    };
}

const DB_NAME = 'dictee-magique-db';
const DB_VERSION = 1;

export const initDB = async () => {
    return openDB<DicteeDB>(DB_NAME, DB_VERSION, {
        upgrade(db) {
            if (!db.objectStoreNames.contains('lists')) {
                db.createObjectStore('lists', { keyPath: 'id' });
            }
            if (!db.objectStoreNames.contains('settings')) {
                db.createObjectStore('settings', { keyPath: 'id' });
            }
        },
    });
};

export const saveList = async (list: WordList) => {
    const db = await initDB();
    await db.put('lists', list);
};

export const getLists = async () => {
    const db = await initDB();
    return db.getAll('lists');
};

export const deleteList = async (id: string) => {
    const db = await initDB();
    await db.delete('lists', id);
};

export const setActiveListId = async (id: string) => {
    const db = await initDB();
    await db.put('settings', { id: 'config', activeListId: id });
};

export const getActiveListId = async () => {
    const db = await initDB();
    const config = await db.get('settings', 'config');
    return config?.activeListId || null;
};
