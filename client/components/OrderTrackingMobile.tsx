"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

type Status = "pending" | "preparing" | "ready";

type Step = {
  key: Status;
  label: string;
  time: string;
};

type Props = {
  orderId: string;
  total: number;
};

export default function OrderTrackingMobile({
  orderId,
  total,
}: Props) {
  const [status, setStatus] = useState<Status>("pending");
  const router = useRouter();

  // 🔥 Fake realtime
  useEffect(() => {
    const timers = [
      setTimeout(() => setStatus("preparing"), 4000),
      setTimeout(() => setStatus("ready"), 8000),
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  const steps: Step[] = [
    {
      key: "pending",
      label: "Đã nhận đơn",
      time: "Vừa xong",
    },
    {
      key: "preparing",
      label: "Đang chuẩn bị",
      time: "Đang nấu...",
    },
    {
      key: "ready",
      label: "Sẵn sàng nhận",
      time: "Ra quầy lấy",
    },
  ];

  const currentIndex = steps.findIndex((s) => s.key === status);

  return (
    <div className="min-h-screen bg-black flex justify-center">
      <div className="w-full max-w-105 text-white pb-20">

        {/* Header */}
        <div className="p-4 border-b border-gray-800">
          <h1 className="font-semibold">Theo dõi đơn hàng</h1>
          <p className="text-gray-400 text-sm">
            Mã đơn: #{orderId}
          </p>
        </div>

        {/* Status card */}
        <div className="p-4">
          <div className="bg-[#111827] border border-gray-700 rounded-2xl p-4">

            <p className="text-gray-400 text-sm mb-2">
              Trạng thái hiện tại
            </p>

            <motion.p
              key={status}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-green-400 font-semibold"
            >
              {steps[currentIndex].label}
            </motion.p>

            {/* Progress bar */}
            <div className="w-full bg-gray-700 h-2 rounded-full mt-3 overflow-hidden">
              <motion.div
                animate={{
                  width: `${((currentIndex + 1) / steps.length) * 100}%`,
                }}
                transition={{ duration: 0.6 }}
                className="bg-green-500 h-full"
              />
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="px-4 space-y-4">
          {steps.map((step, index) => {
            const isActive = index <= currentIndex;

            return (
              <div key={step.key} className="flex items-start gap-3">
                
                {/* Dot */}
                <div className="flex flex-col items-center">
                  <motion.div
                    animate={{
                      scale: isActive ? 1.2 : 1,
                    }}
                    className={`
                      w-4 h-4 rounded-full
                      ${
                        isActive
                          ? "bg-green-500 shadow-lg shadow-green-500/50"
                          : "bg-gray-600"
                      }
                    `}
                  />

                  {index !== steps.length - 1 && (
                    <div
                      className={`w-0.5 h-10 ${
                        isActive ? "bg-green-500" : "bg-gray-700"
                      }`}
                    />
                  )}
                </div>

                {/* Content */}
                <div>
                  <p
                    className={`text-sm ${
                      isActive ? "text-white" : "text-gray-500"
                    }`}
                  >
                    {step.label}
                  </p>
                  <p className="text-xs text-gray-400">
                    {step.time}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Order info */}
        <div className="p-4">
          <div className="bg-[#111827] border border-gray-700 rounded-2xl p-4">
            <p className="text-gray-400 text-sm mb-2">
              Thông tin đơn
            </p>

            <div className="flex justify-between text-sm mb-1">
              <span>Tổng tiền</span>
              <span className="text-red-400">
                {total.toLocaleString()}đ
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span>Nhận tại</span>
              <span className="text-green-400">
                🏪 Tại cửa hàng
              </span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="fixed bottom-0 left-0 w-full flex justify-center bg-black border-t border-gray-800">
          <div className="w-full max-w-105 p-4">
            <button onClick={()=>router.push("/menu")} className="w-full py-3 rounded-xl cursor-pointer bg-linear-to-r from-red-500 to-red-600 text-white font-semibold shadow-lg">
              Quay lại menu
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}