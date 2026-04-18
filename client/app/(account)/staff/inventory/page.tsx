'use client';

import { useState } from "react";
import { motion } from "framer-motion";

type Ingredient = {
    id: number;
    name: string;
    stock: number;
    min: number;
    unit: string;
};

const data: Ingredient[] = [
    { id: 1, name: "Thịt bò", stock: 12, min: 10, unit: "kg" },
    { id: 2, name: "Cá hồi", stock: 5, min: 8, unit: "kg" },
    { id: 3, name: "Rau cải", stock: 20, min: 10, unit: "kg" },
    { id: 4, name: "Trứng", stock: 0, min: 10, unit: "quả" },
    { id: 5, name: "Gạo", stock: 50, min: 20, unit: "kg" },
];

export default function InventoryPage() {
    const [search, setSearch] = useState("");

    const filtered = data.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
    );

    const lowStock = data.filter((i) => i.stock <= i.min && i.stock > 0).length;
    const outStock = data.filter((i) => i.stock === 0).length;

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white p-6 space-y-6">

           
            <h1 className="text-2xl font-bold">📦 Quản lý tồn kho</h1>

           
            <div className="grid md:grid-cols-4 gap-6">
                <Card title="Tổng nguyên liệu" value={data.length} />
                <Card title="Sắp hết" value={lowStock} color="yellow" />
                <Card title="Hết hàng" value={outStock} color="red" />
                <Card title="Nhập hôm nay" value={12} />
            </div>

         
            <input
                placeholder="Tìm nguyên liệu..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full p-3 rounded bg-[#111] border border-white/10 outline-none"
            />

         
            <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">

                <div className="grid grid-cols-5 p-4 text-gray-400 border-b border-white/10 text-sm">
                    <span>Tên</span>
                    <span>Tồn kho</span>
                    <span>Đơn vị</span>
                    <span>Trạng thái</span>
                    <span>Tiến độ</span>
                </div>

                {filtered.map((item) => {
                    const percent = (item.stock / (item.min * 2)) * 100;

                    const status =
                        item.stock === 0
                            ? "Hết hàng"
                            : item.stock <= item.min
                                ? "Sắp hết"
                                : "Ổn định";

                    const color =
                        item.stock === 0
                            ? "bg-red-500"
                            : item.stock <= item.min
                                ? "bg-yellow-500"
                                : "bg-green-500";

                    return (
                        <motion.div
                            key={item.id}
                            whileHover={{ backgroundColor: "#111" }}
                            className="grid grid-cols-5 p-4 items-center border-b border-white/5"
                        >
                            <span>{item.name}</span>

                            <span>
                                {item.stock} {item.unit}
                            </span>

                            <span>{item.unit}</span>

                            <span
                                className={`text-sm ${item.stock === 0
                                        ? "text-red-400"
                                        : item.stock <= item.min
                                            ? "text-yellow-400"
                                            : "text-green-400"
                                    }`}
                            >
                                {status}
                            </span>

                           
                            <div className="w-full bg-white/10 h-2 rounded">
                                <div
                                    className={`${color} h-2 rounded`}
                                    style={{ width: `${Math.min(percent, 100)}%` }}
                                />
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}


function Card({
    title,
    value,
    color = "white",
}: {
    title: string;
    value: number;
    color?: "white" | "yellow" | "red";
}) {
    const colorClass =
        color === "yellow"
            ? "text-yellow-400"
            : color === "red"
                ? "text-red-400"
                : "text-white";

    return (
        <div className="bg-white/5 border border-white/10 p-5 rounded-2xl">
            <p className="text-gray-400 text-sm">{title}</p>
            <h2 className={`text-2xl font-bold ${colorClass}`}>{value}</h2>
        </div>
    );
}