import React from 'react'
import { motion } from "motion/react";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart, ResponsiveContainer, Tooltip } from 'recharts';

function CustomTooltip({ active, payload }) {
    if (active && payload?.length) {
        return (
            <div className='bg-purple-50 border border-purple-200 rounded-lg px-2.5 py-1.5 text-[11px] text-purple-50 shadow-xl'>
                <p className="text-purple-50 mb-0.5">{payload[0]?.payload?.skill}</p>
                <p className="font-bold text-purple-50">{payload[0]?.value}%</p>
            </div>
        )
    }
    return null;
}

function RadarCard({ title, data, color, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.2 + index * 0.1 }}
            whileHover={{ y: -4 }}
            className='relative overflow-hidden bg-purple-500/90 backdrop-blur-2xl border border-purple-200 rounded-xl p-3 md:p-4 flex flex-col shadow-md hover:border-purple-300 transition-all'
        >
            <div className='absolute inset-0 bg-gradient-to-br from-purple-400/40 via-transparent to-transparent pointer-events-none' />

            <div className='relative'>
                <ResponsiveContainer width="100%" height={180}>
                    <RadarChart data={data} cx="50%" cy="50%" outerRadius="68%">
                        <PolarGrid stroke="rgba(255,255,255,0.7)" gridType="circle" />

                        <PolarAngleAxis
                            dataKey="skill"
                            tick={{ fill: "white", fontSize: 12, fontWeight: 500 }}
                        />

                        <Radar
                            name={title}
                            dataKey="score"
                            stroke={color}
                            fill={color}
                            fillOpacity={0.3}
                            strokeWidth={3}
                            dot={{ r: 2.5, fill: color, strokeWidth: 0 }}
                        />

                        <Tooltip content={<CustomTooltip />} />
                    </RadarChart>
                </ResponsiveContainer>

                <p className='text-purple-50 font-semibold text-xs text-center mt-2'>
                    {title}
                </p>
            </div>
        </motion.div>
    )
}

function InterviewGraph({ technicalData, hrData, technicalCount, hrCount }) {
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4'>
            <RadarCard
                title={`Technical Interviews (${technicalCount})`}
                data={technicalData}
                color="white"
                index={0}
            />

            <RadarCard
                title={`HR Interviews (${hrCount})`}
                data={hrData}
                color="white"
                index={1}
            />
        </div>
    )
}

export default InterviewGraph