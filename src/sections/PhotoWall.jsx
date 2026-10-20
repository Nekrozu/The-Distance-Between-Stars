import { motion } from 'framer-motion';
import { Camera, Plus, ArrowUpRight } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import Polaroid from '../components/Polaroid';
import { Doodle } from '../components/Decorations';

const turns=[-4,3.5,-2,5,-4,2.7,4,-3];
export default function PhotoWall({memories,onView,onAdd}) {
  return <section id="photo-wall" className="relative overflow-hidden bg-paper py-24 md:py-32">
    <div className="site-container"><SectionHeading number="02" eyebrow="OUR MEMORY BOARD" title={<>Little pieces of <em className="title-hand">us</em></>} subtitle="Not every keepsake has to be a picture together. Some are places, silly screenshots, and the things that remind me of you."/>
      <div className="relative mx-auto max-w-[1100px] rounded-[10px] border border-[#e8d9ce] bg-[#f5e9d9]/45 px-5 py-12 shadow-[inset_0_0_75px_rgba(170,112,90,.045)] sm:px-10 sm:py-16 md:px-16">
        <div className="absolute -left-5 top-[10%] -rotate-12 text-rose/60"><Doodle kind="flower" className="h-14 w-14"/></div>
        <div className="absolute right-[7%] top-[5%] rotate-12 font-hand text-[29px] text-rose/85">a board full of maybes & memories ↘</div>
        <div className="absolute bottom-[12%] right-[-2%] text-rose/40"><Doodle kind="star" className="h-14 w-14"/></div>
        <div className="grid grid-cols-2 items-center gap-x-5 gap-y-10 pt-16 sm:gap-x-9 sm:gap-y-12 md:grid-cols-3 md:gap-x-11 md:pt-12">
          {memories.map((m,i)=><motion.div key={m.id} initial={{opacity:0,y:30,rotate:turns[i%turns.length]}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.2}} transition={{duration:.55,delay:(i%3)*.1}} className={`${i===1?'md:translate-y-14':i===3?'md:-translate-y-6':i===5?'md:translate-y-8':''} ${i===0?'md:col-span-1':''}`}><Polaroid memory={m} rotation={turns[i%turns.length]} onClick={()=>onView(i)} showTape={i%3===1} className="w-full"/></motion.div>)}
        </div>
        <div className="relative z-10 mt-14 flex flex-col items-center justify-center gap-3 md:mt-24"><button onClick={onAdd} className="secondary-button"><Plus size={18}/> Add another memory <ArrowUpRight size={15}/></button><p className="text-center text-xs text-muted">Add your own photos, call screenshots, or favorite little moments</p></div>
      </div>
      <div className="mt-8 flex items-center justify-center gap-2 text-center font-hand text-[27px] text-[#aa7d78]"><Camera size={17}/> a little messy, a lot of love ♡</div>
    </div>
  </section>;
}
