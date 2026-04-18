'use client';

import { FC } from "react";
import { motion } from "framer-motion";
import { Gift, Star, TrendingUp } from "lucide-react";

type RewardHistory = {
  id: string;
  type: "earn" | "redeem";
  points: number;
  description: string;
  date: string;
};

const historyMock: RewardHistory[] = [
  {
    id: "1",
    type: "earn",
    points: 50,
    description: "Ăn tối tại nhà hàng",
    date: "2026-03-15",
  },
  {
    id: "2",
    type: "redeem",
    points: 100,
    description: "Đổi voucher 50k",
    date: "2026-03-14",
  },
  {
    id: "3",
    type: "earn",
    points: 30,
    description: "Đặt bàn online",
    date: "2026-03-13",
  },
];

const totalPoints = 280;
const nextLevel = 500;
const progress = (totalPoints / nextLevel) * 100;

const RewardsPage: FC = () => {
  return (
    <div className="space-y-6">

      <h2 className="text-xl font-semibold">Điểm thưởng của tôi</h2>
     
      <div className="grid md:grid-cols-2 gap-4">

       
        <div className="p-5 rounded-2xl bg-linear-to-br from-yellow-500/20 to-orange-500/10 border border-white/10">
          <div className="flex items-center gap-2 text-yellow-400 mb-2">
            <Star size={18} />
            <span className="text-sm">Tổng điểm</span>
          </div>

          <p className="text-3xl font-bold">{totalPoints} điểm</p>

          <p className="text-xs text-gray-400 mt-1">
            Tích điểm mỗi lần ăn tại nhà hàng 🍽️
          </p>

         
          <div className="mt-4">
            <div className="flex justify-between text-xs text-gray-400 mb-1">
              <span>Hạng hiện tại: VIP</span>
              <span>{nextLevel} điểm</span>
            </div>

            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1 }}
                className="h-full bg-linear-to-r from-yellow-400 to-orange-400"
              />
            </div>
          </div>
        </div>

        
        <div className="p-5 rounded-2xl bg-[#111] border border-white/10">
          <div className="flex items-center gap-2 text-green-400 mb-3">
            <TrendingUp size={18} />
            <span className="text-sm">Quyền lợi</span>
          </div>

          <ul className="text-sm text-gray-300 space-y-2">
            <li>🎁 Giảm giá 10% mỗi đơn</li>
            <li>🎉 Tặng món miễn phí dịp sinh nhật</li>
            <li>💎 Ưu tiên đặt bàn</li>
          </ul>
        </div>
      </div>

     
      <div className="p-5 rounded-2xl bg-[#111] border border-white/10">
        <h3 className="text-sm mb-3 flex items-center gap-2 text-pink-400">
          <Gift size={16} />
          Đổi quà
        </h3>

        <div className="grid md:grid-cols-3 gap-3">
          {[
            { name: "Voucher 50k", cost: 100 },
            { name: "Voucher 100k", cost: 200 },
            { name: "Combo miễn phí", cost: 500 },
          ].map((reward) => (
            <div
              key={reward.name}
              className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition border border-white/10"
            >
              <p className="text-sm">{reward.name}</p>
              <p className="text-xs text-gray-400 mb-2">
                {reward.cost} điểm
              </p>

              <button className="text-xs px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 transition">
                Đổi ngay
              </button>
            </div>
          ))}
        </div>
      </div>

      
      <div className="p-5 rounded-2xl bg-[#111] border border-white/10">
        <h3 className="text-sm mb-3">Lịch sử điểm</h3>

        <div className="space-y-3">
          {historyMock.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center text-sm border-b border-white/5 pb-2"
            >
              <div>
                <p>{item.description}</p>
                <p className="text-xs text-gray-400">{item.date}</p>
              </div>

              <div
                className={`font-medium ${item.type === "earn"
                    ? "text-green-400"
                    : "text-red-400"
                  }`}
              >
                {item.type === "earn" ? "+" : "-"}
                {item.points}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RewardsPage;