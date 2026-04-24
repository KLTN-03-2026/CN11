/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import StatusCard from "@/components/utils/StatusCard";
import { useEffect, useState } from "react";


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

 
    const pending = orders.filter(o => o.status === "pending");
    const cooking = orders.filter(o => o.status === "cooking");
    const done = orders.filter(o => o.status === "done");

    return (
        <div className="p-6 text-white space-y-6">
            
            <h1 className="text-2xl font-semibold">
                Dashboard Bếp
            </h1>

            <div className="grid md:grid-cols-4 gap-4">
                <StatusCard title="Chờ nấu" value={2} /> 
                <StatusCard title="Đang nấu" value={2} />
                <StatusCard title="Hoàn thành" value={1} />
                <StatusCard title="Tổng đơn" value={4} />
            </div>

           
            <div className="grid md:grid-cols-3 gap-5">

           
                <Column title="🔥 Đơn mới" data={pending} now={now}>
                    {(o) => (
                        <button
                            onClick={() => updateStatus(o.id, "cooking")}
                            className="btn-yellow"
                        >
                            Bắt đầu
                        </button>
                    )}
                </Column>

              
                <Column title="👨‍🍳 Đang nấu" data={cooking} now={now}>
                    {(o) => (
                        <button
                            onClick={() => updateStatus(o.id, "done")}
                            className="btn-green"
                        >
                            Hoàn thành
                        </button>
                    )}
                </Column>

             
                <Column title="✅ Hoàn thành" data={done} now={now}>
                    {() => (
                        <span className="text-gray-400 text-sm">✔️ Xong</span>
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
