import { motion } from 'framer-motion';
import { Doodle, PaperTape } from '../components/Decorations';
import SectionHeading from '../components/SectionHeading';
const rotations=[-4,3,2,-2];
export default function WordsForYou({notes}) {
  return <section className="relative overflow-hidden bg-paper py-24 md:py-32">
    <div className="site-container"><SectionHeading number="07" eyebrow="SENTIMENTAL LITTLE SCRAPS" title={<>A few words <em className="title-hand">for you</em></>} subtitle="Small reminders, written on imaginary scraps of paper. Some feelings just deserve a place to stay."/>
      <div className="relative mx-auto grid max-w-[1000px] gap-8 py-7 sm:grid-cols-2 md:gap-x-16 md:gap-y-16">
        {notes.map((note,i)=><motion.div key={i} initial={{opacity:0,y:30,rotate:rotations[i%4]}} whileInView={{opacity:1,y:0,rotate:rotations[i%4]}} whileHover={{rotate:0,y:-5}} transition={{duration:.55}} viewport={{once:true}} className={`torn-note relative flex min-h-[205px] items-center justify-center px-8 py-11 text-center shadow-paper ${i%4===1?'bg-[#f9ebd4]':i%4===2?'bg-[#f0e8f4]':'bg-[#f9e6e2]'}`}><PaperTape className="-top-3 left-[40%] rotate-[5deg]"/><span className="absolute left-5 top-4 text-2xl text-rose/40">{i%2?'♡':'✧'}</span><p className="font-hand text-[31px] leading-[1.2] text-[#785455] sm:text-[35px]">“{note}”</p></motion.div>)}
        <div className="pointer-events-none absolute -bottom-7 right-[2%] text-rose/45"><Doodle kind="flower" className="h-16 w-16"/></div>
      </div>
    </div>
  </section>;
}
