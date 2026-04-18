'use client';

import { motion } from "framer-motion";

export default function AboutJapanese() {
  return (
    <div className="bg-[#0b0b0b] text-white min-h-screen overflow-hidden">
      
      <div className="absolute inset-0 opacity-10 bg-[url('/japan-pattern.png')] bg-cover bg-center" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 space-y-20">

        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-6"
        >
          <p className="text-red-500 tracking-widest">
            日本料理 (Japanese Cuisine)
          </p>

          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Tinh hoa ẩm thực <span className="text-red-500">Nhật Bản</span>
          </h1>

          <p className="text-gray-400 max-w-2xl mx-auto">
            Chúng tôi mang đến trải nghiệm ẩm thực chuẩn Nhật với nguyên liệu tươi ngon,
            kỹ thuật chế biến tinh tế và không gian đậm chất truyền thống kết hợp hiện đại.
          </p>
        </motion.div>

      
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <motion.img
            src="/images/ramen.jpg"
            alt="Sushi"
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            className="rounded-2xl shadow-2xl"
          />

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-semibold">
              Nghệ thuật chế biến
            </h2>

            <p className="text-gray-400">
              Mỗi món ăn không chỉ là thực phẩm mà còn là một tác phẩm nghệ thuật.
              Đầu bếp của chúng tôi chú trọng đến từng chi tiết nhỏ nhất để mang lại
              trải nghiệm hoàn hảo.
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                🍣 Sushi tươi
              </div>
              <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                🍜 Ramen chuẩn vị
              </div>
              <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                🥢 Không gian Nhật
              </div>
              <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                🔥 Đầu bếp chuyên nghiệp
              </div>
            </div>
          </motion.div>
        </div>

      
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
        >
          {[
            { number: "100+", label: "Món ăn" },
            { number: "50K+", label: "Khách hàng" },
            { number: "15", label: "Đầu bếp" },
            { number: "10+", label: "Năm kinh nghiệm" },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-linear-to-br from-red-600/20 to-red-800/10 p-6 rounded-2xl border border-red-500/20"
            >
              <h3 className="text-3xl font-bold text-red-500">
                {item.number}
              </h3>
              <p className="text-gray-400 text-sm">{item.label}</p>
            </div>
          ))}
        </motion.div>

        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center max-w-3xl mx-auto"
        >
          <p className="text-xl italic text-gray-300">
            “Ẩm thực Nhật Bản không chỉ là món ăn, mà là sự cân bằng giữa hương vị,
            màu sắc và cảm xúc.”
          </p>
        </motion.div>

        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <button className="px-8 py-3 bg-red-600 hover:bg-red-700 rounded-full transition shadow-lg shadow-red-500/30">
            Đặt bàn ngay
          </button>
        </motion.div>

      </div>
    </div>
  );
}