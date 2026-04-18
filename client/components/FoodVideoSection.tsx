'use client';

import { motion } from 'framer-motion';

export default function HeroJapanese() {
  return (
    <section className="relative w-full h-screen overflow-hidden text-white">

      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute w-full h-full object-cover"
      >
        <source src="/videos/gioithieu.mp4" type="video/mp4" />
      </video>

      
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />

     
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-32 bg-red-500/40" />

      
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-red-400 tracking-[0.3em] text-xs mb-4"
        >
          日本料理レストラン
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-5xl font-semibold leading-tight"
        >
          Tinh hoa ẩm thực
          <span className="block text-red-500 mt-2">
            Việt Nam
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-4 text-gray-300 text-sm md:text-base max-w-md"
        >
          Trải nghiệm hơn 100+ món ăn truyền thống & hiện đại,
          chế biến bởi đầu bếp chuẩn vị Việt.
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          className="mt-8 px-6 py-3 bg-red-600 hover:bg-red-700 rounded-full transition shadow-lg shadow-red-500/30"
        >
          🍣 Đặt bàn ngay
        </motion.button>
      </div>
    </section>
  );
}