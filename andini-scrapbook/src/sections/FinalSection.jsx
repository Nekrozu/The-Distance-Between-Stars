import { motion } from 'framer-motion';
import { Heart, ArrowUp } from 'lucide-react';
import { Doodle } from '../components/Decorations';
import Polaroid from '../components/Polaroid';
export default function FinalSection({album,onView}) {
  const memories=album.memories;
  return <footer id="end" className="relative overflow-hidden bg-[#65444c] pb-28 pt-28 text-center text-paper md:pb-36 md:pt-36">
    <div className="absolute -left-44 -top-28 h-[530px] w-[530px] rounded-full bg-[#c98c93]/20 blur-[95px]"/><div className="absolute -bottom-32 right-[-120px] h-[500px] w-[500px] rounded-full bg-[#e4ab99]/15 blur-[90px]"/>
    <div className="absolute left-[9%] top-[15%] text-[#efc3bb]/70"><Doodle kind="star" className="h-10 w-10"/></div><div className="absolute right-[10%] top-[17%] text-[#efc3bb]/60"><Doodle kind="flower" className="h-14 w-14"/></div>
    <div className="site-container relative z-10"><motion.p initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="section-kicker !text-[#efd2d1]">THE NEXT CHAPTER IS OURS</motion.p>
      <motion.h2 initial={{opacity:0,y:27}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:.8}} className="mx-auto mt-6 max-w-[830px] font-display text-[41px] leading-[1.28] tracking-[-.055em] sm:text-[57px] md:text-[71px]">Here’s to the memories we’ve made <span className="text-[#efb5be]">…</span><br/><em className="font-normal text-[#f0b3be]">and all the ones</em><br/>we haven’t made yet. <span className="font-hand text-[#f0b3be]">♡</span></motion.h2>
      <p className="mx-auto mt-7 max-w-[690px] font-hand text-[27px] leading-[1.25] text-[#f0c8ca] sm:text-[33px]">{album.finalQuote}</p>
      <div className="relative mx-auto mt-14 h-[325px] max-w-[780px] sm:h-[400px] md:mt-20 md:h-[435px]">
        {[0,1,2,3].map((n)=>{const m=memories[n%Math.max(memories.length,1)];if(!m)return null;return <motion.div key={m.id+n} initial={{opacity:0,y:60,rotate:0}} whileInView={{opacity:1,y:0,rotate:[-12,9,-7,12][n]}} viewport={{once:true}} transition={{delay:n*.09,duration:.7}} className={`absolute w-[40%] max-w-[235px] ${['left-[4%] top-[5%]','left-[23%] top-[12%]','left-[46%] top-[1%]','left-[64%] top-[10%]'][n]}`} style={{zIndex:n+1}}><Polaroid memory={m} onClick={()=>onView(memories.findIndex(x=>x.id===m.id))} className="w-full"/></motion.div>})}
      </div>
      <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:.7}} className="relative mx-auto max-w-[540px]"><p className="font-hand text-[46px] text-[#f7e4dc] md:text-[59px]">just you + me.</p><p className="mt-4 font-display text-[17px] italic leading-[1.8] text-[#f3d9d4] md:text-[20px]">{album.finalNote}</p><p className="mt-8 font-hand text-[33px] text-[#f7c4c7]">With love, {album.fromName} ♡</p><div className="mt-9 flex justify-center"><motion.div animate={{scale:[1,1.2,1]}} transition={{duration:2.6,repeat:Infinity}}><Heart size={22} fill="#f5bdc4" stroke="#f5bdc4"/></motion.div></div></motion.div>
      <div className="mt-16 flex flex-col items-center justify-between gap-5 border-t border-[#c29799]/35 pt-7 text-[11px] tracking-[.12em] text-[#ecd0cf]/70 sm:flex-row"><span>HANDMADE WITH LOVE · FOR {album.toName.toUpperCase()}</span><button className="flex items-center gap-2 text-[#f6e8e3] transition hover:-translate-y-1" onClick={()=>document.getElementById('home')?.scrollIntoView({behavior:'smooth'})}>BACK TO THE BEGINNING <ArrowUp size={15}/></button><span>EST. WHENEVER OUR STORY BEGAN ♡</span></div>
    </div>
  </footer>;
}
