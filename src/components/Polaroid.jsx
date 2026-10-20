import { Heart, Image as ImageIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { PaperTape } from './Decorations';
import { assetUrl } from '../lib/assetUrl';

export default function Polaroid({ memory, onClick, rotation=0, className='', showTape=false, size='normal', label, floating=false }) {
  return <motion.button type="button" whileHover={{scale:1.035,rotate:0,y:-6}} whileTap={{scale:.985}} transition={{type:'spring',stiffness:210,damping:19}} onClick={onClick} className={`polaroid group relative text-left ${className}`} style={{'--tilt':`${rotation}deg`,transform:`rotate(${rotation}deg)`}} aria-label={`View photo: ${memory?.caption || 'A little memory'}`}>
    {showTape&&<PaperTape className="left-[40%] -top-[14px] z-10 rotate-[7deg]"/>}
    <div className="polaroid-image relative overflow-hidden rounded-[2px]" style={{aspectRatio:size==='wide'?'5 / 4':'4 / 4.3'}}>
      {memory?.image ? <img className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.065]" src={assetUrl(memory.image)} alt={memory.caption || 'Scrapbook memory'} loading="lazy" /> : <div className="flex h-full items-center justify-center bg-gradient-to-br from-blush to-lavender"><ImageIcon size={35} className="text-rose/60"/></div>}
      <span className="absolute inset-0 bg-[#412b31]/0 transition-colors group-hover:bg-[#412b31]/5" />
    </div>
    <div className="flex min-h-[40px] items-center justify-between gap-2 px-1 pb-0.5 pt-3 md:min-h-[48px]">
      <p className="min-w-0 truncate font-hand text-[21px] leading-none text-ink md:text-[24px]">{label||memory?.caption||'a little memory ♡'}</p>
      <Heart size={14} className="shrink-0 text-[#c78492]" strokeWidth={1.3}/>
    </div>
  </motion.button>;
}
