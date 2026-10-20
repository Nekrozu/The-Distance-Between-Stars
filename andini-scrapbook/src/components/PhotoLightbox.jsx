import { assetUrl } from '../lib/assetUrl';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, CalendarDays } from 'lucide-react';
import { useEffect } from 'react';
export default function PhotoLightbox({ photos, index, onChange, onClose }) {
  const open = index !== null && index !== undefined && photos.length > 0;
  useEffect(()=>{
    if (!open) return;
    const listener = e => {if(e.key==='Escape')onClose();if(e.key==='ArrowLeft')onChange((index-1+photos.length)%photos.length);if(e.key==='ArrowRight')onChange((index+1)%photos.length);};
    window.addEventListener('keydown',listener);return()=>window.removeEventListener('keydown',listener);
  },[open,index,photos.length,onClose,onChange]);
  const photo=photos[index];
  return <AnimatePresence>{open && photo && <motion.div className="fixed inset-0 z-[90] flex items-center justify-center bg-[#211a1d]/[.9] p-4 backdrop-blur-xl md:p-10" role="dialog" aria-modal="true" aria-label="Photo viewer" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={onClose}>
    <button autoFocus onClick={onClose} className="absolute right-5 top-5 z-20 rounded-full bg-white/15 p-3 text-white hover:bg-white/25" aria-label="Close photo"><X size={23}/></button>
    <button onClick={e=>{e.stopPropagation();onChange((index-1+photos.length)%photos.length);}} className="absolute bottom-7 left-5 z-20 rounded-full bg-white/15 p-3 text-white hover:bg-white/25 md:bottom-auto md:left-9" aria-label="Previous photo"><ChevronLeft/></button>
    <motion.div key={photo.id} initial={{opacity:0,scale:.94,y:15}} animate={{opacity:1,scale:1,y:0}} exit={{opacity:0}} transition={{duration:.3}} className="flex max-h-[88vh] w-full max-w-[640px] flex-col items-center" onClick={e=>e.stopPropagation()}>
      <div className="w-full max-w-[520px] overflow-hidden rounded-[3px] border-[9px] border-[#fffaf3] bg-[#fffaf3] shadow-2xl md:border-[13px]">
        {photo.image?<img src={assetUrl(photo.image)} alt={photo.caption} className="max-h-[63vh] w-full object-contain"/>:<div className="aspect-square w-full bg-blush"/>}
        <p className="px-2 py-4 text-center font-hand text-3xl text-ink">{photo.caption||'a little memory'} ♡</p>
      </div>
      {(photo.date||photo.note)&&<div className="mt-5 max-w-[500px] text-center text-[#fbe7df]">{photo.date&&<p className="mb-2 flex items-center justify-center gap-2 text-xs uppercase tracking-[.2em] opacity-70"><CalendarDays size={12}/>{photo.date}</p>}{photo.note&&<p className="font-hand text-[25px] leading-snug">{photo.note}</p>}</div>}
      <p className="mt-3 text-xs tracking-widest text-white/45">{index+1} / {photos.length}</p>
    </motion.div>
    <button onClick={e=>{e.stopPropagation();onChange((index+1)%photos.length);}} className="absolute bottom-7 right-5 z-20 rounded-full bg-white/15 p-3 text-white hover:bg-white/25 md:bottom-auto md:right-9" aria-label="Next photo"><ChevronRight/></button>
  </motion.div>}</AnimatePresence>;
}
