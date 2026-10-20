import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';
import NavBar from './components/NavBar';
import PhotoLightbox from './components/PhotoLightbox';
import PhotoEditor from './components/PhotoEditor';
import MusicPlayer from './components/MusicPlayer';
import Hero from './sections/Hero';
import MemoryCarousel from './sections/MemoryCarousel';
import PhotoWall from './sections/PhotoWall';
import StoryTimeline from './sections/StoryTimeline';
import DeskCarousel from './sections/DeskCarousel';
import LittleThings from './sections/LittleThings';
import LoveLetter from './sections/LoveLetter';
import WordsForYou from './sections/WordsForYou';
import Surprise from './sections/Surprise';
import FinalSection from './sections/FinalSection';
import { useScrapbook } from './hooks/useScrapbook';

function ClickSparkles() {
  const reduce=useReducedMotion();
  const [sparks,setSparks]=useState([]);
  useEffect(()=>{
    if(reduce)return;
    const click=e=>{
      if(e.pointerType!=='mouse')return;
      const id=Date.now()+Math.random();setSparks(s=>[...s.slice(-7),{id,x:e.clientX,y:e.clientY}]);
      setTimeout(()=>setSparks(s=>s.filter(item=>item.id!==id)),850);
    };
    document.addEventListener('pointerdown',click);
    return()=>document.removeEventListener('pointerdown',click);
  },[reduce]);
  return <div className="pointer-events-none fixed inset-0 z-[99]" aria-hidden="true"><AnimatePresence>{sparks.map(s=><motion.span key={s.id} className="absolute font-hand text-[23px] text-rose" style={{left:s.x,top:s.y}} initial={{opacity:1,scale:.4,x:-8,y:-12}} animate={{opacity:0,scale:1.5,x:12,y:-65}} exit={{opacity:0}} transition={{duration:.82}}>✧</motion.span>)}</AnimatePresence></div>;
}
export default function App() {
  const scrapbook=useScrapbook();
  const {album}=scrapbook;
  const [editing,setEditing]=useState(false);
  const [lightbox,setLightbox]=useState(null);
  useEffect(()=>{document.title=`${album.toName} ♡ Our Little World`;},[album.toName]);
  const openEditor=()=>setEditing(true);
  return <main className="min-h-screen overflow-x-hidden bg-paper text-ink">
    <NavBar toName={album.toName} onEdit={openEditor}/>
    <Hero album={album} onView={setLightbox}/>
    <div className="relative bg-ivory px-5 py-11 text-center"><p className="mx-auto max-w-[720px] font-hand text-[29px] leading-[1.2] text-[#a9747e] sm:text-[35px]">“{album.openingNote}”</p><div className="mt-4 text-center text-rose/70">✧ &nbsp; ♡ &nbsp; ✧</div></div>
    <MemoryCarousel memories={album.memories} onView={setLightbox}/>
    <PhotoWall memories={album.memories} onView={setLightbox} onAdd={openEditor}/>
    <StoryTimeline timeline={album.timeline} memories={album.memories}/>
    <DeskCarousel memories={album.memories} onView={setLightbox}/>
    <LittleThings things={album.littleThings}/>
    <LoveLetter letter={album.loveLetter} toName={album.toName}/>
    <WordsForYou notes={album.notes}/>
    <Surprise notes={album.surpriseNotes}/>
    <FinalSection album={album} onView={setLightbox}/>
    <MusicPlayer title={album.musicTitle} source={album.musicSource}/>
    <PhotoLightbox photos={album.memories} index={lightbox} onChange={setLightbox} onClose={()=>setLightbox(null)}/>
    <PhotoEditor open={editing} onClose={()=>setEditing(false)} {...scrapbook}/>
    <ClickSparkles/>
  </main>;
}
