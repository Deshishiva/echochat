"use client";
import { useRef,useState } from "react";

export default function useRecorder(){

const mediaRecorder = useRef(null);
const chunksRef = useRef([]);
const timerRef = useRef(null);

const [audioURL,setAudioURL] = useState(null);
const [recording,setRecording] = useState(false);
const [seconds,setSeconds] = useState(0);

const startRecording = async () => {
 try{

  const stream = await navigator.mediaDevices.getUserMedia({audio:true});

  mediaRecorder.current = new MediaRecorder(stream);
  chunksRef.current = [];

  setRecording(true);
  setSeconds(0);

  timerRef.current = setInterval(()=>{
   setSeconds(prev=>prev+1);
  },1000);

  mediaRecorder.current.ondataavailable = (e)=>{
   if(e.data.size > 0){
    chunksRef.current.push(e.data);
   }
  };

  mediaRecorder.current.onstop = ()=>{
  
   if(chunksRef.current.length > 0){
    const blob = new Blob(chunksRef.current,{type:"audio/webm"});
    const url = URL.createObjectURL(blob);
    setAudioURL(url);
   }
   setRecording(false);
   clearInterval(timerRef.current);
  };

  mediaRecorder.current.start(1000);

 }catch(err){
  console.log(err);
 }
};

const stopRecording = ()=>{
 if(mediaRecorder.current &&
    mediaRecorder.current.state==="recording"){

  mediaRecorder.current.requestData();
  setTimeout(()=>{
   mediaRecorder.current.stop();
  },200);
 }
};

const cancelRecording = ()=>{
 if(mediaRecorder.current &&
    mediaRecorder.current.state==="recording"){
  mediaRecorder.current.stop();
 }

 chunksRef.current = [];
 setAudioURL(null);
 setRecording(false);
 setSeconds(0);
 clearInterval(timerRef.current);
};

const clearAudio = ()=>{
 setAudioURL(null);
 setSeconds(0);
};

return{
 startRecording,
 stopRecording,
 cancelRecording,
 audioURL,
 recording,
 seconds,
 clearAudio
};

}
