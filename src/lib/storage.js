import { scrapbookSeed } from '../data/memories';

const ALBUM_KEY = 'andini-scrapbook-v1';
const DATABASE = 'andini-photo-album-v1';
const STORE = 'uploads';

// On earlier deployments, the browser may have saved the original starter text.
// Upgrade only those exact old captions/labels/notes, keeping personal edits and
// uploaded images untouched. This lets returning visitors see the new photo text.
const ORIGINAL_STARTER_DETAILS = {
  p1: ['Under the very same sky', 'Our little reminder', 'Different places, one sky. I like thinking about that.'],
  p2: ['Somewhere between here and you', 'The distance chapter', 'A little space for every message that made a day sweeter.'],
  p3: ['A date we’ll have someday', 'Still on our wish list', 'Just us, a quiet table, and all the things we want to say in person.'],
  p4: ['When I look up at night', 'A soft little thought', 'Maybe the moon is keeping both of us company.'],
  p5: ['Flowers for you, from afar', 'A tiny imaginary bouquet', 'Until I can hand you some flowers myself.'],
  p6: ['Rainy-day conversations', 'A mood, not a date', 'Even ordinary moments can become something to keep.'],
  p7: ['All the little coincidences', 'Somewhere in this universe', 'Out of all the people in the world, somehow our paths crossed.'],
  p8: ['A silly little interruption', 'For the giggles', 'A reminder to put our jokes, screenshots, and funny memories here.'],
};
function upgradeStarterCaptions(savedMemories) {
  const current = Object.fromEntries(scrapbookSeed.memories.map(memory => [memory.id, memory]));
  return savedMemories.map(memory => {
    const original = ORIGINAL_STARTER_DETAILS[memory.id];
    const updated = current[memory.id];
    if (!original || !updated) return memory;
    const result = { ...memory };
    ['caption', 'date', 'note'].forEach((field, index) => {
      if (result[field] === original[index]) result[field] = updated[field];
    });
    return result;
  });
}

export function initialAlbum() {
  if (typeof window === 'undefined') return structuredClone(scrapbookSeed);
  try {
    const saved = JSON.parse(localStorage.getItem(ALBUM_KEY) || 'null');
    // Merge allows new sections added to the app in the future.
    return saved ? { ...structuredClone(scrapbookSeed), ...saved, memories: Array.isArray(saved.memories) ? upgradeStarterCaptions(saved.memories) : structuredClone(scrapbookSeed.memories) } : structuredClone(scrapbookSeed);
  } catch {
    return structuredClone(scrapbookSeed);
  }
}

export function saveAlbum(album) {
  const safe = {
    ...album,
    memories: album.memories.map(({ previewUrl, ...memory }) => ({
      ...memory,
      // Uploaded images are stored separately in IndexedDB to avoid localStorage quotas.
      image: memory.assetKey ? '' : memory.image,
    })),
  };
  try { localStorage.setItem(ALBUM_KEY, JSON.stringify(safe)); return true; }
  catch { return false; }
}

function openDatabase() {
  return new Promise((resolve, reject) => {
    if (!('indexedDB' in window)) { reject(new Error('IndexedDB not supported')); return; }
    const req = indexedDB.open(DATABASE, 1);
    req.onupgradeneeded = () => {
      if (!req.result.objectStoreNames.contains(STORE)) req.result.createObjectStore(STORE);
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function transact(mode, action) {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, mode);
    const request = action(tx.objectStore(STORE));
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
    tx.oncomplete = () => db.close();
    tx.onerror = () => { db.close(); reject(tx.error); };
  });
}
export const putPhoto = (key, value) => transact('readwrite', store => store.put(value, key));
export const getPhoto = key => transact('readonly', store => store.get(key));
export const deletePhoto = key => transact('readwrite', store => store.delete(key));

export function optimizeImage(file) {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) { reject(new Error('Please choose an image file.')); return; }
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);
    img.onload = () => {
      try {
        const max = 1500;
        const ratio = Math.min(1, max / Math.max(img.naturalWidth, img.naturalHeight));
        const canvas = document.createElement('canvas');
        canvas.width = Math.round(img.naturalWidth * ratio);
        canvas.height = Math.round(img.naturalHeight * ratio);
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const result = canvas.toDataURL('image/jpeg', 0.82);
        URL.revokeObjectURL(objectUrl);
        resolve(result);
      } catch (e) { URL.revokeObjectURL(objectUrl); reject(e); }
    };
    img.onerror = () => { URL.revokeObjectURL(objectUrl); reject(new Error(`Couldn't read ${file.name}.`)); };
    img.src = objectUrl;
  });
}
