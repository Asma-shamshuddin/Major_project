import React from 'react'
import { motion } from "motion/react"
import { useState } from 'react'
import { FiMenu, FiX } from 'react-icons/fi'
import { GiTwoCoins } from 'react-icons/gi'
import PricingCard from '../components/PricingCard'
import api from '../utils/axios'
import { useNavigate } from 'react-router-dom'

const plan = [
    {
        title: "Free",
        price: "Free",
        coins: 150,
        button: "Claimed Coins",
        popular: false,
        disabled: true,
        features: [
            "150 Interview Coins",
            "Resume Builder",
            "Resume Scorer",
            "Roadmap Generator",
        ],
    },
    {
        title: "Starter",
        price: "199",
        coins: 300,
        button: "Buy Now",
        popular: true,
        disabled: false,
        features: [
            "300 Interview Coins",
            "Unlimited Resume Score",
            "Unlimited Roadmaps",
            "Priority AI Response",
        ],
    },
];

function Billing({ user, setUser }) {
    const [showMenu, setShowMenu] = useState(false)

    const navigate = useNavigate()

    const handlePayment = async (plan) => {
        if (plan.disabled) return;

        try {
            const result = await api.post("/api/billing/create",
                { planId: plan.title.toLowerCase() })

const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;

if (!razorpayKey) {
    throw new Error("Razorpay Key ID is missing from frontend .env");
}

            const options = {
                key: razorpayKey,
                amount: result.data.order.amount,
                currency: result.data.order.currency,
                name: "Mirror Interview",
                description: `${plan.title} - ${plan.coins} Interview Coins`,
                order_id: result.data.order.id,

                handler: async function (response) {
                    try {
                        await api.post("/api/billing/verify", response)

                        const coinRes = await api.post("/api/auth/add-coins", { coins: plan.coins })

                        setUser((prev) => ({
                            ...prev, interviewCoin: coinRes.data.interviewCoin
                        }))

                        alert("Payment Successful 🎉")
                        navigate("/dashboard")

                    } catch (error) {
                        console.log(error);

                        alert(
                            error?.response?.data?.message ||
                            "Payment verification failed"
                        );
                    }
                },

                theme: {
                    color: "#8B5CF6",
                },
            }

            const razorpay = new window.Razorpay(options);
            razorpay.open()

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='min-h-screen bg-purple-50 text-purple-950'>
            <motion.nav
                initial={{ y: -60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className='sticky top-0 z-20 border-b border-purple-200 bg-white/80 backdrop-blur-xl'
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
                            Interview Coins
                        </span>
                    </div>

                    <button
                        onClick={() => setShowMenu(!showMenu)}
                        className='flex h-8 w-8 items-center justify-center rounded-lg border border-purple-200 text-purple-600 transition hover:border-purple-400 hover:text-purple-950'
                    >
                        {showMenu ? <FiX size={16} /> : <FiMenu size={16} />}
                    </button>

                    {showMenu && (
                        <>
                            <div
                                onClick={() => setShowMenu(false)}
                                className='fixed inset-0 z-30 bg-purple-950/20 lg:hidden'
                            />

                            <div className='absolute right-1 top-11 z-40 w-[240px] max-w-[calc(100vw-24px)] rounded-xl overflow-hidden bg-purple-100 backdrop-blur-2xl border border-purple-200 p-3.5 shadow-[0_8px_32px_rgba(139,92,246,0.18)]'>
                                <div className='absolute inset-0 bg-gradient-to-br from-white/70 via-transparent to-purple-200/30 pointer-events-none' />

                                <div className='relative flex items-center gap-2 border-b border-purple-200 pb-3'>
                                    <div className='flex h-9 w-9 items-center justify-center rounded-lg bg-yellow-100 border border-yellow-200'>
                                        <GiTwoCoins className='text-yellow-600 text-sm' />
                                    </div>

                                    <div>
                                        <p className="text-[10px] text-purple-500">
                                            Available Coins
                                        </p>
                                        <h3 className='text-lg font-bold text-purple-950'>
                                            {user?.interviewCoin}
                                        </h3>
                                    </div>
                                </div>

                                <div className='relative mt-3.5 space-y-1.5'>
                                    {[
                                        { title: "Resume Builder", coin: "-10" },
                                        { title: "Resume Scorer", coin: "-10" },
                                        { title: "Roadmap Generator", coin: "-20" },
                                        { title: "AI Interview", coin: "-50" },
                                    ].map((item) => (
                                        <div
                                            key={item.title}
                                            className='flex items-center justify-between rounded-lg bg-white/80 border border-purple-100 px-2.5 py-1.5'
                                        >
                                            <span className="text-xs text-purple-700">
                                                {item.title}
                                            </span>
                                            <span className="text-xs font-bold text-red-500">
                                                {item.coin}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <div className='relative mt-3.5 rounded-lg border border-purple-200 bg-purple-200/50 p-2.5'>
                                    <p className="text-[10px] leading-4 text-purple-700">
                                        Every AI feature uses Interview Coins.
                                        Buy more coins anytime to continue using
                                        Resume Builder, Resume Scorer,
                                        AI Interview and Roadmap Generator.
                                    </p>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </motion.nav>

            <div className='mx-auto max-w-4xl px-4 py-6'>
                <div className='text-center'>
                    <h1 className="text-3xl font-bold text-purple-950">
                        Interview Coins
                    </h1>
                    <p className="mt-2 text-sm text-purple-600">
                        Use coins for Resume Scoring, Resume Builder, AI Interviews, and Roadmap Generation.
                    </p>
                </div>

                <div className='mt-8 grid place-items-center gap-3 md:grid-cols-2'>
                    {plan.map((plan) => (
                        <PricingCard
                            key={plan.title}
                            {...plan}
                            onBuy={() => handlePayment(plan)}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Billing
