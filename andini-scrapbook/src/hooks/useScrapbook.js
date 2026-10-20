import { useEffect, useRef, useState } from 'react';
import { scrapbookSeed } from '../data/memories';
import { deletePhoto, getPhoto, initialAlbum, optimizeImage, putPhoto, saveAlbum } from '../lib/storage';

export function useScrapbook() {
  const [album, setAlbum] = useState(initialAlbum);
  const [ready, setReady] = useState(false);
  const [notice, setNotice] = useState('');
  const init = useRef(false);

  useEffect(() => {
    let active = true;
    (async () => {
      const resolved = await Promise.all(album.memories.map(async (memory) => {
        if (!memory.assetKey) return memory;
        try { const image = await getPhoto(memory.assetKey); return { ...memory, image: image || '' }; }
        catch { return { ...memory, image: '' }; }
      }));
      if (active) { setAlbum(old => ({ ...old, memories: resolved })); init.current = true; setReady(true); }
    })();
    return () => { active = false; };
    // Load saved uploads only once on first mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!init.current) return;
    if (!saveAlbum(album)) setNotice('Browser storage is full. Some edits may not be saved.');
  }, [album]);

  const patch = fields => setAlbum(old => ({ ...old, ...fields }));
  const updateMemory = (id, patchFields) => setAlbum(old => ({ ...old,
    memories: old.memories.map(m => m.id === id ? { ...m, ...patchFields } : m),
  }));
  const moveMemory = (id, direction) => setAlbum(old => {
    const memories = [...old.memories];
    const index = memories.findIndex(m => m.id === id);
    const next = index + direction;
    if (index < 0 || next < 0 || next >= memories.length) return old;
    [memories[index], memories[next]] = [memories[next], memories[index]];
    return { ...old, memories };
  });
  const removeMemory = async memory => {
    if (memory.assetKey) { try { await deletePhoto(memory.assetKey); } catch { /* best-effort */ } }
    setAlbum(old => ({ ...old, memories: old.memories.filter(m => m.id !== memory.id) }));
  };
  const addMemories = async files => {
    let done = 0;
    for (const file of Array.from(files)) {
      if (!file.type.startsWith('image/')) continue;
      try {
        const dataUrl = await optimizeImage(file);
        const id = crypto.randomUUID?.() || `memory-${Date.now()}-${Math.random()}`;
        const assetKey = `uploaded-${id}`;
        await putPhoto(assetKey, dataUrl);
        setAlbum(old => ({ ...old, memories: [...old.memories, {
          id, assetKey, image: dataUrl, caption: file.name.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' '), date: '', note: '',
        }] }));
        done += 1;
      } catch (error) { setNotice(`Could not add ${file.name}: ${error.message}`); }
    }
    if (done) setNotice(`${done} ${done === 1 ? 'memory' : 'memories'} added to your scrapbook ♡`);
    return done;
  };
  const resetAlbum = async () => {
    for (const m of album.memories) if (m.assetKey) { try { await deletePhoto(m.assetKey); } catch { /* ignore */ } }
    localStorage.removeItem('andini-scrapbook-v1');
    setAlbum(structuredClone(scrapbookSeed));
    setNotice('The scrapbook has been reset to the starting design.');
  };
  return { album, ready, notice, setNotice, patch, updateMemory, moveMemory, removeMemory, addMemories, resetAlbum };
}
