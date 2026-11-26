// import React from 'react'
// import { motion } from "motion/react"
// import { GiArtificialHive } from "react-icons/gi";
// import { FaArrowRight } from "react-icons/fa6";
// import LoginModel from '../components/LoginModel';
// import { useState } from 'react';
// //import dashboard from "../assets/image.png"
// import { FiMic, FiFileText, FiBarChart2, FiMap } from "react-icons/fi";

// function Home({ setUser }) {
//     const [showLogin, setShowLogin] = useState(false)

//     return (
//         <div className='bg-purple-50 text-purple-950 font-sans min-h-screen overflow-x-hidden'>

//             {/* navbar */}

//             <motion.nav
//                 initial={{ y: -60, opacity: 0 }}
//                 animate={{ y: 0, opacity: 1 }}
//                 transition={{ duration: 0.5, ease: "easeOut" }}
//                 className='fixed top-0 left-0 right-0 z-50 h-[52px] flex items-center justify-between px-5 bg-white/80 backdrop-blur-xl border-b border-purple-200'>

//                 <div className='flex items-center gap-2'>

//                     <div className='w-7 h-7 rounded-lg bg-purple-600 flex items-center justify-center shadow-[0_4px_14px_rgba(139,92,246,0.25)]'>
//                         <GiArtificialHive size={15} color='white' />
//                     </div>

//                     <span className='font-extrabold text-base tracking-tight text-purple-950'>Mirror Interview</span>
//                 </div>

//                 <motion.button
//                     onClick={() => setShowLogin(true)}
//                     whileHover={{ scale: 1.04 }}
//                     whileTap={{ scale: 0.97 }}
//                     className='bg-purple-600/90 backdrop-blur-2xl text-white font-semibold border border-purple-300 rounded-md px-3 py-1.5 text-xs cursor-pointer transition-all hover:bg-purple-700 hover:border-purple-400 shadow-[0_8px_24px_rgba(139,92,246,0.25)] flex items-center gap-2'>
//                     Log In <FaArrowRight />
//                 </motion.button>

//             </motion.nav>

//             {/* main area */}

//             <section className='relative pt-20 pb-14 overflow-hidden bg-purple-50'>
//                 <div className='absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-purple-300/30 blur-[90px] pointer-events-none' />

//                 <div className='max-w-4xl mx-auto px-6 text-center'>
//                     <motion.div
//                         initial={{ opacity: 0, y: 16 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.5, delay: 0.05 }}
//                         className='inline-flex items-center px-3 py-1.5 rounded-full border border-purple-200 bg-purple-100 text-purple-700 text-xs font-medium mb-4'>
//                         Multi-Agent Interview Platform
//                     </motion.div>

//                     <motion.h1
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.55, delay: 0.12 }}
//                         className='text-3xl md:text-5xl font-extrabold leading-[1.1] tracking-tight mb-4 text-purple-950'>
//                         Job Interviews<br />
//                         <span className="text-purple-400">
//                             Don't Have to Suck
//                         </span><br />
//                         Anymore!
//                     </motion.h1>

//                     <motion.p
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.55, delay: 0.2 }}
//                         className='text-purple-600 text-sm leading-relaxed max-w-md mx-auto mb-6'>
//                         Mirror Interview is an innovative AI-powered interview preparation platform
//                         designed to help job seekers excel in their interviews.
//                     </motion.p>

//                     <motion.div
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.55, delay: 0.28 }}>

//                         <motion.button
//                             onClick={() => setShowLogin(true)}
//                             whileHover={{ scale: 1.05, boxShadow: "0 0 36px rgba(139,92,246,0.3)" }}
//                             whileTap={{ scale: 0.97 }}
//                             className='relative gap-2 overflow-hidden bg-purple-600/90 backdrop-blur-2xl text-white font-bold px-5 py-2.5 rounded-lg text-xs cursor-pointer border border-purple-300 shadow-[0_8px_32px_rgba(139,92,246,0.25)] transition-all hover:bg-purple-700 hover:border-purple-400'>
//                             <span className='flex items-center justify-center gap-2'> Get Started For Free <FaArrowRight /></span>
//                             <span className='absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent pointer-events-none rounded-lg' />
//                         </motion.button>
//                     </motion.div>
//                 </div>

//                 <motion.div
//                     initial={{ opacity: 0, y: 30 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     whileHover={{ y: -10, scale: 1.02 }}
//                     transition={{ duration: 0.7, delay: 0.3 }}
//                     className='mt-10 rounded-lg overflow-hidden shadow-[0_0_60px_rgba(139,92,246,0.12)] max-w-2xl mx-auto'>

//                     {/* <img src={dashboard} alt='dashboard img' className='w-full h-auto object-cover block' /> */}

//                 </motion.div>

//             </section>

//             {/* Agents */}

//             <section className='py-16 bg-purple-50'>
//                 <div className='max-w-5xl mx-auto px-6'>
//                     <div className='text-center mb-10'>
//                         <div className='inline-flex items-center px-3 py-1.5 rounded-full border border-purple-200 bg-purple-100 text-purple-700 text-xs font-medium mb-4'>
//                             AI Powered Agents
//                         </div>

//                         <h2 className='text-2xl md:text-4xl font-extrabold tracking-tight text-purple-950'>
//                             Specialized Agents For
//                             <span className="block text-purple-400">
//                                 Every Interview Stage
//                             </span>
//                         </h2>

//                         <p className='text-purple-600 text-sm max-w-2xl mx-auto mt-4 leading-relaxed'>
//                             Mirror Interview combines multiple AI agents that work together
//                             to help you build your resume, practice interviews,
//                             receive detailed feedback, and follow a personalized roadmap
//                             to land your dream job.
//                         </p>
//                     </div>

//                     <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-4'>
//                         {
//                             [
//                                 {
//                                     icon: <FiFileText />,
//                                     title: "Resume Agent",
//                                     desc: "Create ATS-friendly resumes, improve profile strength and maximize interview opportunities.",
//                                 },
//                                 {
//                                     icon: <FiMic />,
//                                     title: "Interview Agent",
//                                     desc: "Conduct realistic HR, Technical and Coding interviews with AI-powered simulations.",
//                                 },
//                                 {
//                                     icon: <FiBarChart2 />,
//                                     title: "Feedback Agent",
//                                     desc: "Get detailed answer analysis, scoring reports and improvement recommendations.",
//                                 },
//                                 {
//                                     icon: <FiMap />,
//                                     title: "Roadmap Agent",
//                                     desc: "Generate personalized learning roadmaps based on goals, skills and performance.",
//                                 },
//                             ].map((agent, i) => (
//                                 <motion.div
//                                     key={i}
//                                     initial={{ opacity: 0, y: 24 }}
//                                     whileInView={{ opacity: 1, y: 0 }}
//                                     viewport={{ once: true }}
//                                     transition={{ duration: 0.45, delay: i * 0.08 }}
//                                     whileHover={{ y: -10, scale: 1.02 }}
//                                     className='group relative overflow-hidden bg-purple-100/90 backdrop-blur-2xl border border-purple-200 rounded-2xl p-5 shadow-[0_8px_32px_rgba(139,92,246,0.10)] hover:shadow-[0_16px_48px_rgba(139,92,246,0.20)] hover:border-purple-300 transition-all'>

//                                     <div className='absolute inset-0 bg-gradient-to-br from-white/70 via-transparent to-purple-200/30 pointer-events-none' />

//                                     <div className='absolute -top-10 -right-10 w-32 h-32 bg-purple-300/50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500' />

//                                     <div className='relative'>
//                                         <div className='w-11 h-11 rounded-xl bg-purple-200 border border-purple-300 flex items-center justify-center text-purple-700 text-lg mb-4 shadow-inner'>
//                                             {agent.icon}
//                                         </div>

//                                         <h2 className='text-base font-bold mb-2 text-purple-950'>
//                                             {agent.title}
//                                         </h2>

//                                         <p className='text-purple-600 text-xs leading-relaxed'>
//                                             {agent.desc}
//                                         </p>
//                                     </div>

//                                 </motion.div>
//                             ))
//                         }
//                     </div>
//                 </div>
//             </section>

//             {showLogin && <LoginModel onClose={() => setShowLogin(false)} setUser={setUser} />}

//             <footer className='border-t border-purple-200 py-6 text-center bg-white'>
//                 <div className='flex items-center justify-center gap-2 mb-1.5'>
//                     <div className='w-5 h-5 rounded-md bg-purple-600 flex items-center justify-center'>
//                         <GiArtificialHive size={11} color='white' />
//                     </div>

//                     <span className='font-bold text-xs text-purple-700'>Mirror Interview</span>
//                 </div>

//                 <div className='text-purple-500 text-xs'>
//                     © {new Date().getFullYear()} Mirror Iterview · All rights reserved
//                 </div>
//             </footer>

//         </div>
//     )
// }

// export default Home



import React, { useState } from 'react'
import { motion, useReducedMotion } from "motion/react"
import { GiArtificialHive } from "react-icons/gi";
import { FaArrowRight, FaGithub, FaLinkedinIn, FaInstagram, FaXTwitter, FaEnvelope } from "react-icons/fa6";
import { FiMic, FiFileText, FiBarChart2, FiMap, FiUpload, FiCheckCircle, FiTarget } from "react-icons/fi";
import LoginModel from '../components/LoginModel';
import interviewShot from "../assets/interview.png";
import scorerShot from "../assets/resume-scorer.png";

const agents = [
    {
        icon: <FiFileText />,
        title: "Resume Agent",
        desc: "Build an ATS-friendly resume and see exactly what to improve.",
        points: ["Step-by-step resume builder", "ATS score and keyword gaps", "Actionable fixes for each section"],
    },
    {
        icon: <FiMic />,
        title: "Interview Agent",
        desc: "Practice realistic HR and technical interviews tailored to your resume.",
        points: ["Questions based on your projects", "Voice or text answers", "Timed, live interview flow"],
    },
    {
        icon: <FiBarChart2 />,
        title: "Feedback Agent",
        desc: "Know where you stand after every answer.",
        points: ["Scores for correctness and clarity", "Strengths and weaknesses", "Specific improvement tips"],
    },
    {
        icon: <FiMap />,
        title: "Roadmap Agent",
        desc: "Get a learning plan toward your target role and salary.",
        points: ["Modules ordered by difficulty", "Time estimates per topic", "Built around your current skills"],
    },
];

const steps = [
    { icon: <FiUpload />, title: "Upload your resume", desc: "Start with your current resume or build one in minutes." },
    { icon: <FiCheckCircle />, title: "Get it scored", desc: "See your ATS score, missing skills, and fixes." },
    { icon: <FiTarget />, title: "Practice interviews", desc: "Answer questions tailored to your resume and role." },
    { icon: <FiMap />, title: "Follow your roadmap", desc: "Work through a plan that closes the gaps." },
];

const socials = [
    { icon: <FaGithub />, label: "GitHub", href: "https://github.com/your-username" },
    { icon: <FaLinkedinIn />, label: "LinkedIn", href: "https://linkedin.com/in/your-username" },
    { icon: <FaInstagram />, label: "Instagram", href: "https://instagram.com/your-username" },
    { icon: <FaXTwitter />, label: "X", href: "https://x.com/your-username" },
    { icon: <FaEnvelope />, label: "Email", href: "mailto:you@example.com" },
];

const footerLinks = {
    Product: ["Resume Builder", "Resume Scorer", "Roadmap Builder", "AI Interview"],
    Resources: ["How it works", "Features", "FAQ"],
    Company: ["About", "Contact", "Privacy Policy", "Terms of Service"],
};

const pill = 'inline-flex items-center px-3 py-1.5 rounded-full border border-purple-200 bg-white text-purple-700 text-xs font-medium mb-4';




const floaters = [
    { Icon: FiMic, left: '5%', top: '20%', size: 26, delay: 0 },
    { Icon: FiFileText, left: '86%', top: '22%', size: 28, delay: 1 },
    { Icon: FiMap, left: '8%', top: '68%', size: 24, delay: 2 },
    { Icon: FiBarChart2, left: '88%', top: '70%', size: 26, delay: 0.5 },
];

function FloatingDecor({ reduce }) {
    return (
        <div className='absolute inset-0 pointer-events-none overflow-hidden' aria-hidden='true'>
            <motion.div
                animate={reduce ? undefined : { x: [0, 30, 0], y: [0, -20, 0] }}
                transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
                className='absolute -top-16 -left-16 w-80 h-80 rounded-full bg-fuchsia-300/35 blur-3xl' />
            <motion.div
                animate={reduce ? undefined : { x: [0, -25, 0], y: [0, 25, 0] }}
                transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
                className='absolute -bottom-20 -right-16 w-96 h-96 rounded-full bg-fuchsia-300/35 blur-3xl' />

            {floaters.map(({ Icon, left, top, size, delay }, i) => (
                <motion.div
                    key={i}
                    animate={reduce ? undefined : { y: [0, -14, 0], rotate: [0, 8, 0] }}
                    transition={{ duration: 5 + i, repeat: Infinity, ease: 'easeInOut', delay }}
                    style={{ left, top }}
                    className='absolute text-purple-500/90'>
                    <Icon size={size} />
                </motion.div>
            ))}
        </div>
    )
}

function Home({ setUser }) {
    const [showLogin, setShowLogin] = useState(false)
    const reduce = useReducedMotion()

    // Helpers: skip transforms entirely when the user prefers reduced motion
    const fadeUp = (delay = 0, y = 24) => ({
        initial: reduce ? false : { opacity: 0, y },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.3 },
        transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] },
    })

    return (
        <div className='bg-purple-50 text-purple-950 font-sans min-h-screen overflow-x-hidden'>

            {/* navbar */}
            <motion.nav
                initial={{ y: -60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className='fixed top-0 left-0 right-0 z-50 h-[52px] flex items-center justify-between px-5 bg-white/90 backdrop-blur-xl border-b border-purple-200'>

                <div className='flex items-center gap-2'>
                    <div className='w-7 h-7 rounded-lg bg-purple-600 flex items-center justify-center'>
                        <GiArtificialHive size={15} color='white' />
                    </div>
                    <span className='font-extrabold text-base tracking-tight text-purple-950'>Mirror Interview</span>
                </div>

                <motion.button
                    onClick={() => setShowLogin(true)}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className='bg-purple-600 text-white font-semibold rounded-md px-3 py-1.5 text-xs cursor-pointer hover:bg-purple-700 transition-colors flex items-center gap-2'>
                    Log In <FaArrowRight />
                </motion.button>
            </motion.nav>

            {/* hero */}
           {/* hero */}
<section className='relative pt-28 pb-16 overflow-hidden'>
    <motion.div
        animate={reduce ? undefined : { scale: [1, 1.08, 1], opacity: [0.6, 0.8, 0.6] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className='absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-purple-200/60 blur-[100px] pointer-events-none' />

    <FloatingDecor reduce={reduce} />

    <div className='relative max-w-4xl mx-auto px-6 text-center'>
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.05 }}
                        className={pill}>
                        Multi-Agent Interview Platform
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.55, delay: 0.12 }}
                        className='text-3xl md:text-5xl font-extrabold leading-[1.1] tracking-tight mb-4 text-purple-950'>
                        Job Interviews<br />
                        <span className='text-purple-500'>Don't Have to Suck</span><br />
                        Anymore!
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.55, delay: 0.2 }}
                        className='text-purple-700 text-sm md:text-base leading-relaxed max-w-lg mx-auto mb-8'>
                        Score your resume, practice AI interviews tailored to it, and follow a roadmap
                        to your target role. Stop guessing, start practicing.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.55, delay: 0.28 }}
                        className='flex items-center justify-center gap-3'>

                        <motion.button
                            onClick={() => setShowLogin(true)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.97 }}
                            className='bg-purple-600 text-white font-bold px-5 py-2.5 rounded-lg text-xs cursor-pointer shadow-[0_8px_24px_rgba(124,58,237,0.3)] hover:bg-purple-700 transition-colors flex items-center gap-2'>
                            Get Started For Free <FaArrowRight />
                        </motion.button>

                        <a
                            href='#how-it-works'
                            className='px-5 py-2.5 rounded-lg text-xs font-semibold text-purple-700 border border-purple-300 bg-white hover:bg-purple-100 transition-colors'>
                            See how it works
                        </a>
                    </motion.div>
                </div>

                {/* product preview */}
                <motion.div
                    initial={reduce ? false : { opacity: 0, y: 40, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={reduce ? undefined : { y: -8, scale: 1.01 }}
                    className='relative mt-14 max-w-4xl mx-auto px-6'>
                    <div className='rounded-2xl overflow-hidden border border-purple-200 bg-white shadow-[0_24px_80px_rgba(124,58,237,0.15)] hover:shadow-[0_32px_90px_rgba(124,58,237,0.25)] transition-shadow duration-500'>
                        <img
                            src={interviewShot}
                            alt='Mirror Interview live AI interview screen'
                            className='w-full h-auto block'
                        />
                    </div>
                </motion.div>
            </section>

            {/* agents */}
            {/* agents */}
<section id='features' className='relative py-16 bg-white border-y border-purple-200 overflow-hidden'>
    <FloatingDecor reduce={reduce} />

    <div className='relative max-w-5xl mx-auto px-6'>
        <motion.div {...fadeUp(0, 16)} className='text-center mb-10'>
            <div className={pill}>AI Powered Agents</div>

            <h2 className='text-2xl md:text-4xl font-extrabold tracking-tight text-purple-950'>
                Four Agents. One Goal.
                <span className='block text-purple-500'>Your Offer Letter.</span>
            </h2>

            <p className='text-purple-700 text-sm max-w-2xl mx-auto mt-4 leading-relaxed'>
                Each agent handles one stage of the hiring process, and they share what they learn about you.
            </p>
        </motion.div>

        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-4'>
            {agents.map((agent, i) => (
                <motion.div
                    key={agent.title}
                    {...fadeUp(i * 0.1)}
                    whileHover={reduce ? undefined : { y: -8, rotateX: 3, rotateY: -3 }}
                    style={{ transformPerspective: 900 }}
                    className='group bg-white/90 backdrop-blur-sm border border-purple-200 rounded-2xl p-5 shadow-[0_4px_18px_rgba(124,58,237,0.06)] hover:shadow-[0_20px_44px_rgba(124,58,237,0.18)] hover:border-purple-300 transition-[box-shadow,border-color] duration-300'>

                    <motion.div
                        whileHover={reduce ? undefined : { rotate: [0, -8, 8, 0], scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                        className='w-11 h-11 rounded-xl bg-purple-600 flex items-center justify-center text-white text-lg mb-4'>
                        {agent.icon}
                    </motion.div>

                    <h3 className='text-base font-bold mb-2 text-purple-950'>{agent.title}</h3>

                    <p className='text-purple-700 text-xs leading-relaxed mb-4'>{agent.desc}</p>

                    <ul className='space-y-2'>
                        {agent.points.map((p, j) => (
                            <motion.li
                                key={p}
                                initial={reduce ? false : { opacity: 0, x: -8 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.35, delay: 0.3 + i * 0.1 + j * 0.08 }}
                                className='flex items-start gap-2 text-xs text-purple-900'>
                                <FiCheckCircle className='mt-0.5 text-purple-500 shrink-0' />
                                {p}
                            </motion.li>
                        ))}
                    </ul>
                </motion.div>
            ))}
        </div>
    </div>
</section>

           {/* how it works */}
<section id='how-it-works' className='relative py-16 scroll-mt-16 overflow-hidden'>
    <FloatingDecor reduce={reduce} />

    <div className='relative max-w-5xl mx-auto px-6'>
        <motion.div {...fadeUp(0, 16)} className='text-center mb-12'>
            <div className={pill}>Step by Step</div>
            <h2 className='text-2xl md:text-3xl font-extrabold tracking-tight text-purple-950'>
                How it works
            </h2>
            <p className='text-purple-700 text-sm mt-3'>Four steps from resume to interview-ready.</p>
        </motion.div>

        <div className='relative grid md:grid-cols-4 gap-6'>
            {/* dashed connector line, desktop only */}
            <div className='hidden md:block absolute top-6 left-[12.5%] right-[12.5%] border-t-2 border-dashed border-purple-300 pointer-events-none' />

            {steps.map((step, i) => (
                <motion.div
                    key={step.title}
                    {...fadeUp(i * 0.12)}
                    whileHover={reduce ? undefined : { y: -6 }}
                    className='relative text-center bg-white/80 backdrop-blur-sm border border-purple-200 rounded-2xl p-5 hover:shadow-[0_16px_40px_rgba(124,58,237,0.15)] transition-shadow duration-300'>

                    <motion.div
                        whileHover={reduce ? undefined : { scale: 1.12, rotate: 6 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                        className='relative mx-auto w-12 h-12 rounded-full bg-purple-600 text-white flex items-center justify-center text-lg mb-4 shadow-[0_8px_20px_rgba(124,58,237,0.25)]'>
                        {step.icon}
                        {!reduce && (
                            <motion.span
                                aria-hidden='true'
                                animate={{ scale: [1, 1.6], opacity: [0.5, 0] }}
                                transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.6, ease: 'easeOut' }}
                                className='absolute inset-0 rounded-full bg-purple-400' />
                        )}
                    </motion.div>

                    <div className='text-[10px] font-bold tracking-widest text-purple-500 mb-1'>
                        STEP {i + 1}
                    </div>
                    <h3 className='font-bold text-sm text-purple-950 mb-1'>{step.title}</h3>
                    <p className='text-xs text-purple-700 leading-relaxed'>{step.desc}</p>
                </motion.div>
            ))}
        </div>
    </div>
</section>

          {/* resume scorer showcase */}
<section className='relative py-16 bg-white border-y border-purple-200 overflow-hidden'>
    <div className='absolute inset-0 opacity-40 pointer-events-none bg-[radial-gradient(#e9d5ff_1px,transparent_1px)] [background-size:22px_22px]' />
    <FloatingDecor reduce={reduce} />

    <div className='relative max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center'>
        <motion.div {...fadeUp(0, 16)}>
            <div className={pill}>Resume Scorer</div>
            <h2 className='text-2xl md:text-3xl font-extrabold tracking-tight text-purple-950 mb-3'>
                Know exactly why your resume isn't getting callbacks
            </h2>
            <p className='text-purple-700 text-sm leading-relaxed mb-5'>
                Get an ATS score, your strengths and weaknesses, the skills recruiters
                look for that you're missing, and prioritized fixes.
            </p>
            <motion.button
                onClick={() => setShowLogin(true)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className='bg-purple-950 text-white font-bold px-4 py-2 rounded-lg text-xs cursor-pointer hover:bg-purple-900 transition-colors'>
                Score my resume
            </motion.button>
        </motion.div>

        <motion.div
            initial={reduce ? false : { opacity: 0, x: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            whileHover={reduce ? undefined : { y: -6, scale: 1.02 }}
            className='rounded-2xl overflow-hidden border border-purple-200 bg-white shadow-[0_16px_60px_rgba(124,58,237,0.12)] hover:shadow-[0_24px_70px_rgba(124,58,237,0.22)] transition-shadow duration-500'>
            <img src={scorerShot} alt='Resume scorer showing ATS score and recommendations' className='w-full h-auto block' />
        </motion.div>
    </div>
</section>
            {/* quote band */}
            {/* quote band */}
<section className='relative py-12 bg-gradient-to-r from-purple-100 via-white to-fuchsia-100 border-y border-purple-200 overflow-hidden'>
    <FloatingDecor reduce={reduce} />
    <motion.div
        initial={reduce ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className='relative max-w-3xl mx-auto px-6 text-center'>
        <p className='text-xl md:text-3xl font-extrabold leading-snug text-purple-950'>
            &ldquo;Confidence isn't found in the interview room.{' '}
            <span className='text-purple-500'>It's built in the practice before it.</span>&rdquo;
        </p>
        <div className='mt-4 text-[10px] tracking-widest text-purple-500 font-semibold'>
            MIRROR INTERVIEW
        </div>
    </motion.div>
</section>

            {showLogin && <LoginModel onClose={() => setShowLogin(false)} setUser={setUser} />}

            {/* footer */}
            <footer className='bg-purple-950 text-purple-200'>
                <div className='max-w-6xl mx-auto px-6 pt-14 pb-10 grid gap-10 md:grid-cols-5'>

                    <div className='md:col-span-2'>
                        <div className='flex items-center gap-2 mb-4'>
                            <div className='w-7 h-7 rounded-lg bg-purple-600 flex items-center justify-center'>
                                <GiArtificialHive size={15} color='white' />
                            </div>
                            <span className='font-extrabold text-base text-white'>Mirror Interview</span>
                        </div>
                        <p className='text-xs leading-relaxed text-purple-300 max-w-xs mb-5'>
                            AI-powered interview preparation with resume scoring, live practice interviews,
                            and personalized roadmaps.
                        </p>
                        <div className='flex items-center gap-2'>
                            {socials.map((s) => (
                                <motion.a
                                    key={s.label}
                                    href={s.href}
                                    aria-label={s.label}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    whileHover={reduce ? undefined : { y: -3, scale: 1.08 }}
                                    className='w-8 h-8 rounded-lg bg-purple-900 hover:bg-purple-600 text-purple-200 hover:text-white flex items-center justify-center text-sm transition-colors'>
                                    {s.icon}
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {Object.entries(footerLinks).map(([group, links]) => (
                        <div key={group}>
                            <h4 className='text-xs font-bold tracking-widest text-white uppercase mb-4'>{group}</h4>
                            <ul className='space-y-2.5'>
                                {links.map((link) => (
                                    <li key={link}>
                                        <a href='#' className='text-xs text-purple-300 hover:text-white transition-colors'>
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className='border-t border-purple-900'>
                    <div className='max-w-6xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-purple-400'>
                        <div>© {new Date().getFullYear()} Mirror Interview. All rights reserved.</div>
                        <div>
                            Created by <span className='font-semibold text-white'>Saniya, Asma, Pallavi</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Home