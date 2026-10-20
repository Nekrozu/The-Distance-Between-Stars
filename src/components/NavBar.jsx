import { Heart, Images, BookOpenText, Mail, PencilLine, Home, Sparkles, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';

const links = [
  ['home','Home',Home],['memories','Memories',Images],['story','Our story',BookOpenText],
  ['little-things','Little things',Heart],['letter','Love letter',Mail],['surprise','Surprise',Sparkles],
];
export default function NavBar({ toName, onEdit }) {
  const [menu, setMenu] = useState(false);
  const [active, setActive] = useState('home');
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry=>entry.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio);
      if (visible.length) setActive(visible[0].target.id);
    },{rootMargin:'-25% 0px -45% 0px',threshold:[0,.1,.25,.6]});
    links.forEach(([id]) => {const el=document.getElementById(id);if(el) observer.observe(el);});
    return () => observer.disconnect();
  },[]);
  const follow = id => {setMenu(false);document.getElementById(id)?.scrollIntoView({behavior:'smooth'});};
  return <>
    <header className="fixed inset-x-0 top-0 z-40 px-4 pt-4 md:px-7 md:pt-5">
      <div className="nav-glass mx-auto flex h-[66px] max-w-[1180px] items-center justify-between rounded-full px-5 md:px-7">
        <button className="flex shrink-0 items-center gap-2.5" onClick={()=>follow('home')} aria-label="Back to top"><span className="text-[21px] text-rose">♡</span><span className="font-display text-[18px] font-semibold tracking-[-.06em] text-ink md:text-xl">{toName.toLowerCase()} <em className="font-hand text-[20px] font-normal text-rose">&</em> me<span className="ml-1 text-rose">.</span></span></button>
        <nav aria-label="Main navigation" className="hidden items-center gap-5 lg:flex">{links.map(([id,label])=><button key={id} onClick={()=>follow(id)} className={`nav-link ${active===id?'text-rose':'text-[#76635f]'}`}>{label}</button>)}</nav>
        <div className="flex items-center gap-2">
          <button onClick={onEdit} className="nav-edit" title="Edit your scrapbook" aria-label="Edit your scrapbook"><PencilLine size={16}/><span className="hidden sm:inline">Edit memories</span></button>
          <button className="p-2 lg:hidden" onClick={()=>setMenu(!menu)} aria-label={menu?'Close navigation':'Open navigation'}>{menu?<X size={21}/>:<Menu size={21}/>}</button>
        </div>
      </div>
      {menu && <div className="nav-glass mx-auto mt-2 grid max-w-[1180px] grid-cols-2 gap-1 rounded-3xl p-4 lg:hidden">{links.map(([id,label,Icon])=><button className="flex items-center gap-2 rounded-xl p-3 text-left text-sm hover:bg-blush/40" key={id} onClick={()=>follow(id)}><Icon size={16} className="text-rose"/>{label}</button>)}</div>}
    </header>
    <nav aria-label="Mobile quick navigation" className="bottom-dock md:hidden">{[links[0],links[1],links[2],links[4],links[5]].map(([id,label,Icon])=><button key={id} onClick={()=>follow(id)} className={`flex flex-col items-center justify-center gap-1 text-[10px] ${active===id?'text-[#b36577]':'text-[#846d6a]'}`}><Icon size={19} strokeWidth={active===id?2.3:1.7}/><span>{label==='Our story'?'Story':label==='Love letter'?'Letter':label}</span></button>)}</nav>
  </>;
}
