import { motion } from 'framer-motion';
import { ArrowDownRight, ArrowUpRight, Heart } from 'lucide-react';
import { Doodle, FloatingDecorations, PaperTape } from '../components/Decorations';
import Polaroid from '../components/Polaroid';

export default function Hero({album,onView}) {
  const photo=album.memories[0];
  return <section id="home" className="hero-section relative flex min-h-[810px] flex-col justify-center overflow-hidden pb-24 pt-36 md:min-h-[810px] md:pb-28 md:pt-40">
    <FloatingDecorations/>
    <div className="absolute -left-52 top-[19%] h-[600px] w-[600px] rounded-full bg-blush/30 blur-[100px]"/>
    <div className="absolute -right-40 bottom-12 h-[570px] w-[570px] rounded-full bg-peach/30 blur-[105px]"/>
    <div className="site-container relative z-10 grid items-center gap-10 lg:grid-cols-[1.04fr_.96fr] lg:gap-6">
      <div className="relative order-1 pb-2 text-center lg:order-1 lg:pb-12 lg:text-left">
        <motion.div initial={{opacity:0,y:17}} animate={{opacity:1,y:0}} transition={{duration:.7}} className="mb-6 flex items-center justify-center gap-3 lg:justify-start"><span className="h-px w-8 bg-rose/70"/><span className="section-kicker !text-[10px]">{album.heroEyebrow}</span></motion.div>
        <motion.h1 initial={{opacity:0,y:22}} animate={{opacity:1,y:0}} transition={{duration:.75,delay:.13}} className="hero-heading whitespace-pre-line">{album.heroTitle.split('\n').map((line,i)=><span key={i} className="block">{i===1?<em className="hero-heading-accent">{line}</em>:line}</span>)}</motion.h1>
        <motion.p initial={{opacity:0,y:25}} animate={{opacity:1,y:0}} transition={{duration:.75,delay:.23}} className="mx-auto mt-7 max-w-[450px] text-[15px] leading-[2] text-muted md:text-[16px] lg:mx-0">{album.heroSubtitle}</motion.p>
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:.75,delay:.33}} className="mt-9 flex flex-col items-center gap-5 sm:flex-row sm:justify-center lg:justify-start">
          <button className="primary-button group" onClick={()=>document.getElementById('memories')?.scrollIntoView({behavior:'smooth'})}>Open our scrapbook <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></button>
          <span className="font-hand text-[25px] text-rose">made with love, just for you ♡</span>
        </motion.div>
        <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:1,delay:1.1}} className="mt-14 hidden items-center gap-3 text-xs uppercase tracking-[.21em] text-muted lg:flex"><ArrowDownRight size={19} className="text-rose"/><span>scroll to turn the pages</span></motion.div>
      </div>
      <motion.div initial={{opacity:0,scale:.91,y:30}} animate={{opacity:1,scale:1,y:0}} transition={{duration:.85,delay:.22}} className="relative order-2 mx-auto flex h-[400px] w-full max-w-[490px] items-center justify-center sm:h-[520px] lg:order-2 lg:h-[565px]">
        <div className="absolute left-[7%] top-[9%] h-[85%] w-[85%] -rotate-[8deg] rounded-[5px] bg-[#ecd8d0] shadow-paper" />
        <div className="absolute left-[11%] top-[10%] h-[84%] w-[81%] rotate-[7deg] rounded-[4px] border-[12px] border-[#f8e4dc] bg-[#d6b2ba] shadow-paper" />
        <div className="absolute left-[12%] top-[9%] w-[76%] rotate-[-5deg] sm:left-[13%] sm:w-[74%]"><Polaroid memory={photo} rotation={0} showTape onClick={()=>onView(0)} className="w-full"/></div>
        <motion.div animate={{rotate:[-6,-3,-6],y:[0,-5,0]}} transition={{duration:6,repeat:Infinity}} className="absolute -bottom-1 -left-1 z-10 w-[170px] rotate-[-8deg] rounded-sm bg-[#fff3c9] px-4 py-4 shadow-paper sm:bottom-[8%] sm:left-[-5%] sm:w-[185px]"><span className="font-hand text-[24px] leading-[.9] text-[#775d54]">one day,<br/>no distance between us.</span><span className="mt-1 block text-right text-lg text-rose">♡</span></motion.div>
        <div className="absolute right-[-2%] top-[2%] z-20 rotate-[16deg] text-rose/70 sm:right-[-6%]"><Doodle kind="flower" className="h-16 w-16 sm:h-20 sm:w-20"/></div>
        <div className="absolute -left-1 top-[2%] z-20 text-rose/60"><Doodle kind="star" className="h-9 w-9"/></div>
        <div className="absolute -bottom-4 right-[4%] rotate-[12deg] rounded-full border border-rose/30 bg-[#fff7f0] px-5 py-3 font-hand text-[22px] text-rose shadow-sm sm:bottom-[7%]">to {album.toName} <Heart size={14} className="inline" fill="#eebdc6" /></div>
      </motion.div>
    </div>
    <div className="absolute bottom-0 left-0 right-0 h-10 bg-[#f8efe7] [clip-path:polygon(0_35%,4%_63%,8%_48%,12%_60%,16%_42%,20%_56%,24%_40%,28%_61%,32%_45%,36%_58%,40%_47%,44%_66%,48%_43%,52%_59%,56%_39%,60%_57%,64%_45%,68%_64%,72%_44%,76%_55%,80%_41%,84%_57%,88%_43%,92%_59%,96%_40%,100%_54%,100%_100%,0_100%)]" />
  </section>;
}
