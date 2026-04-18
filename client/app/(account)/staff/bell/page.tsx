'use client';

import { DataBellToUser } from "@/types/data";
import { useEffect, useState } from "react";
import moment from "moment";



export default function StaffNotificationPage() {

  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<DataBellToUser | null>(null);
  const [bells, setBells] = useState<DataBellToUser[]>([]);


  const openModal = async (noti: DataBellToUser) => {
    setSelected(noti);
    const update = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/bell/update-bell/${noti.codeuser}/${noti?.bell?.codebell}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await update?.json();
    if (data?.error === 0) {
      setBells(data?.data);
    }
  };

  const closeModal = () => setSelected(null);
  const filtered = bells?.filter(
    (n) =>
      n?.bell?.title?.toLowerCase().includes(search.toLowerCase()) ||
      n?.bell?.des?.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isLogged = localStorage.getItem("auth");
      if (isLogged) {

        const token = JSON.parse(isLogged)?.token
        const callUserAPI = async () => {
          const responsive = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/get-user`, {
            method: "GET",
            headers: {
              'Conten-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          })
          const data = await responsive?.json();

          if (data?.error === 0) {
            const bell = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/bell/get-bell-to-user/${data?.data?.codeuser}`, {
              method: "GET",
            });

            const bellData = await bell?.json();

            if (bellData?.error === 0) {
              setBells(bellData?.data);
            }
          }
        }
        callUserAPI();

      }
    }
  }, [])

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
              ${n?.status
                ? "bg-white/5 border-white/10"
                : "bg-linear-to-r from-[#111] to-[#1a1a1a] border-pink-500/30 shadow-lg"
              }
              hover:bg-[#111]
            `}
          >
            <div className="flex justify-between items-center mb-1">
              <span className={`px-2 py-0.5 text-xs rounded ${n?.bell?.codetype === "BT01" ? "bg-blue-500/20 text-blue-400" : n?.bell?.codetype === "BT02" ? "bg-red-500/20 text-red-400" : "bg-yellow-500/20 text-yellow-400"}`}>
                {n?.bell?.bell_type?.title}
              </span>
              <span className="text-xs text-gray-400">
                {moment(n?.createdAt).format("HH:mm - DD/MM/YYYY")}
              </span>
            </div>

            <div className="font-medium">
              {n?.bell?.title}
            </div>

            <div className="text-sm text-gray-400 line-clamp-2">
              <div
                className="text-sm text-gray-300"
                dangerouslySetInnerHTML={{
                  __html: n?.bell?.des || "Nội dung sẽ hiển thị ở đây...",
                }}
              />
            </div>

            {!n?.status && (
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
              <span className={`px-3 py-1 text-xs rounded ${selected?.bell?.codetype === "BT01" ? "bg-blue-500/20 text-blue-400" : selected?.bell?.codetype === "BT02" ? "bg-red-500/20 text-red-400" : "bg-yellow-500/20 text-yellow-400"}`}>
                {selected?.bell?.bell_type?.title}
              </span>

              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>


            <h2 className="text-lg font-semibold text-pink-400 mb-2">
              {selected?.bell?.title}
            </h2>


            <div className="text-gray-300 leading-relaxed">
              <div
                className="text-sm text-gray-300"
                dangerouslySetInnerHTML={{
                  __html: selected?.bell?.des || "Nội dung sẽ hiển thị ở đây...",
                }}
              />
            </div>


            <div className="text-xs text-gray-500 mt-4">
              {moment(selected?.createdAt).format("HH:mm - DD/MM/YYYY")}
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