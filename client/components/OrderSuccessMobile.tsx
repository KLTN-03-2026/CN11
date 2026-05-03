"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
  total: number;
  orderId: string;
  onBackHome: () => void;
};

export default function OrderSuccessMobile({
  total,
  orderId,
  onBackHome,
}: Props) {
  const [show, setShow] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => setShow(true), 200);
  }, []);

  return (
    <div className="min-h-screen bg-black flex justify-center">
      {/* Container mobile */}
      <div className="w-full max-w-105 text-white flex flex-col items-center justify-center px-4">

        {/* Circle animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 120 }}
          className="w-24 h-24 rounded-full bg-green-500/20 flex items-center justify-center mb-6 shadow-lg shadow-green-500/20"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="text-green-400 text-5xl"
          >
            ✓
          </motion.div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: show ? 1 : 0, y: show ? 0 : 20 }}
          className="text-xl font-semibold mb-2 text-center"
        >
          Đặt đơn thành công 🎉
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: show ? 1 : 0 }}
          className="text-gray-400 text-sm text-center mb-6"
        >
          Nhà hàng đang chuẩn bị món ăn cho bạn
        </motion.p>

        {/* Card info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: show ? 1 : 0, y: show ? 0 : 30 }}
          className="w-full bg-[#111827] border border-gray-700 rounded-2xl p-4 mb-6"
        >
          <div className="flex justify-between mb-2">
            <span className="text-gray-400 text-sm">Mã đơn</span>
            <span className="font-medium">#{orderId}</span>
          </div>

          <div className="flex justify-between mb-2">
            <span className="text-gray-400 text-sm">Nhận tại</span>
            <span className="text-green-400 text-sm">
              🏪 Tại cửa hàng
            </span>
          </div>

          <div className="flex justify-between mb-2">
            <span className="text-gray-400 text-sm">Thời gian</span>
            <span className="text-sm">~ 15 - 20 phút</span>
          </div>

          <div className="flex justify-between mt-3 pt-3 border-t border-gray-700 font-semibold">
            <span>Tổng thanh toán</span>
            <span className="text-red-400">
              {total.toLocaleString()}đ
            </span>
          </div>
        </motion.div>

        {/* Progress fake */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: show ? 1 : 0 }}
          className="w-full mb-6"
        >
          <p className="text-gray-400 text-sm mb-2">
            Trạng thái đơn hàng
          </p>

          <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: "20%" }}
              animate={{ width: "60%" }}
              transition={{ duration: 2 }}
              className="bg-green-500 h-full"
            />
          </div>

          <p className="text-xs text-gray-400 mt-2">
            Đang chuẩn bị món...
          </p>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: show ? 1 : 0, y: show ? 0 : 30 }}
          className="w-full flex flex-col gap-3"
        >
          <button
            onClick={onBackHome}
            className="w-full py-3 rounded-xl cursor-pointer bg-linear-to-r from-red-500 to-red-600 text-white font-semibold shadow-lg"
          >
            Quay lại menu
          </button>

          <button onClick={()=>router.push("/tracking/"+total)} className="w-full py-3 cursor-pointer rounded-xl bg-gray-800 text-gray-300 hover:bg-gray-700">
            Theo dõi đơn hàng
          </button>
        </motion.div>
      </div>
    </div>
  );
}