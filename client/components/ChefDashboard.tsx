/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import { useCart } from "@/app/context/CartContext";
import AddCookingTimeModal from "@/components/AddCookingTimeModal";
import StatusCard from "@/components/utils/StatusCard";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import KitchenButton from "@/components/KittchenButton";


type OrderStatus = "pending" | "cooking" | "done";

interface DishOrder {
    id: number;
    table: string;
    dish: string;
    time: number;
    status: OrderStatus;
}


const mockOrders: DishOrder[] = [
    { id: 1, table: "Bàn 1", dish: "Sushi cá hồi", time: Date.now() - 300000, status: "pending" },
    { id: 2, table: "Bàn 2", dish: "Ramen bò", time: Date.now() - 600000, status: "cooking" },
    { id: 3, table: "Bàn 3", dish: "Tempura", time: Date.now() - 1200000, status: "pending" },
    { id: 4, table: "Bàn 4", dish: "Sashimi", time: Date.now() - 200000, status: "done" },
];


export default function ChefDashboard() {
    const [orders, setOrders] = useState<DishOrder[]>(mockOrders);
    const [now, setNow] = useState<number>(0);
    const [open, setOpen] = useState<boolean>(false);
    const [isAlert, setIsAlert] = useState<boolean>(true);
    const { messageApi } = useCart();

    useEffect(() => {
        setNow(Date.now());

        const interval = setInterval(() => {
            setNow(Date.now());
        }, 1000);

        return () => clearInterval(interval);
    }, []);


    const updateStatus = (id: number, status: OrderStatus) => {
        setOrders(prev =>
            prev.map(o => (o.id === id ? { ...o, status } : o))
        );
    };

    const dishes = [
        { id: "1", name: "Sushi cá hồi" },
        { id: "2", name: "Ramen bò" },
        { id: "3", name: "Tempura" },
    ];

    const pending = orders.filter(o => o.status === "pending");
    const cooking = orders.filter(o => o.status === "cooking");
    const done = orders.filter(o => o.status === "done");

    return (
        <div className="p-6 text-white space-y-6">

            <h1 className="text-2xl font-semibold">
                Trang quản lý nhà hàng dành cho đầu bếp
            </h1>

            <div className="grid md:grid-cols-4 gap-4">
                <StatusCard title="Chờ nấu" value={2} />
                <StatusCard title="Đang nấu" value={2} />
                <StatusCard title="Hoàn thành" value={1} />
                <StatusCard title="Tổng đơn" value={4} />
            </div>

            <div className="flex">

                <motion.button
                    onClick={() => {
                        setIsAlert(false);
                        setOpen(true);
                    }}


                    whileHover={{
                        x: [0, -2, 2, -2, 2, 0],
                        transition: { duration: 0.3 },
                    }}


                    animate={
                        isAlert
                            ? {
                                x: [0, -3, 3, -3, 3, 0],
                            }
                            : {}
                    }

                    transition={
                        isAlert
                            ? {
                                duration: 0.5,
                                repeat: Infinity,
                                repeatDelay: 2,
                            }
                            : {}
                    }

                    className="px-5 py-2 cursor-pointer rounded-xl bg-linear-to-r from-blue-500 to-indigo-500 text-white font-medium shadow-lg hover:opacity-90 transition"
                >
                    + Thêm thời gian
                </motion.button>
                <AddCookingTimeModal
                    isOpen={open}
                    onClose={() => setOpen(false)}
                    dishes={dishes}
                    onSubmit={(data) => {
                        messageApi.success("Data submited: " + JSON.stringify(data));
                    }}
                />
            </div>

            <div className="grid md:grid-cols-3 gap-5">


                <Column title="🔥 Đơn mới" data={pending} now={now}>
                    {(o) => (
                        <KitchenButton onClick={() => updateStatus(o.id, "cooking")} status="new">
                            Bắt đầu
                        </KitchenButton>
                    )}
                </Column>


                <Column title="👨‍🍳 Đang nấu" data={cooking} now={now}>
                    {(o) => (
                        <KitchenButton onClick={() => updateStatus(o.id, "done")} status="cooking">
                            Hoàn thành
                        </KitchenButton>
                    )}
                </Column>


                <Column title="✅ Hoàn thành" data={done} now={now}>
                    {() => (
                         <KitchenButton status="done">
                           ✔️ Đã xong
                        </KitchenButton>
                    )}
                </Column>

            </div>
        </div>
    );
}


function Column({
    title,
    data,
    now,
    children,
}: {
    title: string;
    data: DishOrder[];
    now: number;
    children: (o: DishOrder) => React.ReactNode;
}) {
    return (
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3">

            <h2 className="text-lg font-medium">{title}</h2>

            {data.length === 0 && (
                <div className="text-gray-500 text-sm">Không có</div>
            )}

            {data.map((o) => {
                const minutes = Math.floor((now - o.time) / 60000);
                const isLate = minutes > 10;

                return (
                    <div
                        key={o.id}
                        className={`p-3 rounded-lg border transition
              ${isLate ? "border-red-500 bg-red-500/10" : "border-white/10 bg-[#111]"}
            `}
                    >
                        <div className="flex justify-between mb-1">
                            <span className="font-medium">{o.dish}</span>
                            <span className="text-xs text-gray-400">{o.table}</span>
                        </div>

                        <div className="text-xs text-gray-400 mb-2">
                            ⏱ {minutes} phút {isLate && "⚠️ Trễ"}
                        </div>

                        {children(o)}
                    </div>
                );
            })}
        </div>
    );
}
