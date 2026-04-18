/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import { useEffect, useState } from "react";


interface HistoryItem {
  id: number;
  table: string;
  dish: string;
  chef: string;
  createdAt: string;
  duration: number; 
}


const mockData: HistoryItem[] = [
  {
    id: 1,
    table: "Bàn 1",
    dish: "Sushi cá hồi",
    chef: "Chef A",
    createdAt: "2026-03-20",
    duration: 12,
  },
  {
    id: 2,
    table: "Bàn 2",
    dish: "Ramen bò",
    chef: "Chef B",
    createdAt: "2026-03-20",
    duration: 18,
  },
  {
    id: 3,
    table: "Bàn 3",
    dish: "Tempura",
    chef: "Chef A",
    createdAt: "2026-03-19",
    duration: 10,
  },
];


export default function ChefHistoryPage() {
  const [mounted, setMounted] = useState(false);
  const [data, setData] = useState<HistoryItem[]>(mockData);
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [selected, setSelected] = useState<HistoryItem | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;


  const filtered = data.filter((item) => {
    const matchSearch =
      item.dish.toLowerCase().includes(search.toLowerCase()) ||
      item.table.toLowerCase().includes(search.toLowerCase());

    const matchDate = dateFilter
      ? item.createdAt === dateFilter
      : true;

    return matchSearch && matchDate;
  });


  const total = filtered.length;
  const avgTime =
    total > 0
      ? Math.round(
          filtered.reduce((a, b) => a + b.duration, 0) / total
        )
      : 0;

  return (
    <div className="p-6 text-white space-y-6">

    
      <h1 className="text-2xl font-semibold">
        📜 Lịch sử bếp
      </h1>

      <div className="flex gap-3 flex-wrap">
        <input
          placeholder="Tìm món / bàn..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 bg-[#111] border border-white/10 rounded"
        />

        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="p-2 bg-[#111] border border-white/10 rounded"
        />
      </div>

    
      <div className="grid md:grid-cols-3 gap-4">
        <Stat title="Tổng món" value={total} color="yellow" />
        <Stat title="Thời gian TB" value={avgTime + " phút"} color="blue" />
        <Stat title="Hiệu suất" value={total > 0 ? "Tốt" : "—"} color="green" />
      </div>

     
      <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">


  <div className="max-h-105 overflow-y-auto">

    <table className="w-full text-sm text-white">

      <thead className="bg-[#0f172a] sticky top-0 z-10">
        <tr className="text-gray-400 text-xs uppercase tracking-wider">
          <th className="p-4 text-left">Món</th>
          <th className="text-left">Bàn</th>
          <th className="text-left">Chef</th>
          <th className="text-left">Ngày</th>
          <th className="text-left">Thời gian</th>
          <th className="text-center">Chi tiết</th>
        </tr>
      </thead>

   
      <tbody>

        {filtered.map((item) => (
          <tr
            key={item.id}
            className="border-t border-white/5 hover:bg-white/5 transition-all"
          >
          
            <td className="p-4 font-medium text-white">
              🍣 {item.dish}
            </td>

           
            <td className="text-gray-300">
              {item.table}
            </td>

            
            <td className="text-gray-400">
              {item.chef}
            </td>

         
            <td className="text-gray-400">
              {item.createdAt}
            </td>

           
            <td>
              <span className="px-3 py-1 rounded-full text-xs bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
                {item.duration} phút
              </span>
            </td>

           
            <td className="text-center">
              <button
                onClick={() => setSelected(item)}
                className="px-3 py-1 text-xs bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded hover:bg-blue-500/20 transition"
              >
                Xem
              </button>
            </td>
          </tr>
        ))}

      </tbody>
    </table>
  </div>

 
  {filtered.length === 0 && (
    <div className="p-6 text-center text-gray-400">
      Không có dữ liệu
    </div>
  )}
</div>

    
      {selected && (
        <div className="fixed inset-0 flex items-center justify-center z-50">

          <div
            className="absolute inset-0 bg-black/70"
            onClick={() => setSelected(null)}
          />

          <div className="relative bg-[#111] p-6 rounded-xl w-100 border border-white/10">

            <h2 className="text-lg font-semibold text-yellow-400 mb-3">
              Chi tiết món
            </h2>

            <div className="space-y-2 text-sm">
              <p>🍽️ Món: {selected.dish}</p>
              <p>🪑 Bàn: {selected.table}</p>
              <p>👨‍🍳 Chef: {selected.chef}</p>
              <p>📅 Ngày: {selected.createdAt}</p>
              <p>⏱️ Thời gian: {selected.duration} phút</p>
            </div>

            <button
              onClick={() => setSelected(null)}
              className="mt-4 w-full py-2 bg-yellow-500 text-black rounded hover:bg-yellow-600"
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
}


function Stat({
  title,
  value,
  color,
}: {
  title: string;
  value: string | number;
  color: "yellow" | "blue" | "green";
}) {
  const map = {
    yellow: "text-yellow-400",
    blue: "text-blue-400",
    green: "text-green-400",
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
      <div className="text-sm text-gray-400">{title}</div>
      <div className={`text-xl font-semibold ${map[color]}`}>
        {value}
      </div>
    </div>
  );
}