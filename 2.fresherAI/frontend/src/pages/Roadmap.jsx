// import React, { useState } from 'react'
// import { AnimatePresence, motion } from "motion/react"
// import { FiCheck, FiChevronDown, FiClock, FiFileText, FiSend, FiX, FiZap } from 'react-icons/fi'
// import { useNavigate } from 'react-router-dom'
// import { BsRocketTakeoff } from "react-icons/bs";
// import { useCoins } from '../apis/user.api'
// import api from '../utils/axios'
// import { useSelector } from 'react-redux'
// import { useEffect } from 'react'
// import RoadmapResult from '../components/roadmap/RoadmapResult'
// const PACKAGE_OPTIONS = ["10 LPA", "15 LPA", "20 LPA", "30 LPA", "40 LPA"];
// function Roadmap({ user, setUser }) {
//     const navigate = useNavigate()
//     const [historyOpen, setHistoryOpen] = useState(false);
//     const [roadmap, setRoadmap] = useState(null);
//     const [role, setRole] = useState("");
//     const [targetPackage, setTargetPackage] = useState(PACKAGE_OPTIONS[2]); // default "20 LPA"
//     const [packageOpen, setPackageOpen] = useState(false);
//     const [useResume, setUseResume] = useState(false);
//     const [loading, setLoading] = useState(false);
//     const [historyLoading, setHistoryLoading] = useState(false);
//     const [history, setHistory] = useState([]);
//     const [error, setError] = useState("");

//     const { resume } = useSelector((state) => state.resume)


//     useEffect(() => {

//         getAllRoadmaps()
//     }, [])

//     const getAllRoadmaps = async () => {
//             setHistoryLoading(true)
//             try {
//                 const response = await api.get("/api/roadmap/all")
//                 console.log(response.data)
//                 setHistory(response.data.data)
//                 setHistoryLoading(false)
//             } catch (error) {
//                 console.log(error)
//                 setHistoryLoading(false)
//             }
//         }


//     const getRoadmapById = async (id) => {
//         try {
//             const response = await api.get(`/api/roadmap/${id}`)
//             console.log(response.data)
//             setRoadmap(response.data.data)
//         } catch (error) {
//             console.log(error)
//         }
//     }


//     const handleGenerate = async () => {
//         if (!role.trim() || loading) return;
//         setLoading(true);
//         setError("");
//         try {
//             try {
//                 const coinResponse = await useCoins({ coins: 20, action: "roadmap-builder" })
//                 setUser((prev) => ({
//                     ...prev, interviewCoin: coinResponse?.interviewCoin,
//                 }))
//             } catch (error) {
//                 setLoading(false)
//                 alert("Failed to use coins.")
//                 return;
//             }

//             const response = await api.post("/api/roadmap/generate", {
//                 role: role.trim(),
//                 targetPackage,
//                 useResume,
//                 resume
//             })
//             setRoadmap(response.data.data)
// getAllRoadmaps()
//             setLoading(false)

//         } catch (error) {
//             console.error("Failed to generate roadmap:", error);
//             setError("Something went wrong while generating your roadmap. Please try again.");
//             setLoading(false)

//         }
//     }


//     return (
//         <div className='min-h-screen bg-purple-50 text-purple-950 flex flex-col'>
//             <motion.nav
//                 initial={{ y: -60, opacity: 0 }}
//                 animate={{ y: 0, opacity: 1 }}
//                 transition={{ duration: 0.5, ease: "easeOut" }}
//                 className='sticky top-0 z-20 border-b border-purple-200 bg-purple-50/80 backdrop-blur-xl'>
//                 <div className='mx-auto flex h-12 max-w-7xl items-center justify-between px-3 sm:px-5'>
//                     <div onClick={() => navigate("/dashboard")}
//                         className='flex cursor-pointer items-center gap-1.5'>
//                         <span className='text-sm font-extrabold sm:text-base text-purple-950'>Mirror Interview</span>
//                         <span className='hidden rounded bg-purple-100 px-1.5 py-0.5 text-[10px] text-purple-600 sm:block'>Roadmap Builder</span>
//                     </div>

//                     <button onClick={() => setHistoryOpen(!historyOpen)} className='flex h-8 items-center justify-center gap-1 rounded-lg border border-purple-200 text-purple-600 transition px-2 hover:border-purple-500 hover:text-purple-800 text-[10px]'>
//                         <FiClock />
//                         <span className="hidden sm:inline">History</span>
//                     </button>

//                 </div>

//             </motion.nav>

//             <main className='flex-1 overflow-y-auto pb-28 sm:pb-32 pt-16 sm:pt-20'>
//                 <div className='max-w-3xl mx-auto px-3 sm:px-4 pt-5 sm:pt-6'>
//                     <AnimatePresence mode='wait'>
//                         {!roadmap ? (
//                             <motion.div
//                                 initial={{ opacity: 0, scale: 0.97 }}
//                                 animate={{ opacity: 1, scale: 1 }}
//                                 exit={{ opacity: 0, scale: 0.97 }}
//                                 transition={{ duration: 0.4 }}
//                                 className='flex flex-col items-center justify-center min-h-[60vh] text-center px-2 sm:px-4'>
//                                 <div className='text-4xl sm:text-5xl mb-4 sm:mb-5'>
//                                     <BsRocketTakeoff className='text-purple-600' />

//                                 </div>

//                                 <h3 className='text-xl sm:text-2xl font-bold text-purple-950 mb-2'>AI Roadmap Generator</h3>

//                                 <p className='text-purple-500 text-sm max-w-xs sm:max-w-md mb-1'> Generate a personalised roadmap for your dream job.</p>

//                                 <p className='text-purple-400 text-xs sm:text-sm max-w-xs sm:max-w-md'>
//                                     Choose a role and let AI build a complete learning path.
//                                 </p>

//                                 {error && <p className="mt-4 text-xs text-red-500 max-w-xs sm:max-w-md">{error}</p>}

//                                 <div className='mt-6 sm:mt-8 grid grid-cols-3 gap-2 sm:gap-3 w-full max-w-xs sm:max-w-sm'>
//                                     {
//                                         ["Frontend Dev", "Backend Eng", "ML Engineer"].map((r) => (
//                                             <motion.button
//                                                 key={r}
//                                                 onClick={() => setRole(r)}
//                                                 whileHover={{ y: -2 }}
//                                                 whileTap={{ scale: 0.97 }}
//                                                 className='relative overflow-hidden text-xs py-2 sm:py-2.5 px-2 sm:px-3 rounded-xl bg-purple-100 border border-purple-200 text-purple-700 hover:text-purple-950 hover:border-purple-400 shadow-[0_4px_14px_rgba(139,92,246,0.12)] transition-all'>
//                                                 <div className='absolute inset-0 bg-gradient-to-br from-purple-200/40 via-transparent to-transparent pointer-events-none' />
//                                                 <span className='relative'>{r}</span>

//                                             </motion.button>
//                                         ))
//                                     }
//                                 </div>

//                             </motion.div>
//                         ) : (
//                             <RoadmapResult
//                             roadmap={roadmap}
//                             onClear={()=>setRoadmap(null)}
                            
//                             />

//                         )}


//                     </AnimatePresence>
//                 </div>

//             </main>

//             <div className='fixed bottom-0 left-0 right-0 z-30 pb-3 sm:pb-4 pt-3 px-3 sm:px-4 bg-gradient-to-t from-purple-50 via-purple-50/95 to-transparent'>
//                 <div className='max-w-3xl mx-auto'>
//                     <motion.div
//                         initial={{ opacity: 0, y: 10 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ delay: 0.2 }}
//                         className='relative overflow-visible flex items-center gap-1.5 sm:gap-2 p-1.5 sm:p-2 rounded-xl sm:rounded-2xl bg-white backdrop-blur-2xl border border-purple-200 shadow-[0_8px_32px_rgba(139,92,246,0.15)]'>

//                         <input
//                             type='text'
//                             placeholder='Backend Developer'
//                             onChange={(e) => setRole(e.target.value)}
//                             value={role}
//                             className='relative flex-1 min-w-0 bg-transparent text-xs sm:text-sm text-purple-950 placeholder-purple-300 outline-none px-2 py-1.5' />

//                         <div className='relative'>
//                             <motion.button
//                                 type='button'
//                                 whileHover={{ scale: 1.02 }}
//                                 whileTap={{ scale: 0.97 }}
//                                 onClick={() => setPackageOpen(!packageOpen)}
//                                 className='relative flex items-center gap-1 text-xs px-2.5 py-2 rounded-xl border border-purple-200 text-purple-600 hover:text-purple-900 hover:border-purple-400 transition-all whitespace-nowrap bg-purple-50'>
//                                 {targetPackage}
//                                 <FiChevronDown size={11} className={`transition-transform ${packageOpen ? "rotate-180" : ""}`} />


//                             </motion.button>

//                             <AnimatePresence>
//                                 {packageOpen && (
//                                     <motion.div
//                                         initial={{ opacity: 0, y: 6, scale: 0.97 }}
//                                         animate={{ opacity: 1, y: 0, scale: 1 }}
//                                         exit={{ opacity: 0, y: 6, scale: 0.97 }}
//                                         transition={{ duration: 0.15 }}
//                                         className='absolute bottom-full mb-4 right-0 w-28 rounded-xl overflow-hidden border border-purple-200 bg-white shadow-[0_8px_24px_rgba(139,92,246,0.2)] z-10 '>
//                                         {
//                                             PACKAGE_OPTIONS.map((pkg) => (
//                                                 <button key={pkg}
//                                                     onClick={() => {
//                                                         setTargetPackage(pkg);
//                                                         setPackageOpen(false)
//                                                     }}
//                                                     className={`w-full text-left text-xs px-3 py-2 transition-colors ${pkg === targetPackage
//                                                         ? "bg-purple-100 text-purple-900"
//                                                         : "text-purple-600 hover:bg-purple-50 hover:text-purple-900"
//                                                         }`}>
//                                                     {pkg}

//                                                 </button>
//                                             ))
//                                         }

//                                     </motion.div>
//                                 )}
//                             </AnimatePresence>
//                         </div>

//                         <motion.button
//                             whileHover={{ scale: 1.03 }}
//                             whileTap={{ scale: 0.97 }}
//                             type='button'
//                             onClick={() => setUseResume(!useResume)}
//                             className={`flex items-center text-xs gap-1 px-2 py-2 rounded-xl ${useResume
//                                 ? "bg-purple-100 text-purple-700"
//                                 : "bg-purple-50 text-purple-600"
//                                 }`}>
//                             {useResume ? (
//                                 <>
//                                     <FiCheck size={12} />
//                                     Added
//                                 </>
//                             ) : (
//                                 <>
//                                     <FiFileText size={12} />
//                                     Resume
//                                 </>
//                             )}

//                         </motion.button>

//                         <motion.button
//                             whileHover={{ scale: 1.03 }}
//                             whileTap={{ scale: 0.97 }}
//                             disabled={loading || !role.trim()}
//                             onClick={handleGenerate}
//                             className='relative flex items-center gap-1.5 text-xs px-3 sm:px-4 py-2 rounded-xl font-semibold text-white bg-purple-600 hover:bg-purple-700 shadow-[0_2px_10px_rgba(139,92,246,0.2)] transition-all disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap'>
//                             {loading ? (
//                                 <>
//                                     <motion.span
//                                         animate={{ rotate: 360 }}
//                                         transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
//                                         className="inline-block"
//                                     >
//                                         <FiZap size={12} />
//                                     </motion.span>
//                                     <span className="hidden sm:inline">Generating…</span>
//                                 </>
//                             ) : (
//                                 <>
//                                     <FiSend size={12} />
//                                     <span className="hidden sm:inline">Generate</span>
//                                 </>
//                             )}

//                         </motion.button>


//                     </motion.div>

//                 </div>
//             </div>

//             <AnimatePresence>
//                 {
//                     historyOpen && (
//                         <>
//                             <motion.div
//                                 initial={{ opacity: 0 }}
//                                 animate={{ opacity: 1 }}
//                                 exit={{ opacity: 0 }}
//                                 onClick={() => setHistoryOpen(false)}
//                                 className='fixed inset-0 z-40 bg-purple-950/20 backdrop-blur-sm' />

//                             <motion.aside
//                                 initial={{ x: 320 }}
//                                 animate={{ x: 0 }}
//                                 exit={{ x: 320 }}
//                                 transition={{ type: "spring", stiffness: 320, damping: 32 }}
//                                 className='fixed right-0 top-0 bottom-0 z-50 w-[280px] sm:w-[300px] max-w-[85vw] bg-purple-50 border-l border-purple-200 flex flex-col overflow-y-auto shadow-[0_0_40px_rgba(139,92,246,0.1)]'>
//                                 <div className='flex items-center justify-between px-4 py-3 sm:py-4 border-b border-purple-200 sticky top-0 bg-purple-50/90 backdrop-blur-xl'>
//                                     <span className='text-sm font-semibold text-purple-950'>Previous Roadmaps</span>
//                                     <button onClick={() => setHistoryOpen(false)} className='text-purple-400 hover:text-purple-900 transition-colors'><FiX size={16} /></button>
//                                 </div>

//                                 <div className='flex flex-col gap-2 p-3'>
//                                     {historyLoading ? (
//                                         <p className="text-xs text-purple-400 text-center py-6">Loading…</p>
//                                     )
//                                         : history.length === 0 ?
//                                             (
//                                                 <p className="text-xs text-purple-400 text-center py-6">No roadmaps yet.</p>
//                                             ) :
//                                             (
//                                                 history.map((h, i) => (
//                                                     <button key={i} onClick={()=>{
//                                                         getRoadmapById(h._id);
//                                                         setHistoryOpen(false)
//                                                     }} className='relative overflow-hidden text-left p-4 rounded-xl bg-purple-100 border border-purple-200'>
//                                                         <h3 className='text-purple-950 font-semibold'>{h.title}</h3>
//                                                         <div className='flex justify-between items-center my-1'>
//                                                             <span className='text-purple-600 text-xs'>{h.targetPackage}</span>
//                                                             <p className='text-xs text-purple-400'>{h.duration}</p>
//                                                         </div>

//                                                         <p className='text-xs text-purple-400 mt-1'>
//                                                         {new Date(h.createdAt).toLocaleDateString()}</p>

//                                                     </button>
//                                                 ))
//                                             )}
//                                 </div>


//                             </motion.aside>

//                         </>
//                     )
//                 }
//             </AnimatePresence>




//         </div>
//     )
// }

// export default Roadmap



//chatgpt code 😄😄😄😄😄😄😄



import React, { useState, useEffect } from 'react'
import { AnimatePresence, motion } from "motion/react"
import {
    FiCheck,
    FiChevronDown,
    FiClock,
    FiFileText,
    FiSend,
    FiX,
    FiZap,
    FiTrash2
} from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { BsRocketTakeoff } from "react-icons/bs";
import { useCoins } from '../apis/user.api'
import api from '../utils/axios'
import { useSelector } from 'react-redux'
import RoadmapResult from '../components/roadmap/RoadmapResult'

const PACKAGE_OPTIONS = ["10 LPA", "15 LPA", "20 LPA", "30 LPA", "40 LPA"];

function Roadmap({ user, setUser }) {
    const navigate = useNavigate()

    const [historyOpen, setHistoryOpen] = useState(false);
    const [roadmap, setRoadmap] = useState(null);
    const [role, setRole] = useState("");
    const [targetPackage, setTargetPackage] = useState(PACKAGE_OPTIONS[2]);
    const [packageOpen, setPackageOpen] = useState(false);
    const [useResume, setUseResume] = useState(false);
    const [loading, setLoading] = useState(false);
    const [historyLoading, setHistoryLoading] = useState(false);
    const [history, setHistory] = useState([]);
    const [error, setError] = useState("");

    // Track which roadmap is currently being deleted
    const [deletingId, setDeletingId] = useState(null);

    const { resume } = useSelector((state) => state.resume);


    useEffect(() => {
        getAllRoadmaps();
    }, []);


    // GET ALL ROADMAPS
    const getAllRoadmaps = async () => {
        setHistoryLoading(true);

        try {
            const response = await api.get("/api/roadmap/all");

            setHistory(response.data.data || []);

        } catch (error) {
            console.log("Failed to fetch roadmaps:", error);

        } finally {
            setHistoryLoading(false);
        }
    };


    // GET ROADMAP BY ID
    const getRoadmapById = async (id) => {
        try {
            const response = await api.get(`/api/roadmap/${id}`);

            setRoadmap(response.data.data);

        } catch (error) {
            console.log("Failed to fetch roadmap:", error);
            alert(
                error.response?.data?.message ||
                "Failed to load roadmap."
            );
        }
    };


    // DELETE INDIVIDUAL ROADMAP
    const handleDeleteRoadmap = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this roadmap? This action cannot be undone."
        );

        if (!confirmDelete) return;

        setDeletingId(id);

        try {
            const response = await api.delete(`/api/roadmap/${id}`);

            if (response.data.success) {

                // Remove only the deleted roadmap from history
                setHistory((prevHistory) =>
                    prevHistory.filter((item) => item._id !== id)
                );

                // If the deleted roadmap is currently displayed,
                // clear it from the screen
                if (roadmap?._id === id) {
                    setRoadmap(null);
                }

                alert("Roadmap deleted successfully.");
            }

        } catch (error) {
            console.log("Failed to delete roadmap:", error);

            alert(
                error.response?.data?.message ||
                "Failed to delete roadmap. Please try again."
            );

        } finally {
            setDeletingId(null);
        }
    };


    // GENERATE ROADMAP
    const handleGenerate = async () => {
        if (!role.trim() || loading) return;

        setLoading(true);
        setError("");

        try {
            try {
                const coinResponse = await useCoins({
                    coins: 20,
                    action: "roadmap-builder"
                });

                setUser((prev) => ({
                    ...prev,
                    interviewCoin: coinResponse?.interviewCoin,
                }));

            } catch (error) {
                setLoading(false);
                alert("Failed to use coins.");
                return;
            }

            const response = await api.post("/api/roadmap/generate", {
                role: role.trim(),
                targetPackage,
                useResume,
                resume
            });

            setRoadmap(response.data.data);

            await getAllRoadmaps();

            setLoading(false);

        } catch (error) {
            console.error("Failed to generate roadmap:", error);

            setError(
                "Something went wrong while generating your roadmap. Please try again."
            );

            setLoading(false);
        }
    };


    return (
        <div className='min-h-screen bg-purple-50 text-purple-950 flex flex-col'>

            {/* NAVBAR */}
            <motion.nav
                initial={{ y: -60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className='sticky top-0 z-20 border-b border-purple-200 bg-purple-50/80 backdrop-blur-xl'
            >
                <div className='mx-auto flex h-12 max-w-7xl items-center justify-between px-3 sm:px-5'>

                    <div
                        onClick={() => navigate("/dashboard")}
                        className='flex cursor-pointer items-center gap-1.5'
                    >
                        <span className='text-sm font-extrabold sm:text-base text-purple-950'>
                            Mirror Interview
                        </span>

                        <span className='hidden rounded bg-purple-100 px-1.5 py-0.5 text-[10px] text-purple-600 sm:block'>
                            Roadmap Builder
                        </span>
                    </div>

                    <button
                        onClick={() => setHistoryOpen(!historyOpen)}
                        className='flex h-8 items-center justify-center gap-1 rounded-lg border border-purple-200 text-purple-600 transition px-2 hover:border-purple-500 hover:text-purple-800 text-[10px]'
                    >
                        <FiClock />
                        <span className="hidden sm:inline">History</span>
                    </button>

                </div>
            </motion.nav>


            {/* MAIN CONTENT */}
            <main className='flex-1 overflow-y-auto pb-28 sm:pb-32 pt-16 sm:pt-20'>

                <div className='max-w-3xl mx-auto px-3 sm:px-4 pt-5 sm:pt-6'>

                    <AnimatePresence mode='wait'>

                        {!roadmap ? (

                            <motion.div
                                initial={{ opacity: 0, scale: 0.97 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.97 }}
                                transition={{ duration: 0.4 }}
                                className='flex flex-col items-center justify-center min-h-[60vh] text-center px-2 sm:px-4'
                            >

                                <div className='text-4xl sm:text-5xl mb-4 sm:mb-5'>
                                    <BsRocketTakeoff className='text-purple-600' />
                                </div>

                                <h3 className='text-xl sm:text-2xl font-bold text-purple-950 mb-2'>
                                    AI Roadmap Generator
                                </h3>

                                <p className='text-purple-500 text-sm max-w-xs sm:max-w-md mb-1'>
                                    Generate a personalised roadmap for your dream job.
                                </p>

                                <p className='text-purple-400 text-xs sm:text-sm max-w-xs sm:max-w-md'>
                                    Choose a role and let AI build a complete learning path.
                                </p>

                                {error && (
                                    <p className="mt-4 text-xs text-red-500 max-w-xs sm:max-w-md">
                                        {error}
                                    </p>
                                )}

                                <div className='mt-6 sm:mt-8 grid grid-cols-3 gap-2 sm:gap-3 w-full max-w-xs sm:max-w-sm'>

                                    {["Frontend Dev", "Backend Eng", "ML Engineer"].map((r) => (

                                        <motion.button
                                            key={r}
                                            onClick={() => setRole(r)}
                                            whileHover={{ y: -2 }}
                                            whileTap={{ scale: 0.97 }}
                                            className='relative overflow-hidden text-xs py-2 sm:py-2.5 px-2 sm:px-3 rounded-xl bg-purple-100 border border-purple-200 text-purple-700 hover:text-purple-950 hover:border-purple-400 shadow-[0_4px_14px_rgba(139,92,246,0.12)] transition-all'
                                        >
                                            <div className='absolute inset-0 bg-gradient-to-br from-purple-200/40 via-transparent to-transparent pointer-events-none' />

                                            <span className='relative'>{r}</span>

                                        </motion.button>

                                    ))}

                                </div>

                            </motion.div>

                        ) : (

                            <RoadmapResult
                                roadmap={roadmap}
                                onClear={() => setRoadmap(null)}
                            />

                        )}

                    </AnimatePresence>

                </div>

            </main>


            {/* BOTTOM GENERATOR BAR */}
            <div className='fixed bottom-0 left-0 right-0 z-30 pb-3 sm:pb-4 pt-3 px-3 sm:px-4 bg-gradient-to-t from-purple-50 via-purple-50/95 to-transparent'>

                <div className='max-w-3xl mx-auto'>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className='relative overflow-visible flex items-center gap-1.5 sm:gap-2 p-1.5 sm:p-2 rounded-xl sm:rounded-2xl bg-white backdrop-blur-2xl border border-purple-200 shadow-[0_8px_32px_rgba(139,92,246,0.15)]'
                    >

                        <input
                            type='text'
                            placeholder='Backend Developer'
                            onChange={(e) => setRole(e.target.value)}
                            value={role}
                            className='relative flex-1 min-w-0 bg-transparent text-xs sm:text-sm text-purple-950 placeholder-purple-300 outline-none px-2 py-1.5'
                        />


                        {/* PACKAGE SELECTOR */}
                        <div className='relative'>

                            <motion.button
                                type='button'
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={() => setPackageOpen(!packageOpen)}
                                className='relative flex items-center gap-1 text-xs px-2.5 py-2 rounded-xl border border-purple-200 text-purple-600 hover:text-purple-900 hover:border-purple-400 transition-all whitespace-nowrap bg-purple-50'
                            >
                                {targetPackage}

                                <FiChevronDown
                                    size={11}
                                    className={`transition-transform ${packageOpen ? "rotate-180" : ""}`}
                                />

                            </motion.button>


                            <AnimatePresence>

                                {packageOpen && (

                                    <motion.div
                                        initial={{ opacity: 0, y: 6, scale: 0.97 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 6, scale: 0.97 }}
                                        transition={{ duration: 0.15 }}
                                        className='absolute bottom-full mb-4 right-0 w-28 rounded-xl overflow-hidden border border-purple-200 bg-white shadow-[0_8px_24px_rgba(139,92,246,0.2)] z-10'
                                    >

                                        {PACKAGE_OPTIONS.map((pkg) => (

                                            <button
                                                key={pkg}
                                                onClick={() => {
                                                    setTargetPackage(pkg);
                                                    setPackageOpen(false);
                                                }}
                                                className={`w-full text-left text-xs px-3 py-2 transition-colors ${
                                                    pkg === targetPackage
                                                        ? "bg-purple-100 text-purple-900"
                                                        : "text-purple-600 hover:bg-purple-50 hover:text-purple-900"
                                                }`}
                                            >
                                                {pkg}
                                            </button>

                                        ))}

                                    </motion.div>

                                )}

                            </AnimatePresence>

                        </div>


                        {/* RESUME BUTTON */}
                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            type='button'
                            onClick={() => setUseResume(!useResume)}
                            className={`flex items-center text-xs gap-1 px-2 py-2 rounded-xl ${
                                useResume
                                    ? "bg-purple-100 text-purple-700"
                                    : "bg-purple-50 text-purple-600"
                            }`}
                        >

                            {useResume ? (
                                <>
                                    <FiCheck size={12} />
                                    Added
                                </>
                            ) : (
                                <>
                                    <FiFileText size={12} />
                                    Resume
                                </>
                            )}

                        </motion.button>


                        {/* GENERATE BUTTON */}
                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            disabled={loading || !role.trim()}
                            onClick={handleGenerate}
                            className='relative flex items-center gap-1.5 text-xs px-3 sm:px-4 py-2 rounded-xl font-semibold text-white bg-purple-600 hover:bg-purple-700 shadow-[0_2px_10px_rgba(139,92,246,0.2)] transition-all disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap'
                        >

                            {loading ? (
                                <>
                                    <motion.span
                                        animate={{ rotate: 360 }}
                                        transition={{
                                            repeat: Infinity,
                                            duration: 1,
                                            ease: "linear"
                                        }}
                                        className="inline-block"
                                    >
                                        <FiZap size={12} />
                                    </motion.span>

                                    <span className="hidden sm:inline">
                                        Generating…
                                    </span>
                                </>
                            ) : (
                                <>
                                    <FiSend size={12} />

                                    <span className="hidden sm:inline">
                                        Generate
                                    </span>
                                </>
                            )}

                        </motion.button>

                    </motion.div>

                </div>

            </div>


            {/* ROADMAP HISTORY SIDEBAR */}
            <AnimatePresence>

                {historyOpen && (

                    <>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setHistoryOpen(false)}
                            className='fixed inset-0 z-40 bg-purple-950/20 backdrop-blur-sm'
                        />


                        <motion.aside
                            initial={{ x: 320 }}
                            animate={{ x: 0 }}
                            exit={{ x: 320 }}
                            transition={{
                                type: "spring",
                                stiffness: 320,
                                damping: 32
                            }}
                            className='fixed right-0 top-0 bottom-0 z-50 w-[280px] sm:w-[300px] max-w-[85vw] bg-purple-50 border-l border-purple-200 flex flex-col overflow-y-auto shadow-[0_0_40px_rgba(139,92,246,0.1)]'
                        >

                            {/* SIDEBAR HEADER */}
                            <div className='flex items-center justify-between px-4 py-3 sm:py-4 border-b border-purple-200 sticky top-0 bg-purple-50/90 backdrop-blur-xl'>

                                <span className='text-sm font-semibold text-purple-950'>
                                    Previous Roadmaps
                                </span>

                                <button
                                    onClick={() => setHistoryOpen(false)}
                                    className='text-purple-400 hover:text-purple-900 transition-colors'
                                >
                                    <FiX size={16} />
                                </button>

                            </div>


                            {/* HISTORY LIST */}
                            <div className='flex flex-col gap-2 p-3'>

                                {historyLoading ? (

                                    <p className="text-xs text-purple-400 text-center py-6">
                                        Loading…
                                    </p>

                                ) : history.length === 0 ? (

                                    <p className="text-xs text-purple-400 text-center py-6">
                                        No roadmaps yet.
                                    </p>

                                ) : (

                                    history.map((h) => (

                                        <div
                                            key={h._id}
                                            className='relative flex items-center gap-2 p-3 rounded-xl bg-purple-100 border border-purple-200'
                                        >

                                            {/* OPEN ROADMAP BUTTON */}
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    getRoadmapById(h._id);
                                                    setHistoryOpen(false);
                                                }}
                                                className='flex-1 min-w-0 text-left overflow-hidden'
                                            >

                                                <h3 className='text-purple-950 font-semibold truncate'>
                                                    {h.title}
                                                </h3>

                                                <div className='flex justify-between items-center my-1 gap-2'>

                                                    <span className='text-purple-600 text-xs'>
                                                        {h.targetPackage}
                                                    </span>

                                                    <p className='text-xs text-purple-400'>
                                                        {h.duration}
                                                    </p>

                                                </div>

                                                <p className='text-xs text-purple-400 mt-1'>
                                                    {new Date(h.createdAt).toLocaleDateString()}
                                                </p>

                                            </button>


                                            {/* DELETE BUTTON */}
                                            <button
                                                type="button"
                                                disabled={deletingId === h._id}
                                                onClick={() => handleDeleteRoadmap(h._id)}
                                                title="Delete roadmap"
                                                aria-label={`Delete ${h.title}`}
                                                className='flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-lg text-red-500 hover:bg-red-100 hover:text-red-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed'
                                            >

                                                {deletingId === h._id ? (

                                                    <FiZap className="animate-spin" size={16} />

                                                ) : (

                                                    <FiTrash2 size={16} />

                                                )}

                                            </button>

                                        </div>

                                    ))

                                )}

                            </div>

                        </motion.aside>

                    </>

                )}

            </AnimatePresence>

        </div>
    )
}

export default Roadmap

