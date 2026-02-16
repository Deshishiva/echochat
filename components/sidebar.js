"use client";
import { motion } from "framer-motion";

export default function Sidebar({chats,setSelectedChat,selectedChat}){

return(
<motion.div
initial={{x:-80,opacity:0}}
animate={{x:0,opacity:1}}
transition={{duration:0.4}}
className="
w-[320px]
h-full
overflow-y-auto
bg-white/30
backdrop-blur-xl
p-3
space-y-2
border-r
"
>

{chats.map(chat=>(

<motion.div
key={chat.id}
whileHover={{scale:1.03,y:-2}}
whileTap={{scale:0.97}}
layout
transition={{type:"spring", stiffness:300}}
onClick={()=>setSelectedChat(chat)}
className={`
flex items-center gap-3 p-3 rounded-xl 
cursor-pointer transition-all duration-200
${selectedChat?.id===chat.id
?"bg-indigo-200/40"
:"hover:bg-slate-100/40"}
`}
>


<div className="relative">
<div className="
w-10 h-10 rounded-full 
bg-indigo-500 text-white 
flex items-center justify-center 
font-semibold shadow-md
">
{chat.name[0]}
</div>


{chat.isOnline && (
<span className="absolute bottom-0 right-0 flex h-3 w-3">
<span className="animate-ping absolute 
h-full w-full rounded-full 
bg-green-400 opacity-75"></span>

<span className="relative 
h-3 w-3 rounded-full 
bg-green-500"></span>
</span>
)}
</div>


<div className="flex-1">
<p className="font-medium">{chat.name}</p>
<p className="text-xs text-gray-600 truncate">
{chat.messages.at(-1)?.content || "Start chatting..."}
</p>
</div>


{chat.messages.length>0 && (
<motion.div
initial={{scale:0}}
animate={{scale:1}}
transition={{duration:0.3}}
className="
bg-indigo-500 text-white 
text-xs px-2 py-1 
rounded-full shadow
"
>
{chat.messages.length}
</motion.div>
)}

</motion.div>

))}

</motion.div>
)
}
