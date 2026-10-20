import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, RefreshCcw, Sparkles } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
const colors=['#f4d9db','#ecdeea','#f8e3ca','#e8e8d8','#f5d8cd'];
export default function Surprise({notes}) {
  const [selected,setSelected]=useState(null);
  return <section id="surprise" className="relative overflow-hidden bg-[#f2e6e8] py-24 md:py-32">
    <div className="site-container"><SectionHeading number="08" eyebrow="ONE MORE LITTLE THING" title={<>Pick a little <em className="title-hand">surprise</em></>} subtitle="Every folded note has something different inside. Go on, choose whichever feels like you today."/>
      <div className="mx-auto max-w-[1010px]">
        <AnimatePresence mode="wait">
          {selected===null?<motion.div key="options" initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-15}} className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-5 md:gap-6">{notes.map((note,i)=><motion.button key={i} whileHover={{y:-9,rotate:0,scale:1.045}} whileTap={{scale:.98}} onClick={()=>setSelected(i)} className="relative flex aspect-[.8] flex-col items-center justify-center rounded-[5px] border border-white/50 p-4 text-center shadow-paper" style={{background:colors[i%colors.length],rotate:`${[-5,3,-3,4,-2][i%5]}deg`}} aria-label={`Open ${note.label}`}><span className="mb-4 text-5xl text-[#b06e7b]">{note.emoji}</span><span className="font-hand text-[24px] leading-[1.0] text-[#7b5556]">{note.label}</span><span className="absolute bottom-4 text-[9px] uppercase tracking-[.15em] text-muted">open me ↗</span></motion.button>)}</motion.div>
          :<motion.div key={`reveal-${selected}`} initial={{opacity:0,scale:.88,rotate:-5,y:15}} animate={{opacity:1,scale:1,rotate:-1,y:0}} exit={{opacity:0,scale:.94}} transition={{duration:.5}} className="relative mx-auto flex min-h-[320px] max-w-[540px] flex-col items-center justify-center rounded-[5px] border border-[#e4d0ca] bg-[#fffbf3] px-10 py-12 text-center shadow-float sm:min-h-[350px]"><div className="absolute left-6 top-6 text-3xl text-[#c78791]">✧</div><span className="text-5xl text-[#b47a86]">{notes[selected].emoji}</span><p className="mt-6 font-hand text-[38px] text-[#965e6d]">{notes[selected].title}</p><p className="mt-4 max-w-[395px] font-display text-[21px] leading-[1.65] text-ink">{notes[selected].body}</p><div className="mt-7 flex flex-wrap justify-center gap-3"><button className="secondary-button !px-5 !py-3" onClick={()=>setSelected(null)}><ArrowLeft size={16}/> Pick another</button><button className="secondary-button !px-5 !py-3" onClick={()=>setSelected((selected+1)%notes.length)}><RefreshCcw size={15}/> Surprise me</button></div></motion.div>}
        </AnimatePresence>
      </div>
    </div>
  </section>;
}
