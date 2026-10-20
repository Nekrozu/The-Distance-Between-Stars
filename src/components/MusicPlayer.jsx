import { assetUrl } from '../lib/assetUrl';
import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Pause, Play, Music2 } from 'lucide-react';
export default function MusicPlayer({title,source}) {
  const audio=useRef(null);
  const [playing,setPlaying]=useState(false);
  const [duration,setDuration]=useState(0);
  const [current,setCurrent]=useState(0);
  const [volume,setVolume]=useState(.35);
  const [expanded,setExpanded]=useState(false);
  const [error,setError]=useState(false);
  useEffect(()=>{if(audio.current)audio.current.volume=volume;},[volume]);
  useEffect(()=>{if(audio.current){audio.current.pause();setPlaying(false);setError(false);setCurrent(0);}},[source]);
  const toggle=async()=>{if(!audio.current)return;try{if(playing){audio.current.pause();setPlaying(false);}else{await audio.current.play();setPlaying(true);setError(false);}}catch{setError(true);setPlaying(false);}};
  const time=s=>`${Math.floor((s||0)/60)}:${String(Math.floor((s||0)%60)).padStart(2,'0')}`;
  return <div className="music-widget">
    <audio ref={audio} src={assetUrl(source)} preload="none" loop onTimeUpdate={e=>setCurrent(e.target.currentTime)} onLoadedMetadata={e=>setDuration(Number.isFinite(e.target.duration)?e.target.duration:0)} onEnded={()=>setPlaying(false)} onError={()=>setError(true)} />
    <button onClick={()=>setExpanded(x=>!x)} className="flex items-center gap-2.5 text-left" aria-label="Expand music player" aria-expanded={expanded}><span className={`music-disc ${playing?'music-spinning':''}`}><Music2 size={15}/></span><span className="min-w-0"><span className="block text-[10px] uppercase tracking-[.19em] text-rose">♡ our song</span><span className="block max-w-[95px] truncate text-xs font-semibold text-ink">{title}</span></span></button>
    <button onClick={toggle} className="flex h-9 w-9 items-center justify-center rounded-full bg-[#c88494] text-white transition hover:bg-[#b56f82]" aria-label={playing?'Pause music':'Play music'}>{playing?<Pause size={15} fill="currentColor"/>:<Play size={15} fill="currentColor"/>}</button>
    {expanded&&<div className="absolute bottom-[calc(100%+10px)] right-0 w-[260px] rounded-2xl border border-[#e8d9d2] bg-[#fffbf7] p-4 shadow-paper">
      <p className="mb-2 text-[11px] font-medium text-muted">A little melody while you browse</p>
      <input aria-label="Music progress" type="range" min="0" max={duration||1} step=".1" value={Math.min(current,duration||1)} onChange={e=>{if(audio.current)audio.current.currentTime=Number(e.target.value);}} className="music-range w-full" />
      <div className="flex justify-between text-[10px] text-muted"><span>{time(current)}</span><span>{time(duration)}</span></div>
      <div className="mt-3 flex items-center gap-3"><button onClick={()=>setVolume(v=>{const nv=v>0?0:.35;if(audio.current)audio.current.volume=nv;return nv;})} aria-label={volume?'Mute':'Unmute'}>{volume?<Volume2 size={16}/>:<VolumeX size={16}/>}</button><input aria-label="Volume" type="range" min="0" max="1" step=".01" value={volume} onChange={e=>{const v=Number(e.target.value);setVolume(v);if(audio.current)audio.current.volume=v;}} className="music-range w-full" /></div>
      {error&&<p className="mt-2 text-xs text-rose">Couldn’t load the music file.</p>}
    </div>}
  </div>;
}
