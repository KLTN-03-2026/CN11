'use client';
import { useCart } from "@/app/context/CartContext";
import { OrderTableType } from "@/types/data";
import { toTimestamp } from "@/utils/functions/generate.utils";
import { useEffect, useState } from "react";

export default function StaffReservationPage() {
    const [data, setData] = useState<OrderTableType[]>([]);
    const [search, setSearch] = useState("");
    const [filterDate, setFilterDate] = useState("");
    const [filterTime, setFilterTime] = useState("");
    const [now, setNow] = useState(0);
    const { messageApi, setIsAcctive, setIsCreate } = useCart();

    useEffect(() => {
        const interval = setInterval(() => {
            setNow(Date.now());
        }, 1000);
        return () => clearInterval(interval);
    }, []);





    const getRemaining = (createdAt: number) => {
        if (!now) return "--:--";

        const diff = 30 * 60 * 1000 - (now - createdAt);
        if (diff <= 0) return "Hết hạn";

        const min = Math.floor(diff / 60000);
        const sec = Math.floor((diff % 60000) / 1000);

        return `${min}:${sec.toString().padStart(2, "0")}`;
    };


    useEffect(() => {
        const callAPICount = async () => {
            const ordertableAPI = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/order/get-order-table`,
                { method: "GET" }
            )


            const dataOrderTable = await ordertableAPI?.json();



            if (dataOrderTable?.error === 0) {
                setData(dataOrderTable?.data);
            }


        }

        callAPICount();
    }, [])

    const handleConfirm = async (id: string) => {
        const responsive = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/order/update-order-table/${id}`,
            {
                method: "PUT",
                headers: {
                    'Content-Type': "application/json"
                }
            }
        )

        const data = await responsive?.json();
        if (data?.error === 0) {
            setData(data?.data);
        }
    };

    const handleDelete = (id: string) => {
        setIsCreate(true);
        setIsAcctive("Đang xoá đặt bàn ...");

        setTimeout(async () => {
            const responsive = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/order/delete-order-table/${id}`,
                {
                    method: "DELETE",
                }
            )

            const data = await responsive?.json();
            if (data?.error === 0) {
                setIsCreate(false);
                setData(data?.data);
                messageApi.success("Xoá thành công !");
            } else {
                setIsCreate(false);
                messageApi.error("Xoá không thành công !");
            }
        }, 2000);
    };


    const filtered = data.filter((r) => {
        const matchSearch =
            r?.email?.toLowerCase().includes(search.toLowerCase()) ||
            r.phone.includes(search);

        const matchDate = !filterDate || r.date === filterDate;
        const matchTime = !filterTime || r?.order_hour?.hour.startsWith(filterTime);

        return matchSearch && matchDate && matchTime;
    });

    return (
        <div className="p-6 text-white space-y-6">

            <h1 className="text-xl font-semibold">
                Trang quản lý đặt bàn
            </h1>


            <div className="grid grid-cols-3 gap-4">
                <input
                    placeholder="Tìm tên / SĐT..."
                    value={search}
                    spellCheck={false}
                    onChange={(e) => setSearch(e.target.value)}
                    className="p-2 outline-none pl-4 bg-[#111] border border-white/10 rounded"
                />

                <input
                    type="date"
                    value={filterDate}
                    onChange={(e) => setFilterDate(e.target.value)}
                    className="p-2 bg-[#111] outline-none border border-white/10 rounded"
                />

                <input
                    type="time"
                    value={filterTime}
                    onChange={(e) => setFilterTime(e.target.value)}
                    className="p-2 bg-[#111] border outline-none border-white/10 rounded"
                />
            </div>


            <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">


                <div className="grid grid-cols-9 px-4 py-3 text-sm text-gray-400 border-b border-white/10">
                    <div>SĐT</div>
                    <div>Bàn</div>
                    <div>Khách</div>
                    <div>Ngày</div>
                    <div>Giờ</div>
                    <div>Đếm ngược</div>
                    <div>Trạng thái</div>
                    <div className="text-center">Hành động</div>
                </div>


                <div className="max-h-112.5 overflow-y-auto">

                    {filtered.map((r) => (
                        <div
                            key={r.id}
                            className="grid grid-cols-9 px-4 py-3 border-b border-white/5 hover:bg-[#111]"
                        >

                            <div className="text-blue-400">{r?.phone}</div>
                            <div>{r.order_table?.name}</div>
                            <div>{r.guest}</div>
                            <div>{r.date}</div>
                            <div>{r?.order_hour?.hour}</div>


                            <div className="text-yellow-400 font-medium">
                                {getRemaining(toTimestamp(r?.createdAt) - 5 * 60 * 1000)}
                            </div>

                            <div>
                                {!r.status ? (
                                    <span className="text-orange-400 animate-pulse">
                                        Chờ xác nhận
                                    </span>
                                ) : (
                                    <span className="text-green-400">
                                        ✔ Đã xác nhận
                                    </span>
                                )}
                            </div>


                            <div className="flex justify-center gap-2">
                                {!r.status && (
                                    <button
                                        onClick={() => handleConfirm(r?.codeordertable)}
                                        className="px-2 py-1 cursor-pointer text-xs bg-green-500/20 text-green-400 rounded hover:bg-green-500/40"
                                    >
                                        Xác nhận
                                    </button>
                                )}

                                <button
                                    onClick={() => handleDelete(r?.codeordertable)}
                                    className="px-2 py-1 text-xs cursor-pointer bg-red-500/20 text-red-400 rounded hover:bg-red-500/40"
                                >
                                    Xoá
                                </button>
                            </div>
                        </div>
                    ))}

                    {filtered.length === 0 && (
                        <div className="text-center py-6 text-gray-400">
                            Không có dữ liệu
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}