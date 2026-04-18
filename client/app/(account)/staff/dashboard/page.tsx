/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import StatusCard from "@/components/utils/StatusCard";
import { useEffect, useState } from "react";


interface Table {
    id: number;
    name: string;
    status: "free" | "serving" | "reserved";
}

interface Order {
    id: number;
    table: string;
    status: "new" | "cooking" | "done";
}

interface Reservation {
    id: number;
    name: string;
    time: string;
    table: string;
}

const tablesMock: Table[] = [
    { id: 1, name: "Bàn 1", status: "serving" },
    { id: 2, name: "Bàn 2", status: "free" },
    { id: 3, name: "Bàn 3", status: "reserved" },
    { id: 4, name: "Bàn 4", status: "serving" },
];

const ordersMock: Order[] = [
    { id: 1, table: "Bàn 1", status: "new" },
    { id: 2, table: "Bàn 3", status: "cooking" },
];

const reservationsMock: Reservation[] = [
    { id: 1, name: "Anh Tuấn", time: "19:00", table: "Bàn 5" },
    { id: 2, name: "Chị Lan", time: "19:30", table: "Bàn 2" },
];


export default function StaffDashboardPage() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [now, setNow] = useState(0);
    const [table, setTable] = useState<number>(0);

    useEffect(() => {
        setNow(Date.now());
        const interval = setInterval(() => {
            setNow(Date.now());
        }, 60000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const callAPI = async () => {
            const tableBlankAPI = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/count/table-blank`,
                { method: "GET" }
            )

            const dataTableBlank = await tableBlankAPI?.json();
            if (dataTableBlank?.error === 0) {
                setTable(dataTableBlank?.data);
            }
        }

        callAPI();
    }, [])


    
    const newOrders = ordersMock.filter(o => o.status === "new").length;
    const reservations = reservationsMock.length;

    return (
        <div className="p-6 text-white space-y-6">


            <h1 className="text-2xl font-semibold">
                Trang quản lý của nhân viên
            </h1>


            <div className="grid md:grid-cols-4 gap-4">
                
                <StatusCard title="Bàn đang phục vụ" value={table} />
                <StatusCard title="Bàn trống" value={table} />
                <StatusCard title="Đơn mới" value={newOrders} />
                <StatusCard title="Đặt bàn hôm nay" value={reservations} />
            </div>


            <div className="grid lg:grid-cols-3 gap-5">


                <div className="col-span-2 bg-white/5 border border-white/10 rounded-xl p-5">
                    <h2 className="mb-3 text-lg font-medium">🍽️ Trạng thái bàn</h2>

                    <div className="grid grid-cols-4 gap-3">
                        {tablesMock.map((t) => (
                            <div
                                key={t.id}
                                className={`p-3 rounded-lg text-center font-medium
                  ${t.status === "free"
                                        ? "bg-green-500/20 text-green-400"
                                        : t.status === "serving"
                                            ? "bg-yellow-500/20 text-yellow-400"
                                            : "bg-blue-500/20 text-blue-400"
                                    }
                `}
                            >
                                {t.name}
                            </div>
                        ))}
                    </div>
                </div>


                <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                    <h2 className="mb-3 text-lg font-medium">🔔 Thông báo</h2>

                    <div className="space-y-3 text-sm text-gray-300">
                        <div className="bg-[#111] p-2 rounded">
                            🚨 Hết cá hồi!
                        </div>
                        <div className="bg-[#111] p-2 rounded">
                            📲 Bàn 2 vừa gọi món
                        </div>
                    </div>
                </div>


                <div className="col-span-2 bg-white/5 border border-white/10 rounded-xl p-5">
                    <h2 className="mb-3 text-lg font-medium">📲 Đơn QR mới</h2>

                    <div className="space-y-2">
                        {ordersMock.map((o) => (
                            <div
                                key={o.id}
                                className="flex justify-between bg-[#111] p-3 rounded"
                            >
                                <span>{o.table}</span>
                                <span className="text-yellow-400">
                                    {o.status}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>


                <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                    <h2 className="mb-3 text-lg font-medium">🪑 Sắp tới</h2>

                    <div className="space-y-2 text-sm">
                        {reservationsMock.map((r) => (
                            <div key={r.id} className="bg-[#111] p-2 rounded">
                                <div>{r.name}</div>
                                <div className="text-gray-400">
                                    {r.time} - {r.table}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}


