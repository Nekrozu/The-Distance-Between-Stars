import { useState } from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '../components/SectionHeading';
import { Doodle } from '../components/Decorations';
const rotations=[-5,2,4,-3,5,-4,1,3,-3,4,2];
function FlipNote({item,index}) {
  const [flipped,setFlipped]=useState(false);
  return <motion.button initial={{opacity:0,y:23}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:.4,delay:(index%5)*.065}} onClick={()=>setFlipped(v=>!v)} className="flip-holder h-[180px] w-full text-center sm:h-[205px]" aria-label={`${item.front}. ${flipped?'Hide':'Reveal'} the note`} aria-pressed={flipped} style={{transform:`rotate(${rotations[index%rotations.length]}deg)`}}>
    <motion.div className="flip-inner relative h-full w-full" animate={{rotateY:flipped?180:0}} transition={{duration:.55,type:'spring',stiffness:130,damping:17}}>
      <div className={`flip-face absolute inset-0 flex flex-col items-center justify-center rounded-[3px] border border-[#ebd5c9] p-5 shadow-paper ${index%4===1?'bg-[#fff1d8]':index%4===2?'bg-[#f9e6e9]':index%4===3?'bg-[#eae5f2]':'bg-[#fff8e9]'}`}>
        <span className="absolute right-4 top-2 font-hand text-[29px] text-rose/65">{index%3?'✧':'♡'}</span>
        <p className="font-hand text-[31px] leading-[1.0] text-[#7d5553] sm:text-[34px]">{item.front}</p>
        <p className="absolute bottom-4 text-[10px] uppercase tracking-[.19em] text-[#a78c86]">tap to unfold ↗</p>
      </div>
      <div className="flip-face flip-back absolute inset-0 flex items-center justify-center rounded-[3px] bg-[#c78694] p-5 text-center shadow-paper"><p className="font-hand text-[24px] leading-[1.16] text-white sm:text-[27px]">{item.back} <span className="whitespace-nowrap">♡</span></p></div>
    </motion.div>
  </motion.button>;
}
export default function LittleThings({things}) {
  return <section id="little-things" className="relative overflow-hidden bg-ivory py-24 md:py-32">
    <div className="absolute left-[6%] top-[12%] text-rose/35"><Doodle kind="heart" className="h-14 w-14"/></div><div className="absolute bottom-[10%] right-[5%] text-rose/30"><Doodle kind="flower" className="h-20 w-20"/></div>
    <div className="site-container"><SectionHeading number="05" eyebrow="A WHOLE LOT OF TINY REASONS" title={<>Little things I <em className="title-hand">love about you</em></>} subtitle="There are so many things that make you, you. Flip these little notes over for the bits I don't always say out loud."/>
      <div className="mx-auto grid max-w-[1090px] grid-cols-2 gap-x-4 gap-y-9 sm:grid-cols-3 sm:gap-x-8 md:grid-cols-5 md:gap-x-7 md:gap-y-11">{things.map((x,i)=><FlipNote key={`${i}-${x.front}`} item={x} index={i}/>)}</div>
      <p className="mt-16 text-center font-hand text-[32px] text-rose">and so many more I haven’t found the words for yet ♡</p>
    </div>
  </section>;
}
