import { motion, useReducedMotion } from 'framer-motion';

export function Doodle({ kind='flower', className='', style={} }) {
  if (kind === 'flower') return <svg className={className} style={style} width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true"><g stroke="currentColor" strokeWidth="1.45" strokeLinecap="round" strokeLinejoin="round"><path d="M24 19C19 2 28 2 27 19C37 3 43 14 29 22C48 19 43 30 28 27C39 41 28 44 24 29C20 45 9 41 20 27C5 30 1 19 19 22C5 14 12 3 24 19Z"/><circle cx="24" cy="24" r="4"/></g></svg>;
  if (kind === 'star') return <svg className={className} style={style} width="44" height="44" viewBox="0 0 44 44" fill="none" aria-hidden="true"><path d="M22 3L25.8 18.2L41 22L25.8 25.8L22 41L18.2 25.8L3 22L18.2 18.2L22 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>;
  if (kind === 'heart') return <svg className={className} style={style} width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true"><path d="M20 34S4.5 25 4.5 14.6C4.5 5.5 16 4.6 20 12C24 4.6 35.5 5.5 35.5 14.6C35.5 25 20 34 20 34Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;
  return <span className={className} style={style} aria-hidden="true">✳</span>;
}

const pieces = [
  {kind:'star',top:'10%',left:'8%',size:21,d:0},
  {kind:'flower',top:'29%',left:'91%',size:34,d:1.5},
  {kind:'heart',top:'54%',left:'5%',size:22,d:2},
  {kind:'star',top:'76%',left:'89%',size:25,d:3},
  {kind:'flower',top:'88%',left:'12%',size:19,d:2},
];
export function FloatingDecorations() {
  const reduced = useReducedMotion();
  return <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">{pieces.map((item,i) => <motion.div key={i} className="absolute text-[#cb8e98]/50" style={{top:item.top,left:item.left}} animate={reduced ? {} : { y:[0,-12,0], rotate:[-9,9,-9] }} transition={{duration:6+i,repeat:Infinity,delay:item.d,ease:'easeInOut'}}><Doodle kind={item.kind} style={{width:item.size,height:item.size}} /></motion.div>)}</div>;
}

export function PaperTape({ className = '' }) { return <span className={`paper-tape ${className}`} aria-hidden="true" />; }
