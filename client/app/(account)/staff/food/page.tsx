'use client';

import AssignChefModal from "@/components/AssignChefModal";
import { useState } from "react";


type OrderStatus = "new" | "cooking" | "done";

interface OrderItem {
    name: string;
    quantity: number;
    price: number;
}

interface Order {
    id: number;
    table: string;
    items: OrderItem[];
    status: OrderStatus;
    time: string;
}


const mockOrders: Order[] = [
    {
        id: 1,
        table: "Bàn 1",
        status: "new",
        time: "18:20",
        items: [
            { name: "Sushi cá hồi", quantity: 2, price: 120000 },
            { name: "Trà đào", quantity: 1, price: 40000 },
        ],
    },
    {
        id: 2,
        table: "Bàn 5",
        status: "cooking",
        time: "18:30",
        items: [
            { name: "Ramen bò", quantity: 1, price: 90000 },
            { name: "Nước ép cam", quantity: 2, price: 50000 },
        ],
    },
];


const statusLabel = {
    new: "Mới",
    cooking: "Đang làm",
    done: "Hoàn thành",
};

export default function StaffOrderQRPage() {
    const [orders, setOrders] = useState<Order[]>(mockOrders);
    const [open,setOpen] = useState<boolean>(false);

    const updateStatus = (id: number) => {
        setOpen(true);
        setOrders((prev) =>
            prev.map((o) => {
                if (o.id !== id) return o;

                if (o.status === "new") return { ...o, status: "cooking" };
                if (o.status === "cooking") return { ...o, status: "done" };

                return o;
            })
        );
    };


    const getTotal = (items: OrderItem[]) =>
        items.reduce((sum, i) => sum + i.price * i.quantity, 0);

    return (
        <div className="p-6 text-white space-y-6">


            <h1 className="text-xl font-semibold">
                📲 Đơn hàng từ QR (Tại bàn)
            </h1>


            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">

                {orders.map((order) => (
                    <div
                        key={order.id}
                        className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-4 hover:bg-[#111] transition"
                    >


                        <div className="flex justify-between items-center">
                            <div>
                                <div className="text-lg font-semibold text-pink-400">
                                    {order.table}
                                </div>
                                <div className="text-xs text-gray-400">
                                    {order.time}
                                </div>
                            </div>


                            <span
                                className={`px-3 py-1 text-xs rounded-full
                  ${order.status === "new"
                                        ? "bg-yellow-500/20 text-yellow-400 animate-pulse"
                                        : order.status === "cooking"
                                            ? "bg-blue-500/20 text-blue-400"
                                            : "bg-green-500/20 text-green-400"
                                    }
                `}
                            >
                                {statusLabel[order.status]}
                            </span>
                        </div>


                        <div className="space-y-2">
                            {order.items.map((item, i) => (
                                <div
                                    key={i}
                                    className="flex justify-between text-sm border-b border-white/5 pb-1"
                                >
                                    <span>
                                        {item.name} x{item.quantity}
                                    </span>
                                    <span className="text-yellow-400">
                                        {(item.price * item.quantity).toLocaleString()} đ
                                    </span>
                                </div>
                            ))}
                        </div>


                        <div className="flex justify-between font-medium">
                            <span>Tổng</span>
                            <span className="text-green-400">
                                {getTotal(order.items).toLocaleString()} đ
                            </span>
                        </div>


                        {order.status !== "done" && (
                            <button
                                onClick={() => updateStatus(order.id)}
                                className={`w-full py-2 rounded-lg font-medium transition
                  ${order.status === "new"
                                        ? "bg-linear-to-r from-yellow-400 to-orange-500 text-black"
                                        : "bg-linear-to-r from-blue-400 to-indigo-500"
                                    }
                  hover:scale-105
                `}
                            >
                                {order.status === "new"
                                    ? "Nhận đơn"
                                    : "Hoàn thành"}
                            </button>
                        )}

                    </div>
                ))}

                <AssignChefModal
                    isOpen={open}
                    onClose={() => setOpen(false)}
                    chefs={[
                        { id: "1", name: "Chef A", isAvailable: true },
                        { id: "2", name: "Chef B", isAvailable: true },
                    ]}
                    dishes={[
                        { id: "d1", name: "Bò lúc lắc", quantity: 2 },
                        { id: "d2", name: "Lẩu thái", quantity: 1 },
                    ]}
                    onAssign={async (data) => {
                        console.log("Assign:", data);
                    }}
                />

                {orders.length === 0 && (
                    <div className="text-gray-400">
                        Không có đơn nào
                    </div>
                )}

            </div>
        </div>
    );
}