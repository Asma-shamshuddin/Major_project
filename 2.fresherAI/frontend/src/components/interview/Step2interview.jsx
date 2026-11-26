// import React, { useEffect, useRef } from 'react'
// import { useState } from 'react'
// import maleVideo from "../../assets/male-ai.mp4"
// import femaleVideo from "../../assets/female-ai.mp4"
// import { AnimatePresence, motion } from "motion/react"
// import { FiArrowRight, FiCamera, FiCameraOff, FiClock, FiCode, FiMessageSquare, FiMic, FiMicOff } from 'react-icons/fi'
// import CodeEditor from './CodeEditor'
// import Timer from './Timer'
// import { submitAnswer } from '../../apis/interview.api'
// import { useNavigate } from 'react-router-dom'
// function Step2interview({ interviewData, user }) {
// const navigate = useNavigate()
//   // ── State ──
//   const [question, setQuestion] = useState(interviewData.question);
//   const [currentIndex, setCurrentIndex] = useState(interviewData.currentQuestion || 0);
//   const [answer, setAnswer] = useState("");
//   const [feedback, setFeedback] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [timeLeft, setTimeLeft] = useState(interviewData.question.timer || 60);
//   const [timerActive, setTimerActive] = useState(true); // paused once the answer is submitted

//   // UI toggles
//   const [micOn, setMicOn] = useState(true); // user's manual preference — only changed by the mic button
//   const [cameraOn, setCameraOn] = useState(false);
//   const [codeOpen, setCodeOpen] = useState(false);

//   // Speech
//   const [isAIPlaying, setIsAIPlaying] = useState(false);
//   const [subtitle, setSubtitle] = useState("");
//   const [selectedVoice, setSelectedVoice] = useState(null);
//   const [voiceGender, setVoiceGender] = useState("female");
//   const [introSpoken, setIntroSpoken] = useState(false);

//   // Refs
//   const aiVideoRef = useRef(null);
//   const userVideoRef = useRef(null);
//   const recognitionRef = useRef(null);
//   const streamRef = useRef(null);


//   const videoSource = voiceGender === "female" ? femaleVideo : maleVideo
//   const progress = ((currentIndex + 1)/(interviewData.totalQuestions))*100
//   const showMicon = micOn && !isAIPlaying

//   // Speech recognition

//   useEffect(()=>{
//     if(!("webkitSpeechRecognition" in window))return;
//     const rec = new window.webkitSpeechRecognition()
//      rec.lang = "en-US";
//     rec.continuous = true;
//     rec.interimResults = false;
//     rec.onresult = (e)=>{
//       const t = e.results[e.results.length - 1][0].transcript;
//       setAnswer((prev)=>prev + " "+ t)
//     }
//     recognitionRef.current = rec
//   },[])


//   const startMic = ()=>{
//     recognitionRef.current?.start()
//   }
//   const stopMic = ()=>{
//     recognitionRef.current?.stop()
//   }

//   const toggleMic = ()=>{
//     if(micOn){
//       stopMic()
//     }else{
//       startMic()
//     }
//     setMicOn(!micOn)
//   }

//   const toggleCamera =async ()=>{
//     if(cameraOn){
//       streamRef.current?.getTracks().forEach((t) => t.stop());
//       streamRef.current = null;
//       setCameraOn(false);

//     }else{
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({video:true})
//         streamRef.current = stream
//         setCameraOn(true)
//         setTimeout(()=>{
//           if(userVideoRef.current) userVideoRef.current.srcObject = stream

//         },100)
//       } catch (error) {
//         setCameraOn(false)
//       }
//     }
//   }

//   const handleSubmitCode= (code) => {
//    setAnswer((prev)=>{
//     const separator = prev.trim() ? "\n\n--- Code ---\n" : "--- Code ---\n";
//     return prev + separator + code
//    });
//    setCodeOpen(false)
    
//   }

//   useEffect(()=>{
//     if (timeLeft <= 0 || !timerActive) return;
//     const t = setInterval(() => setTimeLeft((p) => p - 1), 1000);
//     return () => clearInterval(t);

//   },[timeLeft , timerActive])


//   useEffect(()=>{
//     const load = ()=>{
//       const voices = window.speechSynthesis.getVoices()
//       if(!voices.length)return;
//       const female = voices.find(v => /zira|samantha|female/i.test(v.name));
//       const male   = voices.find(v => /david|mark|male/i.test(v.name));
//       if (female)      { setSelectedVoice(female); setVoiceGender("female"); }
//       else if (male)   { setSelectedVoice(male);   setVoiceGender("male"); }
//       else             { setSelectedVoice(voices[0]); setVoiceGender("female"); }
//     }
//     load()
//     window.speechSynthesis.onvoiceschanged = load

//   },[])

//   const speakText = (text)=>
//     new Promise((resolve)=>{
//       if (!window.speechSynthesis || !selectedVoice || !text?.trim()) { resolve(); return; }

//       window.speechSynthesis.cancel()

//       setTimeout(()=>{
//         const utter = new SpeechSynthesisUtterance(text.replace(/,/g, ", ... ").replace(/\./g, ". ... "))
//         utter.voice  = selectedVoice;
//         utter.rate   = 0.92;
//         utter.pitch  = 1.05;
//         utter.volume = 1;
//         utter.onstart=()=>{
//           setIsAIPlaying(true)
//           stopMic()
//           aiVideoRef.current?.play()
//         }
//         utter.onend=()=>{
//           aiVideoRef.current?.pause()
//           setIsAIPlaying(false)
//           if(micOn) startMic()
//             setTimeout(()=>{ setSubtitle("");resolve() },300)
//         }
//         setSubtitle(text)
//         window.speechSynthesis.speak(utter)
//       },150)
    
//     })
  

//   useEffect(()=>{
//     if(!selectedVoice || introSpoken)return;
//     const runIntro=async () => {
//       setIntroSpoken(true)
//       await new Promise((r) => setTimeout(r, 1200));
//       await speakText(`Welcome ${user?.name.split(" ")[0]}! Let's begin your interview.`);
//       await new Promise((r) => setTimeout(r, 900));
//       await speakText(interviewData.question.question);
//     }
//     runIntro()

//   },[selectedVoice])



//   useEffect(()=>{
//     setQuestion(interviewData.question);
//     setCurrentIndex(interviewData.currentQuestion);
//     setTimeLeft(interviewData.question.timer || 60);

//   },[interviewData])

  
//   useEffect(()=>{
//     if(!selectedVoice || !introSpoken)return;
//     const speakQuestion = async () => {
//       await new Promise((r) => setTimeout(r, 900));
//       await speakText(question.question);
//     }
//     speakQuestion()

//   },[question])

//   useEffect(()=>{
//      setTimeLeft(question.timer || 60);
//     setTimerActive(true);

//   },[question])



//   useEffect(()=>{
//     if(timeLeft !== 0)return;
//     const autoSubmit = async () => {
//       await speakText("Time is up. Submitting your answer now.");
//       const finalAnswer = answer.trim() || "No answer provided. Time over.";

//       setLoading(true)

//     const res = await submitAnswer({ interviewId: interviewData.interviewId, answer:finalAnswer})

//     if(res.completed){
//        setFeedback(res.feedback);
//         await new Promise((r) => setTimeout(r, 700));
//         await speakText(
//           res.feedback?.feedback ||
//           "Great job! Your interview is complete. Preparing your report now."
//         );
//         setLoading(false);
//         navigate(`/interview/${interviewData.interviewId}/report`);
//         return;
//     }

//      setFeedback(res.feedback);
//       await new Promise((r) => setTimeout(r, 700));
//       await speakText(
//         res.feedback?.feedback ||
//         "Noted your answer. Let's move to the next question."
//       );
//       setLoading(false);
//       setQuestion(res.question);
//       setCurrentIndex(res.currentQuestion);
//       setAnswer("");
//       setFeedback(null);


//     }


//     autoSubmit()
   

//   },[timeLeft])


//   const submit =async ()=>{

//     if(!answer.trim())return;

//     setTimerActive(false)
//     setLoading(true)

//     const res = await submitAnswer({ interviewId: interviewData.interviewId, answer})

//     if(res.completed){
//        setFeedback(res.feedback);
//         await new Promise((r) => setTimeout(r, 700));
//         await speakText(
//           res.feedback?.feedback ||
//           "Great job! Your interview is complete. Preparing your report now."
//         );
//         setLoading(false);
//         navigate(`/interview/${interviewData.interviewId}/report`);
//         return;
//     }

//      setFeedback(res.feedback);
//       await new Promise((r) => setTimeout(r, 700));
//       await speakText(
//         res.feedback?.feedback ||
//         "Noted your answer. Let's move to the next question."
//       );
//       setLoading(false);
//       setQuestion(res.question);
//       setCurrentIndex(res.currentQuestion);
//       setAnswer("");
//       setFeedback(null);

//   }

  


//   return (
//     <div className='min-h-screen bg-purple-50 flex items-center justify-center p-3 sm:p-5'>


//       {codeOpen && <CodeEditor onClose={()=>setCodeOpen(false)} onSubmitCode={handleSubmitCode} />}

//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.4 }}
//         className='w-full max-w-5xl bg-white border border-purple-200 rounded-2xl sm:rounded-[24px] overflow-hidden shadow-[0_0_60px_rgba(139,92,246,.10)] grid lg:grid-cols-[36%_64%]'>
//         {/* left */}

//         <div className='flex flex-col border-b lg:border-b-0 lg:border-r border-purple-200 p-4 sm:p-5 gap-3'>

//           {/* Ai Video */}
//           <div className='relative rounded-xl overflow-hidden bg-purple-100 aspect-video'>
//             <video
//               src={videoSource}
//               ref={aiVideoRef}
//               muted
//               playsInline
//               preload="auto"
//               loop
//               className="w-full h-full object-cover"
//             />
//             {isAIPlaying && (
//               <div className='absolute bottom-2 left-2 flex items-center gap-1.5 bg-purple-950/70 backdrop-blur-sm rounded-full px-2.5 py-1'>
//                 <div className='flex gap-0.5 items-end h-3'>
//                   {[1, 2, 3].map(i => (
//                     <motion.div
//                       key={i}
//                       className="w-0.5 bg-white rounded-full"
//                       animate={{ height: ["4px", "12px", "4px"] }}
//                       transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
//                     />
//                   ))}
//                 </div>
//                 <span className='text-[10px] text-white/80'>AI Speaking</span>
//               </div>
//             )}
//           </div>

//           <div className='min-h-[52px] flex items-center'>
//             <AnimatePresence>
//               {subtitle &&
//                 <motion.div
//                   initial={{ opacity: 0, y: 4 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0 }}
//                   className='w-full rounded-xl bg-purple-50 border border-purple-200 px-3 py-2'>
//                   <p className="text-xs text-purple-700 leading-relaxed text-center">{subtitle}</p>

//                 </motion.div>}

             
//             </AnimatePresence>

            
//           </div>


//           <div className='relative rounded-xl overflow-hidden bg-purple-100 border border-purple-200 aspect-video flex items-center justify-center'>
//             {cameraOn ?
//               <>
//                 <video
//                   ref={userVideoRef}
//                   autoPlay
//                   muted
//                   playsInline
//                   className="w-full h-full object-cover scale-x-[-1]"
//                 />
//                 <div className='absolute top-2 left-2 bg-purple-950/70 backdrop-blur-sm rounded-full px-2 py-0.5'>
//                 <span className="text-[10px] text-white/70">You</span>
//                 </div>
//               </>
//               :
//               <div className='flex flex-col items-center gap-2'>
//                 <div className='w-14 h-14 rounded-full bg-purple-200 border border-purple-300 flex items-center justify-center'>
//                 <span className='text-2xl font-bold text-purple-900'>{user?.name.charAt(0).toUpperCase()}</span>
//                 </div>
//                 <span className='text-xs text-purple-500'>{user?.name.split(" ")[0]}</span>
//                 </div>}     
//           </div>


//           <div className='flex flex-col items-center gap-1.5 pt-1'>
//             <div className='flex items-center justify-center gap-3'>
//               <motion.button
//               onClick={toggleMic} 
//               whileHover={{ scale: 1.08 }} 
//               whileTap={{ scale: 0.93 }}
//               className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all ${
//                   showMicon ? "bg-purple-100 border-purple-300 text-purple-800" : "bg-red-50 border-red-200 text-red-500"
//                 }`}>
//                   {showMicon ? <FiMic size={15}/> : <FiMicOff size={15}/>}

//               </motion.button>

//               <motion.button 
//               whileHover={{ scale: 1.08 }} 
//               whileTap={{ scale: 0.93 }}
//               onClick={toggleCamera}
//               className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all ${
//                   cameraOn ? "bg-purple-100 border-purple-300 text-purple-800" : "bg-purple-50 border-purple-200 text-purple-400 hover:text-purple-700"
//                 }`}>
//                   {cameraOn ? <FiCamera size={15}/> : <FiCameraOff size={15}/>}
                

//               </motion.button>

//               <motion.button 
//               whileHover={{ scale: 1.08 }} 
//               whileTap={{ scale: 0.93 }}
//               onClick={()=>setCodeOpen(true)}
//               className="w-10 h-10 rounded-xl flex items-center justify-center border bg-purple-50 border-purple-200 text-purple-500 hover:text-purple-800 hover:border-purple-300 transition-all">

//                 <FiCode size={15}/>
                
//               </motion.button>


//             </div>

//             <div className='min-h-[14px] flex items-center justify-center'>
//               {micOn && isAIPlaying && (
//                 <span className="text-[10px] text-red-500/80">Mic paused — AI is speaking</span>)}
//             </div>

//             <span className="text-[10px] text-purple-500 text-center">
//               Coding question? Use <FiCode size={9} className="inline -mt-0.5" /> to write &amp; add code
//             </span>

//           </div>

//         </div>
//         {/* right */}

//         <div className='flex flex-col p-4 sm:p-6'>


//           <div className='flex items-start justify-between mb-4'>

//             <div> 
//               <h2 className='text-base sm:text-lg font-semibold text-purple-950'>
//                 AI Interview
//               </h2>
//               <div className='flex items-center gap-2 text-purple-500 text-xs mt-0.5'>
//                 <FiClock size={11}/>
//                 <span>{question.difficulty}</span>

//               </div>
//             </div>

//             <div className='flex flex-col items-end gap-1.5 min-w-[110px]'>
//               <Timer timeLeft={timeLeft} totalTime={question.timer || 60}/>

//             </div>
//           </div>


//           <motion.div 
//           initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//           className='relative overflow-hidden rounded-xl bg-purple-50 border border-purple-200 p-4 sm:p-5 mb-4'>
//             <div className='absolute inset-0 bg-gradient-to-br from-purple-100/70 via-transparent to-transparent pointer-events-none'/>
//             <div className='relative flex items-center gap-2.5 mb-3'>
//               <div className='w-8 h-8 rounded-lg bg-purple-600 text-white flex items-center justify-center shrink-0'>
//                 <FiMessageSquare size={14}/>
//               </div>
//               <p className='text-xs text-purple-500'>Question {currentIndex + 1}</p>
//             </div>
//             <p className='relative text-purple-950 text-sm sm:text-base leading-7'>
//               {question.question}</p>

//           </motion.div>

//           <div className='mb-3'>
//             <div className='flex justify-between text-[10px] text-purple-500 mb-1'>
//             <span>Progress</span>
//             <span>{currentIndex+1}/{interviewData.totalQuestions}</span>
//             </div>
//             <div className='w-full h-1 rounded-full bg-purple-100 overflow-hidden'>
//             <div className='h-full bg-purple-600 rounded-full transition-all duration-500' style={{width: `${progress}%`}} /></div>
//           </div>

//           <div className='flex-1 flex flex-col min-h-0'>
//             <label className='text-xs font-medium text-purple-700 mb-1.5'>Your Answer</label>
//             <textarea
//             onChange={(e)=>setAnswer(e.target.value)}
//             value={answer}
//             rows={5}
//             onKeyDown={(e)=>{if(e.ctrlKey && e.key === "Enter") submit()}}
//             placeholder='Write your answer here… or speak if mic is on'
//              className='flex-1 w-full rounded-xl bg-white border border-purple-200 p-4 text-sm text-purple-950 outline-none resize-none focus:border-purple-400 transition placeholder-purple-300'/>
//           </div>

//           <div className='mt-3 min-h-[0px]'>
//             <AnimatePresence>
//               {feedback && (
//                 <motion.div 
//                 initial={{ opacity: 0, y: 6 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0 ,y:6}}
//                 className='rounded-xl border border-green-200 bg-green-50 p-4 max-h-40 overflow-y-auto'>
//                   <p className='text-xs uppercase tracking-widest text-green-700 mb-2'>AI Feedback</p>
//                   <p className='text-sm text-purple-800 leading-6'>{feedback.feedback}</p>

//                 </motion.div>)}
//             </AnimatePresence>
//           </div>


//           <div className='flex items-center justify-between mt-4 pt-3 border-t border-purple-200'>
//           <span className='text-xs text-purple-500 hidden sm:block'>
//             Press{" "}
//             <span className='mx-1 rounded bg-purple-100 px-1.5 py-0.5 text-purple-800 text-[10px]'>
//              Ctrl+Enter
//             </span>to Submit
//           </span>

//           <motion.button 
//           whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//               onClick={submit}
//               disabled={loading || !answer.trim()}
//               className='ml-auto h-10 min-w-[150px] justify-center px-5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold flex items-center gap-2 disabled:opacity-40 transition'

              
//               >
//                  {loading ? (
//                 <>
//                   <div className="w-3.5 h-3.5 rounded-full border-2 border-white border-t-transparent animate-spin" />
//                   Submitting…
//                 </>
//               ) : (
//                 <>Submit Answer <FiArrowRight size={15} /></>
//               )}

//           </motion.button>
          
//           </div>


//         </div>


//       </motion.div>



//     </div>
//   )
// }

// export default Step2interview


// //chatgpt code 😄😄😄😄



import React, { useEffect, useRef, useState } from "react";
import maleVideo from "../../assets/male-ai.mp4";
import femaleVideo from "../../assets/female-ai.mp4";
import { AnimatePresence, motion } from "motion/react";
import {
  FiArrowRight,
  FiCamera,
  FiCameraOff,
  FiClock,
  FiCode,
  FiMessageSquare,
  FiMic,
  FiMicOff,
} from "react-icons/fi";
import CodeEditor from "./CodeEditor";
import Timer from "./Timer";
import { submitAnswer, endInterview } from "../../apis/interview.api";
import { useNavigate } from "react-router-dom";

function Step2interview({ interviewData, user }) {
  const navigate = useNavigate();

  // State
  const [question, setQuestion] = useState(interviewData.question);
  const [currentIndex, setCurrentIndex] = useState(
    interviewData.currentQuestion || 0
  );
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(
    interviewData.question.timer || 60
  );
  const [timerActive, setTimerActive] = useState(true);

  // UI toggles
  const [micOn, setMicOn] = useState(true);
  const [cameraOn, setCameraOn] = useState(false);
  const [codeOpen, setCodeOpen] = useState(false);

  // Speech
  const [isAIPlaying, setIsAIPlaying] = useState(false);
  const [subtitle, setSubtitle] = useState("");
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [voiceGender, setVoiceGender] = useState("female");
  const [introSpoken, setIntroSpoken] = useState(false);

  // End interview
  const [showEndModal, setShowEndModal] = useState(false);
  const [endReason, setEndReason] = useState("");
  const [isEndingInterview, setIsEndingInterview] = useState(false);

  // Refs
  const aiVideoRef = useRef(null);
  const userVideoRef = useRef(null);
  const recognitionRef = useRef(null);
  const streamRef = useRef(null);
  const recognitionRunningRef = useRef(false);
  const interviewEndingRef = useRef(false);
  const submittingRef = useRef(false);

  const videoSource =
    voiceGender === "female" ? femaleVideo : maleVideo;

  const totalQuestions = interviewData.totalQuestions || 1;

  const progress =
    ((currentIndex + 1) / totalQuestions) * 100;

  const showMicon = micOn && !isAIPlaying;

  // ========================================
  // SPEECH RECOGNITION SETUP
  // ========================================
  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) return;

    const rec = new window.webkitSpeechRecognition();

    rec.lang = "en-US";
    rec.continuous = true;
    rec.interimResults = false;

    rec.onresult = (e) => {
      const transcript =
        e.results[e.results.length - 1][0].transcript;

      if (!interviewEndingRef.current) {
        setAnswer((prev) => prev + " " + transcript);
      }
    };

    rec.onstart = () => {
      recognitionRunningRef.current = true;
    };

    rec.onend = () => {
      recognitionRunningRef.current = false;
    };

    rec.onerror = () => {
      recognitionRunningRef.current = false;
    };

    recognitionRef.current = rec;

    return () => {
      try {
        rec.abort();
      } catch (error) {
        console.log("Speech recognition cleanup:", error);
      }
    };
  }, []);

  // ========================================
  // START MICROPHONE
  // ========================================
  const startMic = () => {
    if (
      interviewEndingRef.current ||
      recognitionRunningRef.current
    ) {
      return;
    }

    try {
      recognitionRef.current?.start();
    } catch (error) {
      if (error.name !== "InvalidStateError") {
        console.error("Microphone start error:", error);
      }
    }
  };

  // ========================================
  // STOP MICROPHONE
  // ========================================
  const stopMic = () => {
    if (!recognitionRunningRef.current) return;

    try {
      recognitionRef.current?.stop();
    } catch (error) {
      console.error("Microphone stop error:", error);
    }
  };

  // ========================================
  // TOGGLE MICROPHONE
  // ========================================
  const toggleMic = () => {
    if (interviewEndingRef.current) return;

    if (micOn) {
      stopMic();
    } else {
      startMic();
    }

    setMicOn(!micOn);
  };

  // ========================================
  // TOGGLE CAMERA
  // ========================================
  const toggleCamera = async () => {
    if (interviewEndingRef.current) return;

    if (cameraOn) {
      streamRef.current?.getTracks().forEach((track) => track.stop());

      streamRef.current = null;
      setCameraOn(false);
    } else {
      try {
        const stream =
          await navigator.mediaDevices.getUserMedia({
            video: true,
          });

        if (interviewEndingRef.current) {
          stream.getTracks().forEach((track) => track.stop());
          return;
        }

        streamRef.current = stream;
        setCameraOn(true);

        if (userVideoRef.current) {
          userVideoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Camera error:", error);
        setCameraOn(false);
      }
    }
  };

  // ========================================
  // CODE EDITOR
  // ========================================
  const handleSubmitCode = (code) => {
    setAnswer((prev) => {
      const separator = prev.trim()
        ? "\n\n--- Code ---\n"
        : "--- Code ---\n";

      return prev + separator + code;
    });

    setCodeOpen(false);
  };

  // ========================================
  // TIMER
  // ========================================
  useEffect(() => {
    if (timeLeft <= 0 || !timerActive) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, timerActive]);

  // ========================================
  // LOAD AI VOICES
  // ========================================
  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();

      if (!voices.length) return;

      const female = voices.find((voice) =>
        /zira|samantha|female/i.test(voice.name)
      );

      const male = voices.find((voice) =>
        /david|mark|male/i.test(voice.name)
      );

      if (female) {
        setSelectedVoice(female);
        setVoiceGender("female");
      } else if (male) {
        setSelectedVoice(male);
        setVoiceGender("male");
      } else {
        setSelectedVoice(voices[0]);
        setVoiceGender("female");
      }
    };

    loadVoices();

    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  // ========================================
  // AI SPEECH
  // ========================================
  const speakText = (text) =>
    new Promise((resolve) => {
      if (
        interviewEndingRef.current ||
        !window.speechSynthesis ||
        !selectedVoice ||
        !text?.trim()
      ) {
        resolve();
        return;
      }

      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(
        text.replace(/,/g, ", ... ").replace(/\./g, ". ... ")
      );

      utterance.voice = selectedVoice;
      utterance.rate = 0.92;
      utterance.pitch = 1.05;
      utterance.volume = 1;

      utterance.onstart = () => {
        if (interviewEndingRef.current) return;

        setIsAIPlaying(true);
        stopMic();
        aiVideoRef.current?.play();
      };

      utterance.onend = () => {
        aiVideoRef.current?.pause();
        setIsAIPlaying(false);

        if (micOn && !interviewEndingRef.current) {
          startMic();
        }

        setSubtitle("");
        resolve();
      };

      utterance.onerror = () => {
        setIsAIPlaying(false);
        setSubtitle("");
        resolve();
      };

      setSubtitle(text);

      window.speechSynthesis.speak(utterance);
    });

  // ========================================
  // INTRODUCTION
  // ========================================
  useEffect(() => {
    if (!selectedVoice || introSpoken) return;

    let cancelled = false;

    const runIntro = async () => {
      setIntroSpoken(true);

      await new Promise((resolve) =>
        setTimeout(resolve, 1200)
      );

      if (cancelled || interviewEndingRef.current) return;

      const firstName = user?.name?.split(" ")[0] || "there";

      await speakText(
        `Welcome ${firstName}! Let's begin your interview.`
      );

      if (cancelled || interviewEndingRef.current) return;

      await new Promise((resolve) =>
        setTimeout(resolve, 900)
      );

      if (cancelled || interviewEndingRef.current) return;

      await speakText(interviewData.question.question);
    };

    runIntro();

    return () => {
      cancelled = true;
    };
  }, [selectedVoice]);

  // ========================================
  // UPDATE QUESTION
  // ========================================
  useEffect(() => {
    setQuestion(interviewData.question);
    setCurrentIndex(interviewData.currentQuestion);
    setTimeLeft(interviewData.question.timer || 60);
  }, [interviewData]);

  // ========================================
  // SPEAK NEXT QUESTION
  // ========================================
  useEffect(() => {
    if (!selectedVoice || !introSpoken) return;

    const speakQuestion = async () => {
      await new Promise((resolve) =>
        setTimeout(resolve, 900)
      );

      if (interviewEndingRef.current) return;

      await speakText(question.question);
    };

    speakQuestion();
  }, [question]);

  // ========================================
  // RESET TIMER FOR NEXT QUESTION
  // ========================================
  useEffect(() => {
    setTimeLeft(question.timer || 60);
    setTimerActive(true);
  }, [question]);

  // ========================================
  // AUTOMATIC ANSWER SUBMISSION
  // ========================================
  useEffect(() => {
    if (
      timeLeft !== 0 ||
      interviewEndingRef.current ||
      submittingRef.current
    ) {
      return;
    }

    const autoSubmit = async () => {
      if (
        interviewEndingRef.current ||
        submittingRef.current
      ) {
        return;
      }

      submittingRef.current = true;
      setTimerActive(false);
      setLoading(true);

      try {
        await speakText(
          "Time is up. Submitting your answer now."
        );

        if (interviewEndingRef.current) return;

        const finalAnswer =
          answer.trim() || "No answer provided. Time over.";

        const res = await submitAnswer({
          interviewId: interviewData.interviewId,
          answer: finalAnswer,
        });

        if (!res?.success) {
          throw new Error(
            res?.message || "Unable to submit your answer."
          );
        }

        if (res.completed) {
          setFeedback(res.feedback);

          await new Promise((resolve) =>
            setTimeout(resolve, 700)
          );

          await speakText(
            res.feedback?.feedback ||
              "Great job! Your interview is complete. Preparing your report now."
          );

          navigate(
            `/interview/${interviewData.interviewId}/report`
          );

          return;
        }

        setFeedback(res.feedback);

        await new Promise((resolve) =>
          setTimeout(resolve, 700)
        );

        await speakText(
          res.feedback?.feedback ||
            "Noted your answer. Let's move to the next question."
        );

        if (interviewEndingRef.current) return;

        setQuestion(res.question);
        setCurrentIndex(res.currentQuestion);
        setAnswer("");
        setFeedback(null);
      } catch (error) {
        console.error("Automatic submit error:", error);

        if (!interviewEndingRef.current) {
          alert(
            error.message ||
              "Unable to submit your answer. Please try again."
          );

          setTimerActive(true);
        }
      } finally {
        setLoading(false);
        submittingRef.current = false;
      }
    };

    autoSubmit();
  }, [timeLeft]);

  // ========================================
  // MANUAL ANSWER SUBMISSION
  // ========================================
  const submit = async () => {
    if (
      !answer.trim() ||
      interviewEndingRef.current ||
      submittingRef.current
    ) {
      return;
    }

    submittingRef.current = true;
    setTimerActive(false);
    setLoading(true);

    try {
      stopMic();

      const res = await submitAnswer({
        interviewId: interviewData.interviewId,
        answer,
      });

      if (!res?.success) {
        throw new Error(
          res?.message || "Unable to submit your answer."
        );
      }

      if (res.completed) {
        setFeedback(res.feedback);

        await new Promise((resolve) =>
          setTimeout(resolve, 700)
        );

        await speakText(
          res.feedback?.feedback ||
            "Great job! Your interview is complete. Preparing your report now."
        );

        navigate(
          `/interview/${interviewData.interviewId}/report`
        );

        return;
      }

      setFeedback(res.feedback);

      await new Promise((resolve) =>
        setTimeout(resolve, 700)
      );

      await speakText(
        res.feedback?.feedback ||
          "Noted your answer. Let's move to the next question."
      );

      if (interviewEndingRef.current) return;

      setQuestion(res.question);
      setCurrentIndex(res.currentQuestion);
      setAnswer("");
      setFeedback(null);
    } catch (error) {
      console.error("Submit answer error:", error);

      if (!interviewEndingRef.current) {
        setTimerActive(true);

        alert(
          error.response?.data?.message ||
            error.message ||
            "Unable to submit your answer. Please try again."
        );
      }
    } finally {
      setLoading(false);
      submittingRef.current = false;
    }
  };

  // ========================================
  // END INTERVIEW
  // ========================================
  const handleConfirmEndInterview = async () => {
    if (
      !endReason ||
      isEndingInterview ||
      submittingRef.current
    ) {
      return;
    }

    setIsEndingInterview(true);

    try {
      // Send interview ID AND ending reason to backend
      const response = await endInterview(
        interviewData.interviewId,
        endReason
      );

      const result = response?.data ?? response;

      // Only navigate when the backend confirms success
      if (!result?.success) {
        throw new Error(
          result?.message || "Unable to end the interview."
        );
      }

      // Prevent any more interview activity
      interviewEndingRef.current = true;
      setTimerActive(false);
      setMicOn(false);
      setLoading(false);

      // Stop speech recognition
      try {
        recognitionRef.current?.abort();
      } catch (error) {
        console.log("Speech recognition already stopped.");
      }

      recognitionRunningRef.current = false;

      // Stop camera
      streamRef.current?.getTracks().forEach((track) => {
        track.stop();
      });

      streamRef.current = null;
      setCameraOn(false);

      if (userVideoRef.current) {
        userVideoRef.current.srcObject = null;
      }

      // Stop AI video and speech
      aiVideoRef.current?.pause();
      window.speechSynthesis?.cancel();

      setIsAIPlaying(false);
      setSubtitle("");
      setShowEndModal(false);

      // Prepare closing message
      const negativeReasons = [
        "I could not answer some questions",
        "I am not confident about my performance",
      ];

      const closingMessage = negativeReasons.includes(endReason)
        ? "Thank you for your answers. Don't feel discouraged if you could not answer some questions. Every interview is a learning opportunity. Improve your skills, work on your weaknesses, and give your best next time. Thank you!"
        : "Thank you for participating in this interview. Your responses have been recorded. Keep learning and improving your skills. All the best for your next interview!";

      // Redirect immediately after successful API response
      navigate(
        `/interview/${interviewData.interviewId}/report`,
        {
          replace: true,
          state: {
            endReason,
            closingMessage,
            manuallyEnded: true,
          },
        }
      );
    } catch (error) {
      console.error("End interview error:", error);

      alert(
        error.response?.data?.message ||
          error.message ||
          "Unable to end the interview. Please try again."
      );
    } finally {
      setIsEndingInterview(false);
    }
  };

  // ========================================
  // CLEANUP WHEN LEAVING COMPONENT
  // ========================================
  useEffect(() => {
    return () => {
      try {
        recognitionRef.current?.abort();
      } catch (error) {
        // Recognition may already be stopped
      }

      streamRef.current?.getTracks().forEach((track) => {
        track.stop();
      });

      window.speechSynthesis?.cancel();
    };
  }, []);

  // ========================================
  // UI
  // ========================================
  return (
    <div className="min-h-screen bg-purple-50 flex items-center justify-center p-3 sm:p-5">

      {/* END INTERVIEW MODAL */}
      {showEndModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
          >
            <h2 className="text-xl font-bold text-purple-950">
              End Interview?
            </h2>

            <p className="mt-2 text-sm text-gray-600">
              Please tell us why you want to end this interview.
            </p>

            <div className="mt-5 space-y-3">
              {[
                "I have completed the interview",
                "I could not answer some questions",
                "I am not confident about my performance",
                "I am facing a technical issue",
                "Other",
              ].map((reason) => (
                <label
                  key={reason}
                  className="flex cursor-pointer items-center gap-3 text-sm text-gray-700"
                >
                  <input
                    type="radio"
                    name="endReason"
                    value={reason}
                    checked={endReason === reason}
                    onChange={(e) =>
                      setEndReason(e.target.value)
                    }
                    className="accent-purple-600"
                  />

                  {reason}
                </label>
              ))}
            </div>

            {[
              "I could not answer some questions",
              "I am not confident about my performance",
            ].includes(endReason) && (
              <div className="mt-4 rounded-xl border border-purple-200 bg-purple-50 p-3">
                <p className="text-sm leading-6 text-purple-800">
                  Don't be discouraged. Every interview is a learning
                  opportunity. Improve your skills, work on your
                  weaknesses, and give your best next time. Thank you!
                </p>
              </div>
            )}

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setShowEndModal(false);
                  setEndReason("");
                }}
                disabled={isEndingInterview}
                className="rounded-lg border border-purple-200 px-4 py-2 text-sm text-purple-700 hover:bg-purple-50 disabled:opacity-40"
              >
                Continue Interview
              </button>

              <button
                type="button"
                onClick={handleConfirmEndInterview}
                disabled={
                  !endReason ||
                  isEndingInterview ||
                  loading
                }
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-40"
              >
                {isEndingInterview ? "Ending..." : "Confirm End"}
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* CODE EDITOR */}
      {codeOpen && (
        <CodeEditor
          onClose={() => setCodeOpen(false)}
          onSubmitCode={handleSubmitCode}
        />
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-5xl bg-white border border-purple-200 rounded-2xl sm:rounded-[24px] overflow-hidden shadow-[0_0_60px_rgba(139,92,246,.10)] grid lg:grid-cols-[36%_64%]"
      >
        {/* LEFT SECTION */}
        <div className="flex flex-col border-b lg:border-b-0 lg:border-r border-purple-200 p-4 sm:p-5 gap-3">

          {/* AI VIDEO */}
          <div className="relative rounded-xl overflow-hidden bg-purple-100 aspect-video">
            <video
              src={videoSource}
              ref={aiVideoRef}
              muted
              playsInline
              preload="auto"
              loop
              className="w-full h-full  object-cover rounded-2xl"
            />

            {isAIPlaying && (
              <div className="absolute bottom-2 left-2 flex items-center gap-1.5 bg-purple-950/70 backdrop-blur-sm rounded-full px-2.5 py-1">
                <div className="flex gap-0.5 items-end h-3">
                  {[1, 2, 3].map((i) => (
                    <motion.div
                      key={i}
                      className="w-0.5 bg-white rounded-full"
                      animate={{ height: ["4px", "12px", "4px"] }}
                      transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        delay: i * 0.15,
                      }}
                    />
                  ))}
                </div>

                <span className="text-[10px] text-white/80">
                  AI Speaking
                </span>
              </div>
            )}
          </div>

          {/* SUBTITLE */}
          <div className="min-h-[52px] flex items-center">
            <AnimatePresence>
              {subtitle && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="w-full rounded-xl bg-purple-50 border border-purple-200 px-3 py-2"
                >
                  <p className="text-xs text-purple-700 leading-relaxed text-center">
                    {subtitle}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* USER CAMERA */}
          <div className="relative rounded-xl overflow-hidden bg-purple-100 border border-purple-200 aspect-video flex items-center justify-center">
            {cameraOn ? (
              <>
                <video
                  ref={userVideoRef}
                  autoPlay
                  muted
                  playsInline
                  className="w-full h-full object-cover scale-x-[-1]"
                />

                <div className="absolute top-2 left-2 bg-purple-950/70 backdrop-blur-sm rounded-full px-2 py-0.5">
                  <span className="text-[10px] text-white/70">
                    You
                  </span>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <div className="w-14 h-14 rounded-full bg-purple-200 border border-purple-300 flex items-center justify-center">
                  <span className="text-2xl font-bold text-purple-900">
                    {user?.name?.charAt(0)?.toUpperCase() || "U"}
                  </span>
                </div>

                <span className="text-xs text-purple-500">
                  {user?.name?.split(" ")[0] || "You"}
                </span>
              </div>
            )}
          </div>

          {/* MIC / CAMERA / CODE BUTTONS */}
          <div className="flex flex-col items-center gap-1.5 pt-1">
            <div className="flex items-center justify-center gap-3">
              <motion.button
                onClick={toggleMic}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.93 }}
                className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all ${
                  showMicon
                    ? "bg-purple-100 border-purple-300 text-purple-800"
                    : "bg-red-50 border-red-200 text-red-500"
                }`}
              >
                {showMicon ? (
                  <FiMic size={15} />
                ) : (
                  <FiMicOff size={15} />
                )}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.93 }}
                onClick={toggleCamera}
                className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all ${
                  cameraOn
                    ? "bg-purple-100 border-purple-300 text-purple-800"
                    : "bg-purple-50 border-purple-200 text-purple-400 hover:text-purple-700"
                }`}
              >
                {cameraOn ? (
                  <FiCamera size={15} />
                ) : (
                  <FiCameraOff size={15} />
                )}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.93 }}
                onClick={() => setCodeOpen(true)}
                className="w-10 h-10 rounded-xl flex items-center justify-center border bg-purple-50 border-purple-200 text-purple-500 hover:text-purple-800 hover:border-purple-300 transition-all"
              >
                <FiCode size={15} />
              </motion.button>
            </div>

            <div className="min-h-[14px] flex items-center justify-center">
              {micOn && isAIPlaying && (
                <span className="text-[10px] text-red-500/80">
                  Mic paused — AI is speaking
                </span>
              )}
            </div>

            <span className="text-[10px] text-purple-500 text-center">
              Coding question? Use{" "}
              <FiCode size={9} className="inline -mt-0.5" /> to write
              &amp; add code
            </span>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex flex-col p-4 sm:p-6">

          {/* HEADER */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-base sm:text-lg font-semibold text-purple-950">
                AI Interview
              </h2>

              <div className="flex items-center gap-2 text-purple-500 text-xs mt-0.5">
                <FiClock size={11} />
                <span>{question.difficulty}</span>
              </div>
            </div>

            <div className="flex flex-col items-end gap-1.5 min-w-[110px]">
              <Timer
                timeLeft={timeLeft}
                totalTime={question.timer || 60}
              />
            </div>
          </div>

          {/* QUESTION */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative overflow-hidden rounded-xl bg-purple-50 border border-purple-200 p-4 sm:p-5 mb-4"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-100/70 via-transparent to-transparent pointer-events-none" />

            <div className="relative flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-lg bg-purple-600 text-white flex items-center justify-center shrink-0">
                <FiMessageSquare size={14} />
              </div>

              <p className="text-xs text-purple-500">
                Question {currentIndex + 1}
              </p>
            </div>

            <p className="relative text-purple-950 text-sm sm:text-base leading-7">
              {question.question}
            </p>
          </motion.div>

          {/* PROGRESS */}
          <div className="mb-3">
            <div className="flex justify-between text-[10px] text-purple-500 mb-1">
              <span>Progress</span>
              <span>
                {currentIndex + 1}/{totalQuestions}
              </span>
            </div>

            <div className="w-full h-1 rounded-full bg-purple-100 overflow-hidden">
              <div
                className="h-full bg-purple-600 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* ANSWER */}
          <div className="flex-1 flex flex-col min-h-0">
            <label className="text-xs font-medium text-purple-700 mb-1.5">
              Your Answer
            </label>

            <textarea
              onChange={(e) => setAnswer(e.target.value)}
              value={answer}
              rows={5}
              onKeyDown={(e) => {
                if (e.ctrlKey && e.key === "Enter") submit();
              }}
              placeholder="Write your answer here… or speak if mic is on"
              className="flex-1 w-full rounded-xl bg-white border border-purple-200 p-4 text-sm text-purple-950 outline-none resize-none focus:border-purple-400 transition placeholder-purple-300"
            />
          </div>

          {/* FEEDBACK */}
          <div className="mt-3 min-h-[0px]">
            <AnimatePresence>
              {feedback && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  className="rounded-xl border border-green-200 bg-green-50 p-4 max-h-40 overflow-y-auto"
                >
                  <p className="text-xs uppercase tracking-widest text-green-700 mb-2">
                    AI Feedback
                  </p>

                  <p className="text-sm text-purple-800 leading-6">
                    {feedback.feedback}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-purple-200">
            <span className="text-xs text-purple-500 hidden sm:block">
              Press{" "}
              <span className="mx-1 rounded bg-purple-100 px-1.5 py-0.5 text-purple-800 text-[10px]">
                Ctrl+Enter
              </span>
              to Submit
            </span>

            <div className="ml-auto flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowEndModal(true)}
                disabled={loading || isEndingInterview}
                className="h-10 rounded-xl border border-red-200 bg-red-50 px-4 text-sm font-semibold text-red-600 transition hover:bg-red-100 disabled:opacity-40"
              >
                End Interview
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={submit}
                disabled={
                  loading ||
                  !answer.trim() ||
                  isEndingInterview
                }
                className="h-10 min-w-[150px] justify-center px-5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold flex items-center gap-2 disabled:opacity-40 transition"
              >
                {loading ? (
                  <>
                    <div className="w-3.5 h-3.5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                    Submitting…
                  </>
                ) : (
                  <>
                    Submit Answer <FiArrowRight size={15} />
                  </>
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Step2interview;
