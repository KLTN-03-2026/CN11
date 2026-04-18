'use client';

import { FC, useState } from "react";
import { motion } from "framer-motion";
import {
    Clock,
    CheckCircle,
    XCircle,
} from "lucide-react";

type OrderStatus = "pending" | "completed" | "cancelled";

type Order = {
    id: string;
    date: string;
    total: number;
    status: OrderStatus;
    items: string[];
};

const ordersMock: Order[] = [
    {
        id: "#DH001",
        date: "2026-03-15",
        total: 350000,
        status: "completed",
        items: ["Bò lúc lắc", "Cơm chiên hải sản"],
    },
    {
        id: "#DH002",
        date: "2026-03-16",
        total: 220000,
        status: "pending",
        items: ["Gà nướng", "Salad"],
    },
    {
        id: "#DH003",
        date: "2026-03-14",
        total: 150000,
        status: "cancelled",
        items: ["Mì xào bò"],
    },
];

const statusConfig: Record<
    OrderStatus,
    { label: string; color: string; icon: React.ReactNode }
> = {
    pending: {
        label: "Đang xử lý",
        color: "text-yellow-400",
        icon: <Clock size={16} />,
    },
    completed: {
        label: "Hoàn thành",
        color: "text-green-400",
        icon: <CheckCircle size={16} />,
    },
    cancelled: {
        label: "Đã huỷ",
        color: "text-red-400",
        icon: <XCircle size={16} />,
    },
};

const OrdersPage: FC = () => {
    const [filter, setFilter] = useState<OrderStatus | "all">("all");

    const filteredOrders =
        filter === "all"
            ? ordersMock
            : ordersMock.filter((o) => o.status === filter);

    return (
        <div className="space-y-6">


            <h2 className="text-xl font-semibold">Đơn hàng của tôi</h2>

            <div className="flex items-center justify-between">


               
                <div className="flex gap-2">
                    {["all", "pending", "completed", "cancelled"].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f as OrderStatus | "all")}
                            className={`px-3 py-1.5 rounded-lg text-sm transition
                ${filter === f
                                    ? "bg-white text-black"
                                    : "bg-white/10 text-gray-300 hover:bg-white/20"
                                }`}
                        >
                            {f === "all"
                                ? "Tất cả"
                                : statusConfig[f as OrderStatus].label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid gap-4">
                {filteredOrders.map((order) => {
                    const status = statusConfig[order.status];

                    return (
                        <motion.div
                            key={order.id}
                            whileHover={{ scale: 1.01 }}
                            className="p-5 rounded-2xl bg-[#111] border border-white/10 hover:border-white/20 transition"
                        >
                            
                            <div className="flex justify-between items-center mb-3">
                                <div>
                                    <p className="font-medium">{order.id}</p>
                                    <p className="text-xs text-gray-400">{order.date}</p>
                                </div>

                                <div className={`flex items-center gap-1 text-sm ${status.color}`}>
                                    {status.icon}
                                    {status.label}
                                </div>
                            </div>

                         
                            <div className="text-sm text-gray-300 mb-3">
                                {order.items.join(", ")}
                            </div>

                           
                            <div className="flex justify-between items-center">
                                <p className="text-sm text-gray-400">
                                    Tổng tiền:
                                    <span className="text-white ml-1 font-medium">
                                        {order.total.toLocaleString()}đ
                                    </span>
                                </p>

                                <button className="text-sm px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition">
                                    Xem chi tiết
                                </button>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

          
            {filteredOrders.length === 0 && (
                <div className="text-center text-gray-400 py-10">
                    Không có đơn hàng nào
                </div>
            )}
        </div>
    );
};

export default OrdersPage;