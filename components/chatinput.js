"use client";
import { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import useRecorder from "../hooks/userecorder";
import { motion, AnimatePresence } from "framer-motion";

export default function ChatInput({sendMessage}){

const [text,setText] = useState("");
const [showEmoji,setShowEmoji] = useState(false);

const {
 startRecording,
 stopRecording,
 cancelRecording,
 audioURL,
 recording,
 seconds,
 clearAudio
} = useRecorder();

const toggleRecording = ()=>{
 if(recording){
  stopRecording();
 }else{
  startRecording();
 }
};

const sendText = ()=>{
 if(!text) return;

 sendMessage({
  id:Date.now(),
  type:"text",
  content:text,
  sender:"me"
 });

 setText("");
};

const handleFile = (e)=>{
 const file = e.target.files[0];
 const url = URL.createObjectURL(file);

 sendMessage({
  id:Date.now(),
  type:"file",
  url,
  name:file.name,
  sender:"me"
 });
};

const sendAudio = ()=>{
 sendMessage({
  id:Date.now(),
  type:"audio",
  url:audioURL,
  sender:"me"
 });
 clearAudio();
};

return(

<div className="glass border-t p-3 w-full">

<div className="flex items-center gap-2 relative">


<button onClick={()=>setShowEmoji(!showEmoji)}>😊</button>

<AnimatePresence>
{showEmoji && (
<motion.div
 initial={{y:100,opacity:0}}
 animate={{y:0,opacity:1}}
 exit={{y:100,opacity:0}}
 transition={{duration:0.3}}
 className="absolute bottom-16"
>
<EmojiPicker onEmojiClick={e=>setText(text+e.emoji)}/>
</motion.div>
)}
</AnimatePresence>


{recording ? (

<motion.div
initial={{opacity:0}}
animate={{opacity:1}}
className="flex-1 flex items-center justify-between bg-slate-100 rounded-full px-4 py-2"
>

<div className="flex items-center gap-2 text-red-500">
🎙
<span className="font-medium">
{Math.floor(seconds/60)}:
{seconds%60<10?"0"+seconds%60:seconds%60}
</span>
</div>

<motion.button
whileTap={{scale:0.9}}
onClick={cancelRecording}
className="text-sm text-gray-600"
>
Cancel
</motion.button>

</motion.div>

) : (

<input
className="flex-1 px-4 py-2 bg-slate-100 rounded-full outline-none"
value={text}
onChange={e=>setText(e.target.value)}
placeholder="Type a message..."
/>

)}


<motion.label
whileTap={{scale:0.9}}
className="px-3 py-2 bg-slate-200 rounded-full cursor-pointer text-sm hover:bg-slate-300 transition"
>
Choose File
<input
 type="file"
 onChange={handleFile}
 className="hidden"
/>
</motion.label>


<motion.button
whileHover={{scale:1.1}}
whileTap={{scale:0.85}}
onClick={toggleRecording}
className={`
flex items-center justify-center
w-14 h-14 rounded-full shadow-lg
transition-all duration-300
${recording
?"bg-red-500 text-white animate-pulse ring-4 ring-red-300"
:"bg-indigo-500 text-white"}
`}
>
<span className="text-2xl">
{recording ? "⏹" : "🎙"}
</span>
</motion.button>


{audioURL && (
<motion.button
initial={{opacity:0,y:20}}
animate={{opacity:1,y:0}}
onClick={sendAudio}
className="bg-green-500 text-white px-4 py-2 rounded-full"
>
▶️
</motion.button>
)}


<motion.button
whileHover={{scale:1.08}}
whileTap={{scale:0.85}}
onClick={sendText}
className="bg-indigo-500 text-white px-4 py-2 rounded-full shadow-lg"
>
Send
</motion.button>

</div>
</div>
);
}
