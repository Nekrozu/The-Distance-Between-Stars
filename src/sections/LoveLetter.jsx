import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Heart, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import SectionHeading from '../components/SectionHeading';
import { Doodle } from '../components/Decorations';
export default function LoveLetter({letter,toName}) {
  const [open,setOpen]=useState(false);
  const reduce=useReducedMotion();
  useEffect(()=>{if(!open)return;const onKey=e=>{if(e.key==='Escape')setOpen(false)};window.addEventListener('keydown',onKey);return()=>window.removeEventListener('keydown',onKey);},[open]);
  return <section id="letter" className="relative overflow-hidden bg-[#f7e5e2] py-24 md:py-32">
    <div className="absolute left-[4%] top-[10%] text-rose/40"><Doodle kind="flower" className="h-20 w-20"/></div><div className="absolute bottom-[13%] right-[10%] text-rose/50"><Doodle kind="heart" className="h-16 w-16"/></div>
    <div className="site-container relative"><SectionHeading number="06" eyebrow="SOMETHING FROM THE HEART" title={<>A little letter <em className="title-hand">for you</em></>} subtitle="Some things are easier to write down than say. This one is meant for you — and only you."/>
      <motion.button initial={{opacity:0,y:35}} whileInView={{opacity:1,y:0}} viewport={{once:true}} whileHover={{scale:1.025,y:-3}} whileTap={{scale:.99}} onClick={()=>setOpen(true)} aria-label="Open the love letter" className="relative mx-auto block h-[275px] w-full max-w-[460px] cursor-pointer sm:h-[325px]">
        <div className="absolute left-[7%] top-0 h-[90%] w-[90%] -rotate-[4deg] rounded-sm bg-[#f3c9c3] shadow-paper"/>
        <div className="envelope-shell absolute bottom-3 left-0 h-[240px] w-full overflow-hidden rounded-[4px] shadow-float sm:h-[275px]">
          <div className="absolute inset-0 bg-[#d99ba2]"/>
          <div className="absolute inset-x-[12%] top-5 h-[175px] bg-[#fffaf0] p-5 text-left shadow-md sm:h-[205px]"><span className="font-hand text-[29px] text-[#906469]">for {toName} ♡</span><span className="mt-4 block h-px bg-[#e6d2cc]"/><span className="mt-3 block w-3/4 text-[10px] uppercase tracking-[.2em] text-muted">a little piece of my heart</span></div>
          <div className="envelope-left absolute inset-0 bg-[#e9b2b5]"/><div className="envelope-right absolute inset-0 bg-[#edbdc0]"/><div className="envelope-bottom absolute inset-0 bg-[#e7aeb5]"/>
          <div className="absolute left-1/2 top-[62%] flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#b9687b] text-[#ffe7e2] shadow-md"><Heart size={21} fill="currentColor" strokeWidth={1.4}/></div>
        </div>
        <div className="absolute -bottom-14 left-1/2 -translate-x-1/2 whitespace-nowrap font-hand text-[28px] text-[#a66d7b]">click to open your letter ↗</div>
      </motion.button>
      <div className="h-14"/>
    </div>
    <AnimatePresence>{open&&<motion.div className="fixed inset-0 z-[95] flex items-center justify-center overflow-y-auto bg-[#311f27]/70 px-4 py-8 backdrop-blur-[7px]" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setOpen(false)} role="dialog" aria-modal="true" aria-label="Letter for Andini">
      <button onClick={()=>setOpen(false)} aria-label="Close letter" className="fixed right-4 top-4 z-20 rounded-full bg-[#fff8f2] p-3 text-ink shadow-paper sm:right-8 sm:top-8"><X size={19}/></button>
      <motion.div initial={{opacity:0,y:reduce?0:120,rotate:reduce?0:-3}} animate={{opacity:1,y:0,rotate:-.8}} exit={{opacity:0,y:60}} transition={{duration:reduce?0:.7,type:'spring',damping:24}} onClick={e=>e.stopPropagation()} className="letter-sheet relative my-auto max-h-[86vh] w-full max-w-[620px] overflow-y-auto bg-[#fffaf2] px-7 py-10 shadow-2xl sm:px-14 sm:py-14">
        <div className="mb-8 flex items-center justify-between text-[#c78d99]"><span className="font-hand text-[25px]">a letter, just for you</span><span>✿</span></div>
        <div className="whitespace-pre-line font-hand text-[25px] leading-[1.42] text-[#62433e] sm:text-[30px] sm:leading-[1.48]">{letter}</div>
        <div className="mt-6 text-right text-rose"><Heart fill="currentColor" size={23}/></div>
        <button onClick={()=>setOpen(false)} className="mt-8 flex items-center gap-2 border-b border-rose pb-1 text-[12px] font-semibold uppercase tracking-[.16em] text-rose">Close this letter <X size={14}/></button>
      </motion.div>
    </motion.div>}</AnimatePresence>
  </section>;
}
