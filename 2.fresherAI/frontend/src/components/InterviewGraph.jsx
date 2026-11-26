// import React from 'react'
// import { motion } from "motion/react";
// import { PolarAngleAxis, PolarGrid, Radar, RadarChart, ResponsiveContainer, Tooltip } from 'recharts';

// function CustomTooltip({ active, payload }) {
//     if (active && payload?.length) {
//         return (
//             <div className='bg-purple-50 border border-purple-200 rounded-lg px-2.5 py-1.5 text-[11px] text-purple-50 shadow-xl'>
//                 <p className="text-purple-50 mb-0.5">{payload[0]?.payload?.skill}</p>
//                 <p className="font-bold text-purple-50">{payload[0]?.value}%</p>
//             </div>
//         )
//     }
//     return null;
// }

// function RadarCard({ title, data, color, index }) {
//     return (
//         <motion.div
//             initial={{ opacity: 0, y: 24 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.45, delay: 0.2 + index * 0.1 }}
//             whileHover={{ y: -4 }}
//             className='relative overflow-hidden bg-purple-500/90 backdrop-blur-2xl border border-purple-200 rounded-xl p-3 md:p-4 flex flex-col shadow-md hover:border-purple-300 transition-all'
//         >
//             <div className='absolute inset-0 bg-gradient-to-br from-purple-400/40 via-transparent to-transparent pointer-events-none' />

//             <div className='relative'>
//                 <ResponsiveContainer width="100%" height={180}>
//                     <RadarChart data={data} cx="50%" cy="50%" outerRadius="68%">
//                         <PolarGrid stroke="rgba(255,255,255,0.7)" gridType="circle" />

//                         <PolarAngleAxis
//                             dataKey="skill"
//                             tick={{ fill: "white", fontSize: 12, fontWeight: 500 }}
//                         />

//                         <Radar
//                             name={title}
//                             dataKey="score"
//                             stroke={color}
//                             fill={color}
//                             fillOpacity={0.3}
//                             strokeWidth={3}
//                             dot={{ r: 2.5, fill: color, strokeWidth: 0 }}
//                         />

//                         <Tooltip content={<CustomTooltip />} />
//                     </RadarChart>
//                 </ResponsiveContainer>

//                 <p className='text-purple-50 font-semibold text-xs text-center mt-2'>
//                     {title}
//                 </p>
//             </div>
//         </motion.div>
//     )
// }

// function InterviewGraph({ technicalData, hrData, technicalCount, hrCount }) {
//     return (
//         <div className='grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4'>
//             <RadarCard
//                 title={`Technical Interviews (${technicalCount})`}
//                 data={technicalData}
//                 color="white"
//                 index={0}
//             />

//             <RadarCard
//                 title={`HR Interviews (${hrCount})`}
//                 data={hrData}
//                 color="white"
//                 index={1}
//             />
//         </div>
//     )
// }

// export default InterviewGraph



import React from 'react'
import { motion, useReducedMotion } from "motion/react";
import { Bar, BarChart, CartesianGrid, Cell, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

function CustomTooltip({ active, payload }) {
    if (active && payload?.length) {
        return (
            <div className='bg-white border border-purple-200 rounded-lg px-2.5 py-1.5 text-[11px] text-slate-900 shadow-xl'>
                <p className='mb-0.5'>{payload[0]?.payload?.skill}</p>
                <p className='font-bold'>{payload[0]?.value}%</p>
            </div>
        )
    }
    return null;
}

function WrappedTick({ x, y, payload }) {
    const words = String(payload.value).split(' ');
    return (
        <text x={x} y={y + 8} textAnchor='middle' fill='#4c1d95' fontSize={9} fontWeight={700}>
            {words.map((w, i) => (
                <tspan key={i} x={x} dy={i === 0 ? 0 : 11}>
                    {w.toUpperCase()}
                </tspan>
            ))}
        </text>
    );
}

function ChartCard({ title, data, index }) {
    const reduce = useReducedMotion();

    return (
        <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.2 + index * 0.1 }}
            whileHover={reduce ? undefined : { y: -4 }}
            className='relative overflow-hidden bg-white border border-purple-200 rounded-2xl p-4 md:p-5 shadow-md hover:shadow-lg transition-shadow'
        >
            <p className='text-slate-900 font-bold text-xs mb-3'>{title}</p>

            <ResponsiveContainer width="100%" height={260}>
                <BarChart data={data} margin={{ top: 16, right: 8, left: -12, bottom: 0 }} barCategoryGap="28%">
                    <defs>
                       <linearGradient id={`bar-grad-${index}`} x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stopColor="#c084fc" />
    <stop offset="100%" stopColor="#6b21a8" />
</linearGradient>
                    </defs>

                    <CartesianGrid vertical={false} stroke="#e9d5ff" />

                   <XAxis
    dataKey="skill"
    tick={<WrappedTick />}
    tickLine={false}
    axisLine={{ stroke: '#4c1d95', strokeWidth: 2 }}
    interval={0}
    height={48}
/>

                    <YAxis
                        domain={[0, 100]}
                        ticks={[0, 20, 40, 60, 80, 100]}
                        tick={{ fill: '#4c1d95', fontSize: 11, fontWeight: 700 }}
                        tickLine={false}
                        axisLine={{ stroke: '#4c1d95', strokeWidth: 2 }}
                    />

                    <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(168,85,247,0.08)' }} />

                    <Bar
                        dataKey="score"
                        fill={`url(#bar-grad-${index})`}
                        radius={[6, 6, 0, 0]}
                        maxBarSize={44}
                        isAnimationActive={!reduce}
                        animationDuration={900}
                    >
                        <LabelList dataKey="score" position="top" fill="#4c1d95" fontSize={10} fontWeight={700} />
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </motion.div>
    )
}

function InterviewGraph({ technicalData, hrData, technicalCount, hrCount }) {
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4'>
            <ChartCard
                title={`Technical Interviews (${technicalCount})`}
                data={technicalData}
                index={0}
            />

            <ChartCard
                title={`HR Interviews (${hrCount})`}
                data={hrData}
                index={1}
            />
        </div>
    )
}

export default InterviewGraph