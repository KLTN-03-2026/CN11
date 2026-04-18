'use client';

import { Food } from "@/types/data";
import { formatVND, parseVND } from "@/utils/functions/generate.utils";
import Image from "next/image";
import { useState, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";


interface Props {
  foods: Food[];
}

export default function FoodChart({ foods }: Props) {
  const [selected, setSelected] = useState<number[]>([]);
  const [search, setSearch] = useState<string>("");

  
  const filteredFoods = useMemo(() => {
    return foods.filter((f) =>
      f.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [foods, search]);


  const toggle = (id: number) => {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((i) => i !== id)
        : [...prev, id]
    );
  };

 
  const data =
    selected.length === 0
      ? foods.slice(0, 10)
      : foods.filter((f) => selected.includes(f.id));


  const max = data.reduce(
    (acc, cur) => (cur.customers > acc.customers ? cur : acc),
    data[0] || { name: "", customers: 0 }
  );

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-5">

      <h2 className="font-semibold text-lg">
        📊 Thống kê món ăn theo khách mua
      </h2>

      
      <input
        placeholder="🔍 Tìm món..."
        value={search}
        spellCheck={false}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full outline-none pl-4 p-2 bg-[#111] border border-white/10 rounded"
      />

      
      <div className="border border-white/10 rounded-lg overflow-hidden">

       
        <div className="grid grid-cols-5 px-3 py-2 text-sm text-gray-400 border-b border-white/10">
          <div>Chọn</div>
          <div>Món</div>
          <div>Giá</div>
          <div>Loại</div>
          <div>Khách</div>
        </div>

       
        <div className="max-h-62.5 overflow-y-auto">

          {filteredFoods.map((f) => (
            <div
              key={f.id}
              className="grid grid-cols-5 px-3 py-2 items-center border-b border-white/5 hover:bg-[#111]"
            >
           
              <input
                type="checkbox"
                checked={selected.includes(f.id)}
                onChange={() => toggle(f.id)}
              />

              
              <div className="flex items-center gap-2">
                <Image
                  width={40}
                  height={40}
                  alt="logo"
                  src={f.image}
                  className="w-10 h-10 object-cover rounded"
                />
                <span>{f.name}</span>
              </div>

             
              <div>{formatVND(parseVND(f.price))}</div>

           
              <div
                className={
                  f.category.name === "food"
                    ? "text-orange-400"
                    : "text-blue-400"
                }
              >
                {f?.category?.name}
              </div>

              
              <div className="text-green-400">
                {f?.customers?.quatify}
              </div>
            </div>
          ))}

          {filteredFoods.length === 0 && (
            <div className="text-center py-4 text-gray-400">
              Không tìm thấy món
            </div>
          )}

        </div>
      </div>

      
      {data.length > 0 && (
        <div className="text-green-400 text-sm">
          🔥 Món bán chạy nhất: <b>{max.name}</b> ({max.customers?.quatify} khách)
        </div>
      )}

      
      <div className="h-75">
        <ResponsiveContainer>
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="customers.quatify" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}