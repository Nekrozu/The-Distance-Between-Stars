import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import Polaroid from '../components/Polaroid';

export default function DeskCarousel({memories,onView}) {
  const sw=useRef(null);
  return <section className="relative overflow-hidden bg-[#fff9f4] py-24 md:py-28">
    <div className="absolute left-[5%] top-[32%] h-56 w-56 rounded-full bg-peach/20 blur-3xl"/>
    <div className="site-container"><SectionHeading number="04" eyebrow="THE LITTLE PHOTO PILE" title={<>A pocketful of <em className="title-hand">keepsakes</em></>} subtitle="A few more memories, scattered like photos on a desk. Swipe around — there are no perfect pages here."/>
      {memories.length>0&&<div className="relative mx-auto max-w-[1020px]">
        <Swiper modules={[Navigation]} onSwiper={s=>sw.current=s} centeredSlides grabCursor slidesPerView="auto" spaceBetween={-12} className="desk-swiper !px-4 !py-12" speed={550}>
          {memories.map((m,i)=><SwiperSlide key={m.id} className="!w-[240px] sm:!w-[280px]"><Polaroid memory={m} rotation={i%2?4:-5} onClick={()=>onView(i)} className="w-full"/></SwiperSlide>)}
        </Swiper>
        <div className="mt-0 flex justify-center gap-3"><button onClick={()=>sw.current?.slidePrev()} className="round-arrow" aria-label="Previous keepsake"><ArrowLeft size={19}/></button><button onClick={()=>sw.current?.slideNext()} className="round-arrow" aria-label="Next keepsake"><ArrowRight size={19}/></button></div>
      </div>}
    </div>
  </section>;
}
