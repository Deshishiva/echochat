"use client";
import { motion } from "framer-motion";
import { useRef,useState,useEffect } from "react";

function VoiceBubble({url}){

const audioRef = useRef(null);
const [playing,setPlaying] = useState(false);
const [progress,setProgress] = useState(0);
const [duration,setDuration] = useState(0);

const formatTime=(time)=>{
 if(!time) return "0:00";
 const mins=Math.floor(time/60);
 const secs=Math.floor(time%60);
 return `${mins}:${secs<10?"0"+secs:secs}`;
};

useEffect(()=>{
 if(audioRef.current){
  audioRef.current.onloadedmetadata = ()=>{
   if(!isNaN(audioRef.current.duration)){
    setDuration(audioRef.current.duration);
   }
  };
 }
},[]);

const togglePlay=()=>{
 if(!audioRef.current) return;
 if(playing){
  audioRef.current.pause();
  setPlaying(false);
 }else{
  audioRef.current.play();
  setPlaying(true);
 }
};

const updateProgress=()=>{
 if(audioRef.current){
  setProgress(
   (audioRef.current.currentTime/audioRef.current.duration)*100
  );
 }
};

return(
<motion.div
 initial={{scale:0.9,opacity:0}}
 animate={{scale:1,opacity:1}}
 transition={{duration:0.3}}
 className="flex items-center gap-2 mt-2"
>

<button
onClick={togglePlay}
className="bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center"
>
{playing ? "⏸" : "▶️"}
</button>

<div className="flex-1 h-1 bg-gray-300 rounded-full">
<div
className="h-1 bg-green-500 rounded-full"
style={{width:`${progress}%`}}
></div>
</div>

<span className="text-[10px]">
{formatTime(duration)}
</span>

<audio
ref={audioRef}
src={url}
onTimeUpdate={updateProgress}
onEnded={()=>setPlaying(false)}
/>

</motion.div>
);
}

export default function MessageBubble({msg}){

const isMe = msg.sender==="me";
const time = new Date(msg.id).toLocaleTimeString([],{
 hour:'2-digit',
 minute:'2-digit'
});

return(
<motion.div
 initial={{opacity:0,y:20,scale:0.95}}
 animate={{opacity:1,y:0,scale:1}}
 transition={{type:"spring",stiffness:200}}
 className={`flex ${isMe?"justify-end":"justify-start"}`}
>

<motion.div
 whileHover={{scale:1.03,y:-3}}
 className={`
 max-w-xs
 px-4 py-3
 rounded-2xl
 shadow-lg
 backdrop-blur-md
 border
 relative
 transition-all
 duration-200
 ${isMe
 ?"bg-indigo-500/90 text-white border-indigo-400"
 :"bg-white/80 text-gray-800 border-slate-200"}
 `}
>

{msg.type==="text" && msg.content}

{msg.type==="file" &&
<a href={msg.url} target="_blank" className="underline text-sm">
📎 {msg.name}
</a>
}

{msg.type==="audio" &&
<VoiceBubble url={msg.url}/>
}

<div className="flex items-center justify-end gap-1 mt-2">

<span className="text-[10px] opacity-70">
{time}
</span>

{isMe && (
<motion.span
 initial={{scale:0,opacity:0}}
 animate={{scale:1,opacity:1}}
 transition={{type:"spring",delay:0.3}}
 className="text-xs"
>
✔✔
</motion.span>
)}

</div>

</motion.div>

</motion.div>
);
}
