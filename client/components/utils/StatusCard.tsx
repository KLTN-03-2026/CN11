"use client"

import { motion } from "framer-motion"
import CountUp from "react-countup";

interface StatCardProps {
    title: string
    value: number,
    vnd?: boolean
}

export default function StatusCard({ title, value, vnd }: StatCardProps) {

    return (

        <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6 rounded-xl bg-linear-to-br from-zinc-900 to-zinc-800 border border-zinc-700 shadow-lg"
        >

            <h3 className="text-zinc-400 text-sm">
                {title}
            </h3>

            <p className="text-3xl font-bold mt-2">
                <CountUp end={value} duration={1} /> {vnd && "đ"}
            </p>

        </motion.div>

    )

}