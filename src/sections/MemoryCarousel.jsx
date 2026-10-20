import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow, Navigation, Pagination } from 'swiper/modules';
import { ArrowLeft, ArrowRight, Pause, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import SectionHeading from '../components/SectionHeading';
import Polaroid from '../components/Polaroid';

export default function MemoryCarousel({memories,onView}) {
  const sw=useRef(null);
  const [autoplay,setAutoplay]=useState(false);
  const [active,setActive]=useState(0);
  return <section id="memories" className="relative overflow-hidden bg-ivory py-24 md:py-32">
    <div className="absolute left-[7%] top-[16%] text-6xl text-rose/15">✳</div><div className="absolute bottom-[16%] right-[9%] text-6xl text-rose/15">✧</div>
    <div className="site-container relative z-10"><SectionHeading number="01" eyebrow="THE THINGS WE KEEP" title={<>Our favorite <em className="title-hand">little moments</em></>} subtitle="A home for screenshots, photos, tiny memories, and the moments we want to hold onto. Tap a picture to look a little closer."/></div>
    {memories.length ? <>
      <div className="relative mx-auto max-w-[1280px] px-3 sm:px-10">
        <Swiper modules={[Autoplay,EffectCoverflow,Navigation,Pagination]} onSwiper={instance=>sw.current=instance} onSlideChange={instance=>setActive(instance.realIndex)} effect="coverflow" grabCursor centeredSlides slidesPerView="auto" loop={memories.length>=4} speed={650} autoplay={{delay:3300,disableOnInteraction:false,enabled:false}} coverflowEffect={{rotate:7,stretch:-22,depth:115,modifier:1,slideShadows:false}} className="memory-swiper !pb-[54px] !pt-8" pagination={{clickable:true,dynamicBullets:true}}>
          {memories.map((m,i)=><SwiperSlide className="!w-[255px] sm:!w-[310px] md:!w-[365px]" key={m.id}><div className="px-2 pb-6"><Polaroid memory={m} onClick={()=>onView(i)} rotation={i%3===0?-1.8:i%3===1?1.5:-.8} showTape={i%2===0}/><p className="mt-5 text-center text-[11px] uppercase tracking-[.17em] text-muted">{m.date||'a little keepsake'}</p></div></SwiperSlide>)}
        </Swiper>
      </div>
      <div className="mt-2 flex items-center justify-center gap-4">
        <button onClick={()=>sw.current?.slidePrev()} className="round-arrow" aria-label="Previous memory"><ArrowLeft size={19}/></button>
        <div className="min-w-[60px] text-center text-xs tracking-[.22em] text-muted">{String(active+1).padStart(2,'0')} / {String(memories.length).padStart(2,'0')}</div>
        <button onClick={()=>sw.current?.slideNext()} className="round-arrow" aria-label="Next memory"><ArrowRight size={19}/></button>
        <button onClick={()=>{if(autoplay)sw.current?.autoplay?.stop();else sw.current?.autoplay?.start();setAutoplay(a=>!a);}} aria-pressed={autoplay} className="ml-2 flex items-center gap-2 rounded-full border border-[#e4d2cb] px-4 py-3 text-[11px] font-semibold text-muted transition hover:bg-paper">{autoplay?<Pause size={13}/>:<Play size={13}/>} {autoplay?'Pause':'Auto play'}</button>
      </div>
    </> : <p className="mx-auto max-w-md px-6 text-center font-hand text-3xl text-muted">A blank page, ready for your memories ♡</p>}
  </section>;
}
