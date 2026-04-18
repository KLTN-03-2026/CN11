/* eslint-disable react-hooks/purity */
'use client';


import { motion } from "framer-motion";
import Image from "next/image";

const RestaurantIntro = () => {
    return (
        <section className="relative w-full py-24 pt-52 overflow-hidden bg-[#0b0b0b] text-white">

          
            <div className="absolute inset-0 bg-linear-to-br from-black via-[#1a0f0f] to-black opacity-90" />

           
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(12)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-32 h-32 bg-red-500/10 rounded-full blur-3xl"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, -20, 0],
                            opacity: [0.2, 0.4, 0.2],
                        }}
                        transition={{
                            duration: 6,
                            repeat: Infinity,
                            delay: i * 0.5,
                        }}
                    />
                ))}
            </div>

        
            <div className="relative max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

            
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="space-y-6"
                >
                    <p className="text-red-400 tracking-widest text-sm">
                        日本料理 (Japanese Cuisine)
                    </p>

                    <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                        Trải nghiệm ẩm thực Nhật Bản
                        <span className="text-red-500"> tinh tế & đẳng cấp</span>
                    </h2>

                    <p className="text-gray-300 leading-relaxed">
                        Chúng tôi mang đến không gian ẩm thực chuẩn Nhật với nguyên liệu tươi
                        ngon, chế biến bởi đầu bếp giàu kinh nghiệm. Mỗi món ăn là một tác
                        phẩm nghệ thuật, kết hợp giữa hương vị truyền thống và phong cách
                        hiện đại.
                    </p>

                    <div className="flex gap-4">
                        <button className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-xl transition font-medium">
                            Đặt bàn ngay
                        </button>

                        <button className="px-6 py-3 border border-white/20 hover:bg-white/10 rounded-xl transition">
                            Xem thực đơn
                        </button>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="relative"
                >
                  
                    <div className="absolute -inset-4 bg-red-500/10 blur-2xl rounded-3xl" />

                    <div className="relative rounded-3xl overflow-hidden border border-white/10">
                        <Image
                            src="/images/monan.jpg"
                            alt="japanese food"
                            width={1000}
                            height={400}
                            className="w-full h-100 object-cover"
                        />
                    </div>

                 
                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-md px-4 py-3 rounded-xl border border-white/10"
                    >
                        <p className="text-sm text-gray-300">Đầu bếp</p>
                        <p className="font-semibold">Master Sushi Chef</p>
                    </motion.div>
                </motion.div>
            </div>

           
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-linear-to-r from-transparent via-red-500 to-transparent opacity-40" />
        </section>
    );
};

export default RestaurantIntro;