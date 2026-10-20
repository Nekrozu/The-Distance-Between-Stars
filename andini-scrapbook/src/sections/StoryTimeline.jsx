import { assetUrl } from '../lib/assetUrl';
import { motion } from 'framer-motion';
import { ArrowRight, Heart } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';

export default function StoryTimeline({timeline,memories}) {
  return <section id="story" className="relative overflow-hidden bg-[#f3e2dc] py-24 md:py-32">
    <div className="absolute -right-20 top-0 h-[480px] w-[480px] rounded-full bg-[#fff1e4]/50 blur-[100px]"/>
    <div className="site-container relative"><SectionHeading number="03" eyebrow="FROM OUR FIRST HELLO" title={<>How our little story <em className="title-hand">happened</em></>} subtitle="Not the usual love story. Our pages started apart, and one of the best chapters is still waiting to be written."/>
      <div className="relative mx-auto max-w-[850px] pb-7"><div className="absolute bottom-8 left-[20px] top-6 w-px bg-[#cb8d96]/45 md:left-1/2"/>
        {timeline.map((item,i)=>{
          const memory=memories.find(m=>m.id===item.photoId) || memories[i%Math.max(memories.length,1)];
          return <motion.div key={item.id} initial={{opacity:0,y:32}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.2}} transition={{duration:.65}} className={`relative mb-11 flex items-start gap-6 pl-[62px] md:mb-5 md:w-1/2 md:pl-0 ${i%2?'md:ml-auto md:pl-14':'md:pr-14 md:text-right'}`}>
            <span className={`absolute left-[10px] top-9 z-10 flex h-[22px] w-[22px] items-center justify-center rounded-full border-[4px] border-[#f3e2dc] bg-[#be7988] shadow-sm md:left-auto ${i%2?'md:-left-[11px]':'md:-right-[11px]'}`}>{i===timeline.length-1?<Heart size={9} fill="#fff" stroke="#fff"/>:null}</span>
            <div className={`w-full rounded-[3px] border border-[#edddd3] bg-[#fff9f1] p-5 shadow-paper ${i%2?'rotate-[1.5deg]':'-rotate-[1deg]'}`}>
              <p className="mb-2 text-[10px] font-bold uppercase tracking-[.21em] text-rose">{item.date}</p>
              <h3 className="font-display text-[23px] leading-tight tracking-[-.04em] text-ink md:text-[26px]">{item.title}</h3>
              <p className="mt-3 text-[13px] leading-[1.85] text-muted">{item.description}</p>
              {memory?.image&&<div className={`mt-4 flex items-center gap-4 ${i%2?'':'md:flex-row-reverse'}`}><img src={assetUrl(memory.image)} alt={memory.caption} loading="lazy" className="h-[70px] w-[82px] shrink-0 rounded-[2px] object-cover ring-[5px] ring-white shadow-md"/><span className="font-hand text-[23px] text-rose">{i===timeline.length-1?'our someday ♡':'a page worth keeping'}</span></div>}
            </div>
          </motion.div>;
        })}
      </div>
      <p className="mt-6 text-center font-hand text-[32px] text-[#ac7180]">and there’s so much more to come… <span className="inline-block align-middle"><ArrowRight size={23}/></span></p>
    </div>
  </section>;
}
