'use client';

import { FC, useState } from "react";
import { motion } from "framer-motion";
import {
    Calendar,
    Clock,
    Users,
    CheckCircle,
    XCircle,
    AlertCircle,
} from "lucide-react";

type ReservationStatus = "pending" | "confirmed" | "cancelled";

type Reservation = {
    id: string;
    date: string;
    time: string;
    guests: number;
    note?: string;
    status: ReservationStatus;
};

const reservationsMock: Reservation[] = [
    {
        id: "#TB001",
        date: "2026-03-20",
        time: "18:30",
        guests: 4,
        note: "Bàn gần cửa sổ",
        status: "confirmed",
    },
    {
        id: "#TB002",
        date: "2026-03-22",
        time: "19:00",
        guests: 2,
        status: "pending",
    },
    {
        id: "#TB003",
        date: "2026-03-18",
        time: "17:30",
        guests: 6,
        note: "Sinh nhật",
        status: "cancelled",
    },
];

const statusConfig: Record<
    ReservationStatus,
    { label: string; color: string; icon: React.ReactNode }
> = {
    pending: {
        label: "Chờ xác nhận",
        color: "text-yellow-400",
        icon: <AlertCircle size={16} />,
    },
    confirmed: {
        label: "Đã xác nhận",
        color: "text-green-400",
        icon: <CheckCircle size={16} />,
    },
    cancelled: {
        label: "Đã huỷ",
        color: "text-red-400",
        icon: <XCircle size={16} />,
    },
};

const ReservationsPage: FC = () => {
    const [filter, setFilter] = useState<ReservationStatus | "all">("all");

    const filtered =
        filter === "all"
            ? reservationsMock
            : reservationsMock.filter((r) => r.status === filter);

    return (
        <div className="space-y-6">


            <h2 className="text-xl font-semibold">Lịch sử đặt bàn</h2>

          
            <div className="flex items-center justify-between">


               
                <div className="flex gap-2">
                    {["all", "pending", "confirmed", "cancelled"].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f as ReservationStatus | "all")}
                            className={`px-3 py-1.5 rounded-lg text-sm transition
                ${filter === f
                                    ? "bg-white text-black"
                                    : "bg-white/10 text-gray-300 hover:bg-white/20"
                                }`}
                        >
                            {f === "all"
                                ? "Tất cả"
                                : statusConfig[f as ReservationStatus].label}
                        </button>
                    ))}
                </div>
            </div>

           
            <div className="grid gap-4">
                {filtered.map((res) => {
                    const status = statusConfig[res.status];

                    return (
                        <motion.div
                            key={res.id}
                            whileHover={{ scale: 1.01 }}
                            className="p-5 rounded-2xl bg-[#111] border border-white/10 hover:border-white/20 transition"
                        >
                            
                            <div className="flex justify-between items-center mb-3">
                                <div>
                                    <p className="font-medium">{res.id}</p>
                                    <p className="text-xs text-gray-400 flex items-center gap-2">
                                        <Calendar size={14} />
                                        {res.date}
                                        <Clock size={14} className="ml-2" />
                                        {res.time}
                                    </p>
                                </div>

                                <div className={`flex items-center gap-1 text-sm ${status.color}`}>
                                    {status.icon}
                                    {status.label}
                                </div>
                            </div>

                            
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2 text-sm text-gray-300">
                                    <Users size={16} />
                                    {res.guests} người
                                </div>

                                {res.note && (
                                    <div className="text-xs text-gray-400 italic">
                                        {`"${res.note}"`}
                                    </div>
                                )}
                            </div>

                           
                            <div className="flex justify-end gap-2">
                                <button className="text-sm px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition">
                                    Xem chi tiết
                                </button>

                                {res.status === "pending" && (
                                    <button className="text-sm px-3 py-1.5 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition">
                                        Huỷ bàn
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    );
                })}
            </div>

          
            {filtered.length === 0 && (
                <div className="text-center text-gray-400 py-10">
                    Không có lịch đặt bàn nào
                </div>
            )}
        </div>
    );
};

export default ReservationsPage;