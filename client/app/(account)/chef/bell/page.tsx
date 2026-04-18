'use client';

import { useState } from "react";


type NotiType = "general" | "urgent" | "order";

interface Notification {
  id: number;
  title: string;
  content: string;
  type: NotiType;
  createdAt: string;
  read: boolean;
}


const mockData: Notification[] = [
  {
    id: 1,
    title: "Khuyến mãi cuối tuần",
    content: "Giảm giá 20% toàn bộ sushi 🍣. Áp dụng cho tất cả khách hàng trong 2 ngày!",
    type: "general",
    createdAt: "10 phút trước",
    read: false,
  },
  {
    id: 2,
    title: "Đơn mới từ Bàn 5",
    content: "Khách vừa đặt 3 món: Sushi cá hồi, Ramen bò và Trà đào.",
    type: "order",
    createdAt: "5 phút trước",
    read: false,
  },
  {
    id: 3,
    title: "Thông báo khẩn",
    content: "Hết nguyên liệu cá hồi! Vui lòng cập nhật menu ngay.",
    type: "urgent",
    createdAt: "2 phút trước",
    read: true,
  },
];


const typeStyle = {
  general: "bg-blue-500/20 text-blue-400",
  urgent: "bg-red-500/20 text-red-400",
  order: "bg-yellow-500/20 text-yellow-400",
};

const typeLabel = {
  general: "Thông báo",
  urgent: "Khẩn cấp",
  order: "Đơn hàng",
};

export default function StaffNotificationPage() {
  const [data, setData] = useState<Notification[]>(mockData);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Notification | null>(null);


  const markRead = (id: number) => {
    setData((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, read: true } : n
      )
    );
  };


  const openModal = (noti: Notification) => {
    markRead(noti.id);
    setSelected(noti);
  };

  const closeModal = () => setSelected(null);


  const filtered = data.filter(
    (n) =>
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 text-white space-y-6">

 
      <h1 className="text-xl font-semibold">
        🔔 Thông báo
      </h1>

      
      <input
        placeholder="Tìm thông báo..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 bg-[#111] border border-white/10 rounded"
      />

      
      <div className="space-y-3 max-h-125 overflow-y-auto">

        {filtered.map((n) => (
          <div
            key={n.id}
            onClick={() => openModal(n)}
            className={`p-4 rounded-xl border cursor-pointer transition
              ${
                n.read
                  ? "bg-white/5 border-white/10"
                  : "bg-linear-to-r from-[#111] to-[#1a1a1a] border-pink-500/30 shadow-lg"
              }
              hover:bg-[#111]
            `}
          >
            <div className="flex justify-between items-center mb-1">
              <span className={`px-2 py-0.5 text-xs rounded ${typeStyle[n.type]}`}>
                {typeLabel[n.type]}
              </span>
              <span className="text-xs text-gray-400">
                {n.createdAt}
              </span>
            </div>

            <div className="font-medium">
              {n.title}
            </div>

            <div className="text-sm text-gray-400 line-clamp-2">
              {n.content}
            </div>

            {!n.read && (
              <div className="text-pink-400 text-xs mt-1 animate-pulse">
                ● Chưa đọc
              </div>
            )}
          </div>
        ))}
      </div>

   
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">

        
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={closeModal}
          />

    
          <div className="relative z-10 w-full max-w-lg bg-[#111] border border-white/10 rounded-xl p-6 animate-fadeIn">

          
            <div className="flex justify-between items-center mb-4">
              <span className={`px-3 py-1 text-xs rounded ${typeStyle[selected.type]}`}>
                {typeLabel[selected.type]}
              </span>

              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

          
            <h2 className="text-lg font-semibold text-pink-400 mb-2">
              {selected.title}
            </h2>

         
            <p className="text-gray-300 leading-relaxed">
              {selected.content}
            </p>

        
            <div className="text-xs text-gray-500 mt-4">
              {selected.createdAt}
            </div>

        
            <button
              onClick={closeModal}
              className="mt-5 w-full py-2 rounded-lg bg-linear-to-r from-pink-500 to-red-500 hover:scale-105 transition"
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
}