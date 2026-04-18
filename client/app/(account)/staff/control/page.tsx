'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import {
  QrCode,
  Users,
  Utensils,
  DollarSign,
} from "lucide-react";

type Table = {
  id: number;
  name: string;
  guests: number;
  total: number;
};

const tables: Table[] = [
  { id: 1, name: "Bàn 1", guests: 2, total: 200000 },
  { id: 2, name: "Bàn 2", guests: 4, total: 450000 },
  { id: 3, name: "Bàn 3", guests: 3, total: 300000 },
];

export default function StaffDashboard() {
  const [selectedQR, setSelectedQR] = useState<number | null>(null);

  const totalRevenue = tables.reduce((a, b) => a + b.total, 0);
  const totalGuests = tables.reduce((a, b) => a + b.guests, 0);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6 space-y-6">

      
      <h1 className="text-2xl font-bold">🧑‍💼 Staff System</h1>

      
      <div className="grid md:grid-cols-4 gap-6">
        {[
          { label: "Doanh thu", value: totalRevenue, icon: DollarSign },
          { label: "Khách", value: totalGuests, icon: Users },
          { label: "Món bán", value: 120, icon: Utensils },
          { label: "QR bàn", value: tables.length, icon: QrCode },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white/5 border border-white/10 p-5 rounded-2xl flex justify-between"
          >
            <div>
              <p className="text-gray-400 text-sm">{item.label}</p>
              <h2 className="text-xl font-bold">
                {typeof item.value === "number"
                  ? item.value.toLocaleString("vi-VN")
                  : item.value}
              </h2>
            </div>
            <item.icon />
          </div>
        ))}
      </div>

    
      <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
        <h2 className="mb-4 font-semibold">Quản lý bàn & QR</h2>

        <div className="grid md:grid-cols-3 gap-4">
          {tables.map((table) => (
            <motion.div
              key={table.id}
              whileHover={{ scale: 1.03 }}
              className="bg-[#111] p-4 rounded-xl border border-white/10 space-y-3"
            >
              <h3 className="font-semibold">{table.name}</h3>

              <p className="text-sm text-gray-400">
                👥 {table.guests} khách
              </p>

              <p className="text-green-400 font-semibold">
                {table.total.toLocaleString("vi-VN")} đ
              </p>

             
              <button
                onClick={() => setSelectedQR(table.id)}
                className="w-full bg-blue-600 py-1 rounded hover:bg-blue-700 text-sm"
              >
                Tạo QR
              </button>

              
              <button className="w-full bg-green-600 py-1 rounded hover:bg-green-700 text-sm">
                Thanh toán 💳
              </button>
            </motion.div>
          ))}
        </div>
      </div>

     
      {selectedQR && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="bg-white text-black p-6 rounded-2xl text-center space-y-4">
            <h2 className="font-semibold">QR Bàn {selectedQR}</h2>

            <img
              src="/qr-demo.png"
              alt="QR"
              className="w-40 mx-auto"
            />

            <p className="text-sm text-gray-500">
              Khách quét để gọi món
            </p>

            <button
              onClick={() => setSelectedQR(null)}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Đóng
            </button>
          </div>
        </div>
      )}

    </div>
  );
}