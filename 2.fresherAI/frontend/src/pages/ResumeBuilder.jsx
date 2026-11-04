import React, { useState } from 'react'
import ResumeForm from '../components/resume/ResumeForm'
import initialData from '../components/resume/initialData'
import { motion } from "motion/react"
import { FiArrowLeft, FiArrowRight, FiEye } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import PreviewResume from '../components/resume/PreviewResume';
const STEPS = [
  { step: 1, title: "Personal Information", subtitle: "Your basic contact details" },
  { step: 2, title: "Professional Summary", subtitle: "A quick intro about yourself" },
  { step: 3, title: "Skills", subtitle: "Your technical skills" },
  { step: 4, title: "Work Experience", subtitle: "Your past jobs & internships" },
  { step: 5, title: "Projects", subtitle: "Projects you have built" },
  { step: 6, title: "Education", subtitle: "Your academic background" },
];

const TOTAL_STEPS = STEPS.length;

function ResumeBuilder({user , setUser}) {
    const [currentStep,setCurrentStep] = useState(1)
    const [data,setData]= useState(initialData)
    const [showPreview,setShowPreview] = useState(false)
    const navigate = useNavigate()
    const progressPct = ((currentStep)/(TOTAL_STEPS))* 100
    const activeStep = STEPS.find((s)=>s.step === currentStep);
    const goPrev = ()=>{
      if(currentStep > 1){
        setCurrentStep(currentStep -1)
      }
    }

     const goNext = ()=>{
      if(currentStep < TOTAL_STEPS){
        setCurrentStep(currentStep + 1)
      }
    }


    const isLastStep = currentStep === STEPS.length

    if(showPreview){
      return <PreviewResume data={data} user={user} setUser={setUser} onBack={()=>setShowPreview(false)}/>
    }
  return (
    <div className='min-h-screen bg-purple-50 text-purple-950 flex flex-col'>
      <motion.nav 
        initial={{ y: -60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
        className='sticky top-0 z-20 border-b border-purple-200 bg-purple-50/80 backdrop-blur-xl'>
            <div className='mx-auto flex h-12 max-w-7xl items-center justify-between px-3 sm:px-5'>
                <div onClick={()=>navigate("/dashboard")}
                 className='flex cursor-pointer items-center gap-1.5'>
                    <span className='text-sm font-extrabold sm:text-base text-purple-950'>Mirror Interview</span>
                    <span className='hidden rounded bg-purple-100 px-1.5 py-0.5 text-[10px] text-purple-600 sm:block'>Resume Builder</span>
                </div>

                <button onClick={()=>setShowPreview(true)} className='flex h-8 items-center justify-center rounded-lg border border-purple-200 text-purple-600 transition px-2 hover:border-purple-500 hover:text-purple-800'>
                <FiEye size={13}/></button>

            </div>

        </motion.nav>


        {/* main container */}

        <div className='flex-1 px-3 py-4 sm:px-6 sm:py-8'>
          <div className='mx-auto w-full max-w-2xl'>
            <div className='mb-4'>
              <div className='flex items-center justify-between mb-1.5'>
                <p className='text-[10px] text-purple-400 font-medium'>
                STEP {currentStep} OF {TOTAL_STEPS} 
                </p>

                <p className='hidden text-[10px] text-purple-400 sm:block'>
                {Math.round(progressPct)}% complete
                </p>
              </div>

              <div className='w-full h-1 bg-purple-100 rounded-full overflow-hidden'>
              <div className='h-full bg-purple-600 rounded-full transition-all duration-300' style={{width: `${progressPct}%`}} />
              </div>

              <div className='mt-3'>
                <h2 className='text-xl font-bold sm:text-2xl'>{activeStep.title}</h2>
                <p className='mt-1 text-xs text-purple-500 sm:text-sm'>{activeStep.subtitle}</p>
              </div>
            </div>

            <div className='border-t border-purple-200 mb-4'/>
             <ResumeForm step={currentStep} data={data} setData={setData}/>

             <div className='border-t border-purple-200 mt-6 mb-4'/>


             {/* Navigation buttons */}

             <div className='flex items-center justify-between'>
              <button
              onClick={goPrev}
              disabled={currentStep === 1}
               className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium border transition-all
                ${currentStep === 1
                  ? "border-purple-100 text-purple-300 cursor-not-allowed"
                  : "border-purple-200 text-purple-600 hover:border-purple-400 hover:text-purple-900"
                }`}>
                  <FiArrowLeft size={15}/>
                  <span className='hidden sm:block'>Previous</span>

              </button>

              <div className='flex items-center gap-1.5'>
                {STEPS.map((s)=>(
                  <button key={s.step}
                  onClick={()=>setCurrentStep(s.step)}
                   className={`rounded-full transition-all ${s.step === currentStep
                    ? "w-4 h-1.5 bg-purple-600"
                    : s.step < currentStep
                      ? "w-1.5 h-1.5 bg-purple-400"
                      : "w-1.5 h-1.5 bg-purple-200"
                    }`}/>
                ))}
              </div>

              {isLastStep ? (
                <button onClick={()=>setShowPreview(true)} className='flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-purple-600 backdrop-blur-2xl border border-purple-300 text-white shadow-[0_8px_24px_rgba(139,92,246,0.25)] hover:bg-purple-700 transition-all'>
                  <FiEye size={13}/>
                  <span className='hidden sm:block'>Preview Resume</span>
                </button>
              ):(
              <button onClick={goNext} className='flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-purple-600 backdrop-blur-2xl border border-purple-300 text-white shadow-[0_8px_24px_rgba(139,92,246,0.25)] hover:bg-purple-700 transition-all'>
                  <span className='hidden sm:block'>Next</span><FiArrowRight size={15}/></button>
              )}
             </div>
          </div>
        </div>

     

    </div>
  )
}

export default ResumeBuilder
