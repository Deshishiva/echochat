"use client";
import Sidebar from "../components/sidebar";
import ChatWindow from "../components/chatwindow";
import { useState } from "react";
import { chatsData } from "../data/chats";
import { motion, AnimatePresence } from "framer-motion";

export default function Home(){

 const [chats,setChats] = useState(chatsData);
 const [selectedChat,setSelectedChat] = useState(chatsData[0]);

 return(

<motion.div
 initial={{opacity:0}}
 animate={{opacity:1}}
 transition={{duration:0.6}}
 className="flex h-screen overflow-hidden"
>

{/* Sidebar */}
<motion.div
 initial={{x:-80,opacity:0}}
 animate={{x:0,opacity:1}}
 transition={{duration:0.5}}
 className="h-full"
>
<Sidebar
 chats={chats}
 setSelectedChat={setSelectedChat}
 selectedChat={selectedChat}
/>
</motion.div>

{/* Chat Window */}
<AnimatePresence mode="wait">
<motion.div
 key={selectedChat.id}
 initial={{opacity:0,x:50}}
 animate={{opacity:1,x:0}}
 exit={{opacity:0,x:-50}}
 transition={{duration:0.3}}
 className="flex-1 flex flex-col h-full"
>
<ChatWindow
 selectedChat={selectedChat}
 chats={chats}
 setChats={setChats}
/>
</motion.div>
</AnimatePresence>

</motion.div>
 )
}
