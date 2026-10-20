import { motion } from 'framer-motion';

export default function SectionHeading({ number, eyebrow, title, subtitle, centered = true, light = false }) {
  return <motion.div initial={{opacity:0,y:25}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.2}} transition={{duration:.65}} className={`relative z-10 mb-12 md:mb-16 ${centered ? 'text-center' : ''}`}>
    <p className={`section-kicker ${light ? 'text-[#f8dedc]' : 'text-rose'}`}>{number && <span className="mr-3 opacity-60">{number} /</span>}{eyebrow}</p>
    <h2 className={`section-title mt-4 ${light ? 'text-paper' : 'text-ink'}`}>{title}</h2>
    {subtitle && <p className={`mx-auto mt-5 max-w-[570px] text-[15px] leading-[1.95] md:text-base ${centered ? '' : 'md:mx-0'} ${light ? 'text-[#fae9e6]/80' : 'text-muted'}`}>{subtitle}</p>}
  </motion.div>;
}
