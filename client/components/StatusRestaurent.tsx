'use client';

import { motion } from 'framer-motion';
import CountUp from 'react-countup';

const stats = [
    { value: "100", label: "Món ăn" },
    { value: "50", label: "Khách hàng" },
    { value: "15", label: "Đầu bếp" },
    { value: "10", label: "Năm kinh nghiệm" },
];

export default function StatsRestaurent() {
    return (
        <section className="bg-[#0b0b0b] py-20 text-white">
            <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-10 text-center">

                {stats.map((item, i) => (
                    <motion.div
                        key={i}
                        whileHover={{ scale: 1.05 }}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.2 }}
                        className="relative group"
                    >
                       
                        <div className="absolute inset-0 blur-xl opacity-0 group-hover:opacity-100 transition bg-red-500/10 rounded-2xl" />

                       
                        <p className="text-3xl md:text-4xl font-semibold text-white">
                            <CountUp end={+item?.value} duration={10} /> {item?.value === "15" ? "" : item?.value === "50" ? "K+" : "+"}
                        </p>

                       
                        <div className="w-10 h-0.5 bg-red-500 mx-auto my-3 opacity-70" />

                       
                        <p className="text-gray-400 text-sm tracking-wide">
                            {item.label}
                        </p>
                    </motion.div>
                ))}

            </div>
        </section>
    );
}