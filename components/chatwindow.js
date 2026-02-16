"use client";
import MessageBubble from "./messagebubble";
import ChatInput from "./chatinput";
import { useState,useRef,useEffect } from "react";
import { motion } from "framer-motion";

export default function ChatWindow({selectedChat,chats,setChats}){

const [typing,setTyping] = useState(false);
const endRef = useRef(null);

useEffect(()=>{
 endRef.current?.scrollIntoView({behavior:"smooth"});
},[selectedChat.messages,typing]);

const sendMessage=(msg)=>{

const updated = chats.map(chat=>{
 if(chat.id===selectedChat.id){
  return {...chat,messages:[...chat.messages,msg]}
 }
 return chat;
});

setChats(updated);
setTyping(true);

setTimeout(()=>{

const reply = {
 id:Date.now(),
 type:"text",
 content:"Okay 👍",
 sender:"other"
};

const replyUpdate = updated.map(chat=>{
 if(chat.id===selectedChat.id){
  return {...chat,messages:[...chat.messages,reply]}
 }
 return chat;
});

setChats(replyUpdate);
setTyping(false);

},2000);

}

return(
<div className="flex flex-col h-full bg-white/20 backdrop-blur-xl">

<motion.div
 initial={{y:-30,opacity:0}}
 animate={{y:0,opacity:1}}
 transition={{duration:0.4}}
 className="p-4 border-b backdrop-blur-xl bg-white/30 sticky top-0 z-10"
>
<p className="font-semibold">{selectedChat.name}</p>
</motion.div>

<motion.div
 initial={{scale:0.98,opacity:0}}
 animate={{scale:1,opacity:1}}
 transition={{duration:0.4}}
 className="flex-1 overflow-y-auto p-4 space-y-3 bg-white/10"
>

{selectedChat.messages.map(m=>(
<MessageBubble key={m.id} msg={m}/>
))}

{typing && (
<motion.div
 animate={{opacity:[0.3,1,0.3]}}
 transition={{repeat:Infinity,duration:1}}
 className="bg-white/60 px-4 py-2 rounded-xl shadow w-fit"
>
{selectedChat.name} is typing...
</motion.div>
)}

<div ref={endRef}></div>

</motion.div>

<div className="sticky bottom-0 backdrop-blur-xl bg-white/30">
<ChatInput sendMessage={sendMessage}/>
</div>

</div>
)
}
