/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import StatusCard from "@/components/utils/StatusCard";
import { useEffect, useState } from "react";


interface ErrorDish {
  id: number;
  dish: string;
  table: string;
  chef: string;
  reason: string;
  time: string;
  status: "error" | "retry" | "done";
}


const mockErrors: ErrorDish[] = [
  {
    id: 1,
    dish: "Sushi cá hồi",
    table: "Bàn 3",
    chef: "Chef A",
    reason: "Cháy",
    time: "2026-03-20",
    status: "error",
  },
  {
    id: 2,
    dish: "Ramen bò",
    table: "Bàn 5",
    chef: "Chef B",
    reason: "Sai món",
    time: "2026-03-20",
    status: "retry",
  },
  {
    id: 3,
    dish: "Tempura",
    table: "Bàn 1",
    chef: "Chef A",
    reason: "Thiếu nguyên liệu",
    time: "2026-03-19",
    status: "done",
  },
];

export default function ChefErrorPage() {
  const [mounted, setMounted] = useState(false);
  const [data, setData] = useState<ErrorDish[]>(mockErrors);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<ErrorDish | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

 
  const filtered = data.filter((item) =>
    item.dish.toLowerCase().includes(search.toLowerCase())
  );

  
  const handleRetry = (id: number) => {
    setData((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: "retry" } : item
      )
    );
  };

  const handleDelete = (id: number) => {
    setData((prev) => prev.filter((item) => item.id !== id));
  };



  return (
    <div className="p-6 text-white space-y-6">

   
      <h1 className="text-2xl font-semibold text-red-400">
         Món lỗi trong bếp
      </h1>

      
      <input
        placeholder="Tìm món lỗi..."
        value={search}
        spellCheck={false}
        onChange={(e) => setSearch(e.target.value)}
        className="p-2 outline-none bg-[#111] border border-white/10 rounded w-full md:w-1/3"
      />

   
      <div className="grid md:grid-cols-3 gap-4">
        <StatusCard title="Tổng lỗi" value={23} />
        <StatusCard title="Đã xử lý" value={13} />
      </div>

     
      <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
        <div className="max-h-105 overflow-y-auto">

          <table className="w-full text-sm">

            <thead className="bg-[#0f172a] sticky top-0">
              <tr className="text-gray-400 text-xs uppercase">
                <th className="p-4 text-left">Món</th>
                <th>Bàn</th>
                <th>Lý do</th>
                <th>Chef</th>
                <th>Trạng thái</th>
                <th className="text-center">Hành động</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((item) => (
                <tr
                  key={item.id}
                  className="border-t border-white/5 hover:bg-white/5"
                >
                  <td className="p-4">{item.dish}</td>
                  <td>{item.table}</td>

                  <td className="text-red-400">{item.reason}</td>

                  <td>{item.chef}</td>

                 
                  <td>
                    <StatusBadge status={item.status} />
                  </td>

               
                  <td className="flex gap-2 justify-center py-2">

                    <button
                      onClick={() => handleRetry(item.id)}
                      className="px-3 py-1 text-xs bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 rounded"
                    >
                      Nấu lại
                    </button>

                    <button
                      onClick={() => setSelected(item)}
                      className="px-3 py-1 text-xs bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded"
                    >
                      Xem
                    </button>

                    <button
                      onClick={() => handleDelete(item.id)}
                      className="px-3 py-1 text-xs bg-red-500/10 text-red-400 border border-red-500/20 rounded"
                    >
                      Xoá
                    </button>

                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>

     
      {selected && (
        <div className="fixed inset-0 flex items-center justify-center z-50">

          <div
            className="absolute inset-0 bg-black/70"
            onClick={() => setSelected(null)}
          />

          <div className="relative bg-[#111] p-6 rounded-xl w-100">

            <h2 className="text-lg text-red-400 mb-3">
              ⚠️ Chi tiết lỗi
            </h2>

            <p>🍽️ {selected.dish}</p>
            <p>🪑 {selected.table}</p>
            <p>👨‍🍳 {selected.chef}</p>
            <p className="text-red-400">❌ {selected.reason}</p>

            <button
              onClick={() => setSelected(null)}
              className="mt-4 w-full py-2 bg-yellow-500 text-black rounded"
            >
              Đóng
            </button>
          </div>
        </div>
      )}

    </div>
  );
}


function StatusBadge({ status }: { status: string }) {
  const map = {
    error: "bg-red-500/10 text-red-400",
    retry: "bg-yellow-500/10 text-yellow-400",
    done: "bg-green-500/10 text-green-400",
  };

  const label = {
    error: "Lỗi",
    retry: "Đang làm lại",
    done: "Hoàn thành",
  };

  return (
    <span className={`px-3 py-1 rounded text-xs ${map[status as keyof typeof map]}`}>
      {label[status as keyof typeof label]}
    </span>
  );
}


