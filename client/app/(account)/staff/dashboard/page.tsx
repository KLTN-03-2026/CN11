/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import StatusCard from "@/components/utils/StatusCard";
import TableManager from "@/components/utils/TableManager";
import { DataBellToUser, NoteWaiter } from "@/types/data";
import { useEffect, useState } from "react";
import { icons } from "@/utils/icons/icons.utils";
import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'
import NoteDialog from "@/components/NoteDialog";


const { BsPhone } = icons;

interface Reservation {
    id: number;
    name: string;
    time: string;
    table: string;
}



const reservationsMock: Reservation[] = [
    { id: 1, name: "Anh Tuấn", time: "19:00", table: "Bàn 5" },
    { id: 2, name: "Chị Lan", time: "19:30", table: "Bàn 2" },
    { id: 3, name: "Anh Hùng", time: "20:00", table: "Bàn 1" },
    { id: 4, name: "Chị Mai", time: "20:30", table: "Bàn 3" },
    { id: 5, name: "Anh Nam", time: "21:00", table: "Bàn 4" },

];


export default function StaffDashboardPage() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [now, setNow] = useState(0);
    const [table, setTable] = useState<number>(0);
    const [orderToday, setOrderToday] = useState<number>(0);
    const [bells, setBells] = useState<DataBellToUser[]>([]);
    const [noteWaiters, setNoteWaiters] = useState<NoteWaiter[]>([]);

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

            const noteWaitersAPI = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/get-note-waiters`,
                { method: "GET" }
            )

            const dataTableBlank = await tableBlankAPI?.json();
            const dataOrderToday = await orderTodayAPI?.json();
            const dataNoteWaiters = await noteWaitersAPI?.json();

            if (dataTableBlank?.error === 0) {
                setTable(dataTableBlank?.data);
            }

            if (dataOrderToday?.error === 0) {
                setOrderToday(dataOrderToday?.data);
            }

            if (dataNoteWaiters?.error === 0) {
                setNoteWaiters(dataNoteWaiters?.data);
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
                <StatusCard title="Tần suất" value={100} />
            </div>
            <div className="grid lg:grid-cols-2 gap-5">
                <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                    <div className="flex items-center justify-between">
                        <h2 className="mb-3 text-lg font-medium">🪑 Bồi bàn</h2>
                    </div>
                    <SimpleBar style={{ maxHeight: 200 }}>
                        {noteWaiters?.map((r) => (
                            <div key={r?.id} className="bg-[#111] text-sm mb-2 p-2 rounded">
                                <div>{r?.user?.username}</div>
                                <div className="text-gray-400">
                                    {r.hourService?.hour} - {r.table?.name}
                                </div>
                            </div>
                        ))}
                    </SimpleBar>
                </div>
                <NoteDialog/>
                <TableManager />
                <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                    <h2 className="mb-3 text-lg font-medium">🔔 Thông báo</h2>

                    <SimpleBar style={{ maxHeight: 300 }}>
                        {bells?.map((bell, index) => {
                            return <div key={index} className="bg-[#111] mb-4 p-2 rounded flex items-center gap-2">
                                <BsPhone size={18} /> {bell?.bell?.title}
                            </div>
                        })}
                    </SimpleBar>
                </div>
            </div>
        </div>
    );
}


