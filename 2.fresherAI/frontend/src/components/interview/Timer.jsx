// import React from 'react'
// import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
// import 'react-circular-progressbar/dist/styles.css';
// function Timer({timeLeft, totalTime}) {
//    const percentage = (timeLeft/totalTime)*100
//   return (
//     <div className='w-20 h-20'>
//         <CircularProgressbar
//         value={percentage}
//         text={`${timeLeft}s`}
//         styles={buildStyles({
//             textSize: "28px",
//           pathColor: "#10b981",
//           textColor: "#ef4444",
//           trailColor: "#e5e7eb",
//         })}
//         />
      
//     </div>
//   )
// }

// export default Timer



import React from 'react'
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
function Timer({timeLeft, totalTime}) {
   const percentage = (timeLeft/totalTime)*100
  return (
    <div className='w-20 h-20'>
        <CircularProgressbar
        value={percentage}
        text={`${timeLeft}s`}
        styles={buildStyles({
            textSize: "28px",
          pathColor: "#8b5cf6",
          textColor: "#6d28d9",
          trailColor: "#e9d5ff",
        })}
        />
      
    </div>
  )
}

export default Timer
