// // import React, { useRef } from 'react'
// // import { motion } from "motion/react"
// // import { FiArrowLeft, FiAward, FiCheck, FiTarget, FiTrendingUp, FiX } from 'react-icons/fi'
// // import { useNavigate } from 'react-router-dom'
// // import DownloadBtn from '../resume/DownloadBtn'
// // function Step3report({ report, user, setUser }) {
// //   const navigate = useNavigate()
// //   const reportRef = useRef(null)
// //   return (
// //     <div className='min-h-screen bg-white flex items-center justify-center md:p-5'>

// //       <motion.div
// //         initial={{ opacity: 0, y: 20 }}
// //         animate={{ opacity: 1, y: 0 }}
// //         className="w-full max-w-5xl rounded-[24px] bg-gray-100 border border-white/10 overflow-hidden">
// //         <div className='border-b border-white/10 px-8 py-6 flex items-center justify-between'>

// //           <div>
// //             <div onClick={() => navigate("/dashboard")} className='inline-flex items-center gap-2 text-white rounded-full border border-black/20 bg-black px-3 py-1.5 cursor-pointer'>
// //               <FiArrowLeft size={14} />
// //               <span className='text-xs text-zinc-100'>Back</span>

// //             </div>

// //             <h1 className='text-2xl font-bold text-black mt-2'>Interview Report</h1>

// //             <p className='text-xs mb-2 text-zinc-500 mt-1.5'>
// //               AI Generated Performance Analysis
// //             </p>

// //             <DownloadBtn
// //               docRef={reportRef}
// //               user={user}
// //               setUser={setUser}
// //             />
// //           </div>

// //           <div className='hidden md:flex items-center gap-2.5 rounded-2xl border border-black/34 bg-black px-4 py-2.5'>
// //             <FiAward className="text-yellow-400" size={16} />

// //             <span className='text-sm text-white'>Completed</span>
// //           </div>

// //         </div>


// //         <div className='p-8' ref={reportRef}>
// //           <div className='grid md:grid-cols-3 gap-5'>
// //             <div className='rounded-2xl bg-[#17181E] border border-white/10 p-6'>

// //               <div className='w-10 h-10 rounded-xl bg-white text-black flex items-center justify-center'>
// //                 <FiTarget size={18} />
// //               </div>

// //               <p className='mt-5 text-zinc-500 text-xs'>Overall Score</p>

// //               <h2 className='mt-2 text-4xl font-bold text-white'>
// //                 {report.overallScore}

// //                 <span className='text-lg text-zinc-500'>/100</span>
// //               </h2>


// //             </div>

// //             <div className='rounded-2xl bg-[#17181E] border border-white/10 p-6'>
// //               <div className='w-10 h-10 rounded-xl bg-white text-black flex items-center justify-center'>
// //                 <FiTrendingUp size={18} />
// //               </div>

// //               <p className='mt-5 text-zinc-500 text-xs'>Questions</p>

// //               <h2 className='mt-2 text-4xl font-bold text-white'>{report.questions.length}</h2>
// //             </div>


// //             <div className='rounded-2xl bg-[#17181E] border border-white/10 p-6'>
// //               <div className='w-10 h-10 rounded-xl bg-white text-black flex items-center justify-center'>
// //                 <FiAward size={18} />
// //               </div>

// //               <p className='mt-5 text-zinc-500 text-xs'>Status</p>

// //               <h2 className='mt-2 text-4xl font-bold text-white'>Completed</h2>
// //             </div>


// //           </div>

// //           <div className='mt-6 rounded-2xl bg-[#17181E] border border-white/10 p-6'>
// //             <h3 className="text-lg font-semibold text-white">
// //               Interview Summary
// //             </h3>

// //             <p className="mt-3 text-sm leading-7 text-zinc-400">
// //               {report.summary}
// //             </p>

// //           </div>

// //           <div className='grid lg:grid-cols-2 gap-5 mt-6'>

// //             <div className='rounded-2xl bg-[#17181E] border border-green-500/20 p-6'>

// //               <div className='flex items-center gap-2.5'>
// //                 <div className='w-9 h-9 rounded-lg bg-green-500 flex items-center justify-center'>
// //                   <FiTrendingUp className='text-white' size={16} />
// //                 </div>
// //                 <h2 className="text-lg font-semibold text-white">
// //                   Strengths
// //                 </h2>
// //               </div>

// //               <div className='mt-5 space-y-3'>
// //                 {report.strengths?.length >0 ? (
// //                   report.strengths?.map((s)=>(
// //                     <div key={s} className='flex items-start gap-3 rounded-xl bg-green-500/5 border border-green-500/10 p-3.5'>
// //                       <div className='w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 text-xs'><FiCheck size={16}/></div>

// //                       <p className='text-sm text-zinc-300 leading-6'>{s}</p>
// //                       </div>
// //                   ))

// //                 ):(
// //                   <p className="text-zinc-500 text-sm">
// //                       No strengths available.
// //                     </p>
// //                 )}
// //               </div>



// //             </div>


// //            <div className='rounded-2xl bg-[#17181E] border border-red-500/20 p-6'>

// //               <div className='flex items-center gap-2.5'>
// //                 <div className='w-9 h-9 rounded-lg bg-red-500 flex items-center justify-center'>
// //                   <FiX className='text-white' size={16} />
// //                 </div>
// //                 <h2 className="text-lg font-semibold text-white">
// //                   Areas to Improve
// //                 </h2>
// //               </div>

// //               <div className='mt-5 space-y-3'>
// //                 {report.weaknesses?.length >0 ? (
// //                   report.weaknesses?.map((s)=>(
// //                     <div key={s} className='flex items-start gap-3 rounded-xl bg-red-500/5 border border-red-500/10 p-3.5'>
// //                       <div className='w-6 h-6 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0 text-xs'>!</div>

// //                       <p className='text-sm text-zinc-300 leading-6'>{s}</p>
// //                       </div>
// //                   ))

// //                 ):(
// //                   <p className="text-zinc-500 text-sm">
// //                       No weaknesses found.
// //                     </p>
// //                 )}
// //               </div>



// //             </div>
// //           </div>

// //           <div className='mt-6 rounded-2xl bg-[#17181E] border border-white/10 p-6'>
// //           <h3 className="text-lg font-semibold text-white">
// //                 Recommendations
// //               </h3>


// //               <div className='mt-5 space-y-3'>
// //                 {
// //                   report.recommendations?.length > 0 ? (
// //                     report.recommendations?.map((r, i)=>(
// //                       <div key={i} className='flex items-start gap-3.5 rounded-xl border border-white/10 bg-white/[0.03] p-4'>
// //                         <div className='w-7 h-7 rounded-full bg-white text-black flex items-center justify-center font-semibold flex-shrink-0 text-sm'>{i+1}</div>
// //                         <p className='text-sm text-zinc-300 leading-6'>{r}</p>
// //                         </div>
// //                     ))

// //                   ):(
// //                     <p className="text-zinc-500 text-sm">
// //                     No recommendations available.</p>
// //                   )
// //                 }
// //               </div>
// //           </div>


// //           <div className='mt-8'>
// //              <h3 className="text-xl font-bold text-black mb-5">
// //                 Question Wise Analysis
// //               </h3>

// //               <div className='space-y-5'>
// //                 {report.questions?.map((item,index)=>(
// //                   <div key={index} className='rounded-2xl bg-[#17181E] border border-white/10 p-6'>
// //                     <div>
// //                       <span className='text-[11px] uppercase tracking-widest text-zinc-500'>
// //                         Question {index+1}

// //                       </span>
// //                       <h4 className='mt-2.5 text-base font-semibold text-white leading-7'>{item.question}</h4>
// //                     </div>

// //                     <div className='mt-6'>
// //                       <p className='text-[11px] uppercase tracking-widest text-zinc-500'> Your Answer</p>
// //                       <p className='mt-2.5 text-sm leading-6 text-zinc-300'>
// //                         {item.userAnswer || "No answer submitted"}
// //                       </p>
// //                     </div>

// //                     <div className='grid md:grid-cols-4 gap-3.5 mt-6'>
// //                       <div className='rounded-xl bg-black/20 p-3.5'>
// //                       <p className='text-xs text-zinc-500'>Score</p>
// //                       <h5 className='mt-2 text-xl font-bold text-white'>
// //                         {item.feedback?.score ?? 0}
// //                       </h5>
                      
// //                       </div>

// //                       <div className='rounded-xl bg-black/20 p-3.5'>
// //                       <p className='text-xs text-zinc-500'>Clarity</p>
// //                       <h5 className='mt-2 text-xl font-bold text-white'>
// //                         {item.feedback?.clarity ?? 0}
// //                       </h5>
                      
// //                       </div>

// //                       <div className='rounded-xl bg-black/20 p-3.5'>
// //                       <p className='text-xs text-zinc-500'>Relevance</p>
// //                       <h5 className='mt-2 text-xl font-bold text-white'>
// //                         {item.feedback?.relevance ?? 0}
// //                       </h5>
                      
// //                       </div>

// //                       <div className='rounded-xl bg-black/20 p-3.5'>
// //                       <p className='text-xs text-zinc-500'>Communication</p>
// //                       <h5 className='mt-2 text-xl font-bold text-white'>
// //                         {item.feedback?.communication ?? 0}
// //                       </h5>
                      
// //                       </div>
// //                     </div>

// //                     <div className='mt-6 rounded-xl border border-green-500/20 bg-green-500/5 p-4.5'>
// //                     <p className='text-[11px] uppercase tracking-widest text-green-400'>AI Feedback</p>
// //                     <p className='mt-2.5 text-sm leading-6 text-zinc-300'>{item.feedback?.feedback ||
// //                           "No feedback available."}</p>
// //                     </div>


// //                     {item.feedback?.improvements?.length > 0 && (
// //                       <div className='mt-6'>
// //                          <h5 className="text-sm font-semibold text-white">
// //                           Suggested Improvements
// //                         </h5>
// //                         <div className='mt-3.5 space-y-2.5'>
// //                           {item.feedback?.improvements?.map((item, i)=>(
// //                             <div key={i} className='rounded-lg border border-white/10 bg-white/[0.03] p-3.5'>
// //                               <p className='text-sm text-zinc-300'>
// //                                • {item}
// //                               </p>
// //                             </div>
// //                           ))}
// //                         </div>

// //                       </div>
// //                     )}

// //                   </div>
// //                 ))}
// //               </div>
// //           </div>

// //         </div>

// //       </motion.div>
// //     </div>
// //   )
// // }

// // export default Step3report



// import React, { useRef } from 'react'
// import { motion } from "motion/react"
// import { FiArrowLeft, FiAward, FiCheck, FiTarget, FiTrendingUp, FiX } from 'react-icons/fi'
// import { useNavigate } from 'react-router-dom'
// import DownloadBtn from '../resume/DownloadBtn'
// function Step3report({ report, user, setUser }) {
//   const navigate = useNavigate()
//   const reportRef = useRef(null)
//   return (
//     <div className='min-h-screen bg-purple-50 flex items-center justify-center md:p-5'>

//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="w-full max-w-5xl rounded-[24px] bg-white border border-purple-200 overflow-hidden shadow-[0_0_60px_rgba(139,92,246,.08)]">
//         <div className='border-b border-purple-200 px-8 py-6 flex items-center justify-between'>

//           <div>
//             <div onClick={() => navigate("/dashboard")} className='inline-flex items-center gap-2 text-white rounded-full border border-purple-700 bg-purple-600 px-3 py-1.5 cursor-pointer'>
//               <FiArrowLeft size={14} />
//               <span className='text-xs text-white'>Back</span>

//             </div>

//             <h1 className='text-2xl font-bold text-purple-950 mt-2'>Interview Report</h1>

//             <p className='text-xs mb-2 text-purple-500 mt-1.5'>
//               AI Generated Performance Analysis
//             </p>

//             <DownloadBtn
//               docRef={reportRef}
//               user={user}
//               setUser={setUser}
//             />
//           </div>

//           <div className='hidden md:flex items-center gap-2.5 rounded-2xl border border-purple-200 bg-purple-50 px-4 py-2.5'>
//             <FiAward className="text-yellow-500" size={16} />

//             <span className='text-sm text-purple-800'>Completed</span>
//           </div>

//         </div>


//         <div className='p-8' ref={reportRef}>
//           <div className='grid md:grid-cols-3 gap-5'>
//             <div className='rounded-2xl bg-purple-50 border border-purple-200 p-6'>

//               <div className='w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center'>
//                 <FiTarget size={18} />
//               </div>

//               <p className='mt-5 text-purple-500 text-xs'>Overall Score</p>

//               <h2 className='mt-2 text-4xl font-bold text-purple-950'>
//                 {report.overallScore}

//                 <span className='text-lg text-purple-400'>/100</span>
//               </h2>


//             </div>

//             <div className='rounded-2xl bg-purple-50 border border-purple-200 p-6'>
//               <div className='w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center'>
//                 <FiTrendingUp size={18} />
//               </div>

//               <p className='mt-5 text-purple-500 text-xs'>Questions</p>

//               <h2 className='mt-2 text-4xl font-bold text-purple-950'>{report.questions.length}</h2>
//             </div>


//             <div className='rounded-2xl bg-purple-50 border border-purple-200 p-6'>
//               <div className='w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center'>
//                 <FiAward size={18} />
//               </div>

//               <p className='mt-5 text-purple-500 text-xs'>Status</p>

//               <h2 className='mt-2 text-4xl font-bold text-purple-950'>Completed</h2>
//             </div>


//           </div>

//           <div className='mt-6 rounded-2xl bg-white border border-purple-200 p-6'>
//             <h3 className="text-lg font-semibold text-purple-950">
//               Interview Summary
//             </h3>

//             <p className="mt-3 text-sm leading-7 text-purple-700">
//               {report.summary}
//             </p>

//           </div>

//           <div className='grid lg:grid-cols-2 gap-5 mt-6'>

//             <div className='rounded-2xl bg-white border border-green-200 p-6'>

//               <div className='flex items-center gap-2.5'>
//                 <div className='w-9 h-9 rounded-lg bg-green-600 flex items-center justify-center'>
//                   <FiTrendingUp className='text-white' size={16} />
//                 </div>
//                 <h2 className="text-lg font-semibold text-purple-950">
//                   Strengths
//                 </h2>
//               </div>

//               <div className='mt-5 space-y-3'>
//                 {report.strengths?.length >0 ? (
//                   report.strengths?.map((s)=>(
//                     <div key={s} className='flex items-start gap-3 rounded-xl bg-green-50 border border-green-200 p-3.5'>
//                       <div className='w-6 h-6 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0 text-xs text-white'><FiCheck size={16}/></div>

//                       <p className='text-sm text-purple-800 leading-6'>{s}</p>
//                       </div>
//                   ))

//                 ):(
//                   <p className="text-purple-500 text-sm">
//                       No strengths available.
//                     </p>
//                 )}
//               </div>



//             </div>


//            <div className='rounded-2xl bg-white border border-red-200 p-6'>

//               <div className='flex items-center gap-2.5'>
//                 <div className='w-9 h-9 rounded-lg bg-red-500 flex items-center justify-center'>
//                   <FiX className='text-white' size={16} />
//                 </div>
//                 <h2 className="text-lg font-semibold text-purple-950">
//                   Areas to Improve
//                 </h2>
//               </div>

//               <div className='mt-5 space-y-3'>
//                 {report.weaknesses?.length >0 ? (
//                   report.weaknesses?.map((s)=>(
//                     <div key={s} className='flex items-start gap-3 rounded-xl bg-red-50 border border-red-200 p-3.5'>
//                       <div className='w-6 h-6 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0 text-xs text-white'>!</div>

//                       <p className='text-sm text-purple-800 leading-6'>{s}</p>
//                       </div>
//                   ))

//                 ):(
//                   <p className="text-purple-500 text-sm">
//                       No weaknesses found.
//                     </p>
//                 )}
//               </div>



//             </div>
//           </div>

//           <div className='mt-6 rounded-2xl bg-white border border-purple-200 p-6'>
//           <h3 className="text-lg font-semibold text-purple-950">
//                 Recommendations
//               </h3>


//               <div className='mt-5 space-y-3'>
//                 {
//                   report.recommendations?.length > 0 ? (
//                     report.recommendations?.map((r, i)=>(
//                       <div key={i} className='flex items-start gap-3.5 rounded-xl border border-purple-200 bg-purple-50 p-4'>
//                         <div className='w-7 h-7 rounded-full bg-purple-600 text-white flex items-center justify-center font-semibold flex-shrink-0 text-sm'>{i+1}</div>
//                         <p className='text-sm text-purple-800 leading-6'>{r}</p>
//                         </div>
//                     ))

//                   ):(
//                     <p className="text-purple-500 text-sm">
//                     No recommendations available.</p>
//                   )
//                 }
//               </div>
//           </div>


//           <div className='mt-8'>
//              <h3 className="text-xl font-bold text-purple-950 mb-5">
//                 Question Wise Analysis
//               </h3>

//               <div className='space-y-5'>
//                 {report.questions?.map((item,index)=>(
//                   <div key={index} className='rounded-2xl bg-white border border-purple-200 p-6'>
//                     <div>
//                       <span className='text-[11px] uppercase tracking-widest text-purple-500'>
//                         Question {index+1}

//                       </span>
//                       <h4 className='mt-2.5 text-base font-semibold text-purple-950 leading-7'>{item.question}</h4>
//                     </div>

//                     <div className='mt-6'>
//                       <p className='text-[11px] uppercase tracking-widest text-purple-500'> Your Answer</p>
//                       <p className='mt-2.5 text-sm leading-6 text-purple-700'>
//                         {item.userAnswer || "No answer submitted"}
//                       </p>
//                     </div>

//                     <div className='grid md:grid-cols-4 gap-3.5 mt-6'>
//                       <div className='rounded-xl bg-purple-50 border border-purple-100 p-3.5'>
//                       <p className='text-xs text-purple-500'>Score</p>
//                       <h5 className='mt-2 text-xl font-bold text-purple-950'>
//                         {item.feedback?.score ?? 0}
//                       </h5>
                      
//                       </div>

//                       <div className='rounded-xl bg-purple-50 border border-purple-100 p-3.5'>
//                       <p className='text-xs text-purple-500'>Clarity</p>
//                       <h5 className='mt-2 text-xl font-bold text-purple-950'>
//                         {item.feedback?.clarity ?? 0}
//                       </h5>
                      
//                       </div>

//                       <div className='rounded-xl bg-purple-50 border border-purple-100 p-3.5'>
//                       <p className='text-xs text-purple-500'>Relevance</p>
//                       <h5 className='mt-2 text-xl font-bold text-purple-950'>
//                         {item.feedback?.relevance ?? 0}
//                       </h5>
                      
//                       </div>

//                       <div className='rounded-xl bg-purple-50 border border-purple-100 p-3.5'>
//                       <p className='text-xs text-purple-500'>Communication</p>
//                       <h5 className='mt-2 text-xl font-bold text-purple-950'>
//                         {item.feedback?.communication ?? 0}
//                       </h5>
                      
//                       </div>
//                     </div>

//                     <div className='mt-6 rounded-xl border border-green-200 bg-green-50 p-4.5'>
//                     <p className='text-[11px] uppercase tracking-widest text-green-700'>AI Feedback</p>
//                     <p className='mt-2.5 text-sm leading-6 text-purple-800'>{item.feedback?.feedback ||
//                           "No feedback available."}</p>
//                     </div>


//                     {item.feedback?.improvements?.length > 0 && (
//                       <div className='mt-6'>
//                          <h5 className="text-sm font-semibold text-purple-950">
//                           Suggested Improvements
//                         </h5>
//                         <div className='mt-3.5 space-y-2.5'>
//                           {item.feedback?.improvements?.map((item, i)=>(
//                             <div key={i} className='rounded-lg border border-purple-200 bg-purple-50 p-3.5'>
//                               <p className='text-sm text-purple-800'>
//                                • {item}
//                               </p>
//                             </div>
//                           ))}
//                         </div>

//                       </div>
//                     )}

//                   </div>
//                 ))}
//               </div>
//           </div>

//         </div>

//       </motion.div>
//     </div>
//   )
// }

// export default Step3report


//chatgpt code 😄😄😄😄😄




import React, { useRef } from "react";
import { motion } from "motion/react";
import {
    FiArrowLeft,
    FiAward,
    FiCheck,
    FiTarget,
    FiTrendingUp,
    FiX
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import DownloadBtn from "../resume/DownloadBtn";

function Step3report({ report, user, setUser }) {
    const navigate = useNavigate();
    const reportRef = useRef(null);

    const isEnded = report.status === "ended";

    const totalQuestions = report.questions?.length || 0;

    const answeredQuestions =
        report.questions?.filter(
            (item) => item.userAnswer?.trim()
        ).length || 0;

    const endReason = report.endReason || "";

    const closingMessage =
        report.closingMessage ||
        "Don't be disappointed. Every interview is a learning opportunity. Keep practicing, improve your weak areas, and give your best next time. Thank you for your answers!";

    return (
        <div className="min-h-screen bg-purple-50 flex items-center justify-center md:p-5">

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-5xl rounded-[24px] bg-white border border-purple-200 overflow-hidden shadow-[0_0_60px_rgba(139,92,246,.08)]"
            >

                {/* HEADER */}
                <div className="border-b border-purple-200 px-8 py-6 flex items-center justify-between">

                    <div>
                        <button
                            onClick={() => navigate("/dashboard")}
                            className="inline-flex items-center gap-2 text-white rounded-full border border-purple-700 bg-purple-600 px-3 py-1.5"
                        >
                            <FiArrowLeft size={14} />
                            <span className="text-xs">Back</span>
                        </button>

                        <h1 className="text-2xl font-bold text-purple-950 mt-2">
                            Interview Report
                        </h1>

                        <p className="text-xs mb-2 text-purple-500 mt-1.5">
                            AI Generated Performance Analysis
                        </p>

                        <DownloadBtn
                            docRef={reportRef}
                            user={user}
                            setUser={setUser}
                        />
                    </div>

                    <div className="hidden md:flex items-center gap-2.5 rounded-2xl border border-purple-200 bg-purple-50 px-4 py-2.5">
                        <FiAward className="text-yellow-500" size={16} />

                        <span className="text-sm text-purple-800">
                            {isEnded ? "Ended" : "Completed"}
                        </span>
                    </div>

                </div>

                <div className="p-8" ref={reportRef}>

                    {/* END INTERVIEW MESSAGE */}
                    {isEnded && (
                        <div className="mb-6 rounded-2xl border border-purple-200 bg-purple-50 p-6">

                            <h2 className="text-xl font-bold text-purple-950">
                                Interview Ended
                            </h2>

                            <p className="mt-3 text-sm leading-7 text-purple-800">
                                {closingMessage}
                            </p>

                            {endReason && (
                                <div className="mt-4 rounded-xl border border-purple-200 bg-white p-4">

                                    <p className="text-xs font-semibold uppercase tracking-wider text-purple-500">
                                        Reason for ending
                                    </p>

                                    <p className="mt-2 text-sm text-purple-900">
                                        {endReason}
                                    </p>

                                </div>
                            )}

                        </div>
                    )}

                    {/* OVERVIEW CARDS */}
                    <div className="grid md:grid-cols-3 gap-5">

                        {/* SCORE */}
                        <div className="rounded-2xl bg-purple-50 border border-purple-200 p-6">

                            <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center">
                                <FiTarget size={18} />
                            </div>

                            <p className="mt-5 text-purple-500 text-xs">
                                Overall Score
                            </p>

                            <h2 className="mt-2 text-4xl font-bold text-purple-950">
                                {isEnded ? 0 : report.overallScore ?? 0}

                                <span className="text-lg text-purple-400">
                                    /100
                                </span>
                            </h2>

                            {isEnded && (
                                <p className="mt-2 text-xs text-purple-500">
                                    Score 0 because the interview was incomplete.
                                </p>
                            )}

                        </div>

                        {/* QUESTIONS ANSWERED */}
                        <div className="rounded-2xl bg-purple-50 border border-purple-200 p-6">

                            <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center">
                                <FiTrendingUp size={18} />
                            </div>

                            <p className="mt-5 text-purple-500 text-xs">
                                Questions Answered
                            </p>

                            <h2 className="mt-2 text-4xl font-bold text-purple-950">
                                {answeredQuestions}/{totalQuestions}
                            </h2>

                        </div>

                        {/* STATUS */}
                        <div className="rounded-2xl bg-purple-50 border border-purple-200 p-6">

                            <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center">
                                <FiAward size={18} />
                            </div>

                            <p className="mt-5 text-purple-500 text-xs">
                                Status
                            </p>

                            <h2 className="mt-2 text-3xl font-bold text-purple-950">
                                {isEnded ? "Ended" : "Completed"}
                            </h2>

                        </div>

                    </div>

                    {/* SUMMARY */}
                    <div className="mt-6 rounded-2xl bg-white border border-purple-200 p-6">

                        <h3 className="text-lg font-semibold text-purple-950">
                            Interview Summary
                        </h3>

                        <p className="mt-3 text-sm leading-7 text-purple-700">
                            {report.summary ||
                                (isEnded
                                    ? "You ended this interview before completing all questions. A complete interview assessment could not be generated. Review your answers and continue practicing."
                                    : "No summary available."
                                )}
                        </p>

                    </div>

                    {/* STRENGTHS AND WEAKNESSES */}
                    <div className="grid lg:grid-cols-2 gap-5 mt-6">

                        {/* STRENGTHS */}
                        <div className="rounded-2xl bg-white border border-green-200 p-6">

                            <div className="flex items-center gap-2.5">

                                <div className="w-9 h-9 rounded-lg bg-green-600 flex items-center justify-center">
                                    <FiTrendingUp className="text-white" size={16} />
                                </div>

                                <h2 className="text-lg font-semibold text-purple-950">
                                    Strengths
                                </h2>

                            </div>

                            <div className="mt-5 space-y-3">

                                {!isEnded && report.strengths?.length > 0 ? (

                                    report.strengths.map((s, i) => (
                                        <div
                                            key={i}
                                            className="flex items-start gap-3 rounded-xl bg-green-50 border border-green-200 p-3.5"
                                        >
                                            <div className="w-6 h-6 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0 text-white">
                                                <FiCheck size={16} />
                                            </div>

                                            <p className="text-sm text-purple-800 leading-6">
                                                {s}
                                            </p>
                                        </div>
                                    ))

                                ) : (

                                    <p className="text-purple-500 text-sm">
                                        {isEnded
                                            ? "A complete strengths analysis is unavailable because the interview was ended early."
                                            : "No strengths available."
                                        }
                                    </p>

                                )}

                            </div>

                        </div>

                        {/* WEAKNESSES */}
                        <div className="rounded-2xl bg-white border border-red-200 p-6">

                            <div className="flex items-center gap-2.5">

                                <div className="w-9 h-9 rounded-lg bg-red-500 flex items-center justify-center">
                                    <FiX className="text-white" size={16} />
                                </div>

                                <h2 className="text-lg font-semibold text-purple-950">
                                    Areas to Improve
                                </h2>

                            </div>

                            <div className="mt-5 space-y-3">

                                {!isEnded && report.weaknesses?.length > 0 ? (

                                    report.weaknesses.map((s, i) => (
                                        <div
                                            key={i}
                                            className="flex items-start gap-3 rounded-xl bg-red-50 border border-red-200 p-3.5"
                                        >
                                            <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0 text-xs text-white">
                                                !
                                            </div>

                                            <p className="text-sm text-purple-800 leading-6">
                                                {s}
                                            </p>
                                        </div>
                                    ))

                                ) : (

                                    <p className="text-purple-500 text-sm">
                                        {isEnded
                                            ? "Complete a full interview to receive a detailed improvement analysis."
                                            : "No weaknesses found."
                                        }
                                    </p>

                                )}

                            </div>

                        </div>

                    </div>

                    {/* RECOMMENDATIONS */}
                    <div className="mt-6 rounded-2xl bg-white border border-purple-200 p-6">

                        <h3 className="text-lg font-semibold text-purple-950">
                            Recommendations
                        </h3>

                        <div className="mt-5 space-y-3">

                            {!isEnded && report.recommendations?.length > 0 ? (

                                report.recommendations.map((r, i) => (
                                    <div
                                        key={i}
                                        className="flex items-start gap-3.5 rounded-xl border border-purple-200 bg-purple-50 p-4"
                                    >
                                        <div className="w-7 h-7 rounded-full bg-purple-600 text-white flex items-center justify-center font-semibold flex-shrink-0 text-sm">
                                            {i + 1}
                                        </div>

                                        <p className="text-sm text-purple-800 leading-6">
                                            {r}
                                        </p>
                                    </div>
                                ))

                            ) : (

                                <p className="text-purple-500 text-sm">
                                    {isEnded
                                        ? "Practice the unanswered questions and try another interview to receive personalized recommendations."
                                        : "No recommendations available."
                                    }
                                </p>

                            )}

                        </div>

                    </div>

                    {/* QUESTION WISE ANALYSIS */}
                    <div className="mt-8">

                        <h3 className="text-xl font-bold text-purple-950 mb-5">
                            Question Wise Analysis
                        </h3>

                        <div className="space-y-5">

                            {report.questions?.map((item, index) => (

                                <div
                                    key={index}
                                    className="rounded-2xl bg-white border border-purple-200 p-6"
                                >

                                    <div>
                                        <span className="text-[11px] uppercase tracking-widest text-purple-500">
                                            Question {index + 1}
                                        </span>

                                        <h4 className="mt-2.5 text-base font-semibold text-purple-950 leading-7">
                                            {item.question}
                                        </h4>
                                    </div>

                                    <div className="mt-6">

                                        <p className="text-[11px] uppercase tracking-widest text-purple-500">
                                            Your Answer
                                        </p>

                                        <p className="mt-2.5 text-sm leading-6 text-purple-700">
                                            {item.userAnswer || "No answer submitted"}
                                        </p>

                                    </div>

                                    {/* SHOW AI SCORES ONLY FOR COMPLETED INTERVIEWS */}
                                    {!isEnded && (
                                        <>
                                            <div className="grid md:grid-cols-4 gap-3.5 mt-6">

                                                {[
                                                    ["Score", item.feedback?.score],
                                                    ["Clarity", item.feedback?.clarity],
                                                    ["Relevance", item.feedback?.relevance],
                                                    ["Communication", item.feedback?.communication]
                                                ].map(([label, value]) => (

                                                    <div
                                                        key={label}
                                                        className="rounded-xl bg-purple-50 border border-purple-100 p-3.5"
                                                    >
                                                        <p className="text-xs text-purple-500">
                                                            {label}
                                                        </p>

                                                        <h5 className="mt-2 text-xl font-bold text-purple-950">
                                                            {value ?? 0}
                                                        </h5>
                                                    </div>

                                                ))}

                                            </div>

                                            <div className="mt-6 rounded-xl border border-green-200 bg-green-50 p-4">

                                                <p className="text-[11px] uppercase tracking-widest text-green-700">
                                                    AI Feedback
                                                </p>

                                                <p className="mt-2.5 text-sm leading-6 text-purple-800">
                                                    {item.feedback?.feedback || "No feedback available."}
                                                </p>

                                            </div>

                                            {item.feedback?.improvements?.length > 0 && (
                                                <div className="mt-6">

                                                    <h5 className="text-sm font-semibold text-purple-950">
                                                        Suggested Improvements
                                                    </h5>

                                                    <div className="mt-3.5 space-y-2.5">

                                                        {item.feedback.improvements.map((improvement, i) => (
                                                            <div
                                                                key={i}
                                                                className="rounded-lg border border-purple-200 bg-purple-50 p-3.5"
                                                            >
                                                                <p className="text-sm text-purple-800">
                                                                    • {improvement}
                                                                </p>
                                                            </div>
                                                        ))}

                                                    </div>

                                                </div>
                                            )}
                                        </>
                                    )}

                                    {isEnded && (
                                        <p className="mt-5 text-xs text-purple-500">
                                            The interview ended before a complete assessment could be generated.
                                        </p>
                                    )}

                                </div>

                            ))}

                        </div>

                    </div>

                    {/* BACK TO DASHBOARD */}
                    <div className="mt-8 flex justify-center">

                        <button
                            onClick={() => navigate("/dashboard")}
                            className="rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 py-3 transition"
                        >
                            Back to Dashboard
                        </button>

                    </div>

                </div>

            </motion.div>

        </div>
    );
}

export default Step3report;
