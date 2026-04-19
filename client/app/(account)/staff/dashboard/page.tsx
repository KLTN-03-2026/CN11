/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import StatusCard from "@/components/utils/StatusCard";
import TableManager from "@/components/utils/TableManager";
import { DataBellToUser } from "@/types/data";
import { useEffect, useState } from "react";
import { icons } from "@/utils/icons/icons.utils";

const {BsPhone} = icons;

interface Reservation {
    id: number;
    name: string;
    time: string;
    table: string;
}



const reservationsMock: Reservation[] = [
    { id: 1, name: "Anh Tuấn", time: "19:00", table: "Bàn 5" },
    { id: 2, name: "Chị Lan", time: "19:30", table: "Bàn 2" },
];


export default function StaffDashboardPage() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [now, setNow] = useState(0);
    const [table, setTable] = useState<number>(0);
    const [orderToday, setOrderToday] = useState<number>(0);
    const [bells, setBells] = useState<DataBellToUser[]>([]);

    useEffect(() => {
        setNow(Date.now());
        const interval = setInterval(() => {
            setNow(Date.now());
        }, 60000);
        return () => clearInterval(interval);
    }, []);

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

    useEffect(() => {
        const callAPI = async () => {
            const tableBlankAPI = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/count/table-blank`,
                { method: "GET" }
            )

            const orderTodayAPI = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/count/order-today`,
                { method: "GET" }
            )

            const dataTableBlank = await tableBlankAPI?.json();
            const dataOrderToday = await orderTodayAPI?.json();

            if (dataTableBlank?.error === 0) {
                setTable(dataTableBlank?.data);
            }

            if (dataOrderToday?.error === 0) {
                setOrderToday(dataOrderToday?.data);
            }
        }

        callAPI();
    }, [])




    return (
        <div className="p-6 text-white space-y-6">
            <h1 className="text-2xl font-semibold">
                Trang quản lý của nhân viên
            </h1>
            <div className="grid md:grid-cols-4 gap-4">
                <StatusCard title="Bàn trống" value={table} />
                <StatusCard title="Đơn mới" value={0} />
                <StatusCard title="Đặt bàn hôm nay" value={orderToday} />
            </div>
            <div className="grid lg:grid-cols-2 gap-5">
                <TableManager />
                <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                    <h2 className="mb-3 text-lg font-medium">🔔 Thông báo</h2>

                    <div className="space-y-3 text-sm text-gray-300">
                        {bells?.map((bell,index) => {
                            return <div key={index} className="bg-[#111] p-2 rounded flex items-center gap-2">
                              <BsPhone size={18} /> {bell?.bell?.title}
                            </div>
                        })}
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


