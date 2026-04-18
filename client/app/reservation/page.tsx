'use client';

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Footer from "@/components/partials/Footer";
import { FloorType, HourType, OrderTableStatusType, TableType } from "@/types/data";
import SendingEmailModal from "@/components/SendingEmailModal";
import { useCart } from "@/app/context/CartContext";
import { isNumber } from "@/utils/functions/generate.utils";




export default function BookingPremium() {
    const [selectedTable, setSelectedTable] = useState<number | null>(null);
    const [selectedTime, setSelectedTime] = useState<string>("18h");
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [times, setTimes] = useState<HourType[]>([]);
    const [codeTableName, setCodeTableName] = useState<string>("");
    const [guest, setGuest] = useState<string>("2");
    const [toDate, setToDate] = useState<string>("");
    const { messageApi } = useCart();


    // const tables = tablesData[floor].sort((a, b) => a.id - b.id);

    const [floor, setFloor] = useState<FloorType[]>([]);
    const [codefloor, setCodeFloor] = useState<string>("F01");
    const [tables, setTables] = useState<TableType[]>([]);

    useEffect(() => {
        const callAPICount = async () => {
            const floorsAPI = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/log/floors`,
                { method: "GET" }
            )
            const dataFloors = await floorsAPI?.json();
            const hoursAPI = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/log/hours`,
                { method: "GET" }
            )
            const dataHours = await hoursAPI?.json();

            if (dataFloors?.error === 0) {
                setFloor(dataFloors?.data);
            }
            if (dataHours?.error === 0) {
                setTimes(dataHours?.data);
            }

        }

        callAPICount();
    }, [])

   

    useEffect(() => {
        const callAPICount = async () => {
            const tablesAPI = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/log/floors-table/${codefloor}/${selectedTime}`,
                { method: "GET" }
            )
            const dataTables = await tablesAPI?.json();
            if (dataTables?.error === 0) {
                setTables(dataTables?.data);

            } else {
                setTables([]);
            }

        }

        callAPICount();
    }, [codefloor,selectedTime])



    const handleSubmit = () => {
        if (!codeTableName) {
            messageApi.error("Vui lòng chọn bàn!");
            return;
        }

        if (!selectedTime) {
            messageApi.error("Vui lòng chọn giờ!");
            return;
        }

        if (!email) {
            messageApi.error("Vui lòng nhập email!");
            return;
        }

        if (!phone) {
            messageApi.error("Vui lòng nhập số điện thoại!");
            return;
        }

        if (!toDate) {
            messageApi.error("Vui lòng chọn ngày!");
            return;
        }

        if (!isNumber(guest) || guest.length === 0) {
            messageApi.error("Vui lòng nhập số lượng khách hợp lệ!");
            return;
        }

        setTimeout(async () => {
            const responsive = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/order/create-order-table`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ email, phone, codehour: selectedTime, date: toDate, guest, codetable: codeTableName })
                }
            )

            const data = await responsive?.json();

            if (data?.error === 0) {
                setOpen(false);
                await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/order/update-order-table-status/${codeTableName}/${selectedTime}/${codefloor}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                messageApi.success("Đã gửi thông tin đặt bàn tới nhà hàng. Cảm ơn bạn đã quan tâm !");
                setTimeout(async () => {
                    setSelectedTime("18h");
                    setToDate("");
                    setGuest("2");
                    setEmail("");
                    setPhone("");
                    setCodeTableName("");
                    setCodeFloor("F01");

                    const tablesAPI = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/log/floors-table/${codefloor}/${selectedTime}`,
                        { method: "GET" }
                    )


                    const dataTables = await tablesAPI?.json();
                    if (dataTables?.error === 0) {
                        setTables(dataTables?.data);

                    } else {
                        setTables([]);
                    }
                }, 2000);
            } else {
                setOpen(false);
            }

        }, 2000);

        setOpen(true);





    };

    return (
        <div>
            <section className="relative w-full min-h-screen text-white flex items-center justify-center">


                <video autoPlay muted loop className="absolute w-full h-full object-cover">
                    <source src="/videos/gioithieu.mp4" type="video/mp4" />
                </video>


                <div className="absolute inset-0 bg-black/70 backdrop-blur-[3px]" />


                <div className="relative z-10 w-full max-w-6xl p-6">

                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">


                        <div className="text-center mb-10">
                            <p className="text-red-400 text-xs tracking-widest mb-2">
                                予約 (Reservation)
                            </p>
                            <h2 className="text-3xl md:text-4xl font-semibold">
                                Đặt Bàn Nhà Hàng
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-2 gap-10">


                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col gap-1">
                                    <div className="text-[26px] font-bold text-center">Thông tin đăng ký</div>
                                    <div className="text-[12px] font-bold text-center text-blue-300">(Điền thông tin đặt bàn vào đây)</div>
                                </div>
                                <div>
                                    <label className="text-sm text-gray-400">Email</label>
                                    <input
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        spellCheck={false}
                                        placeholder="Nhập email của bạn ..."
                                        type="email"
                                        className="w-full outline-none mt-2 p-3 rounded-xl text-white cursor-pointer bg-black/50 border border-white/10"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm text-gray-400">Số điện thoại</label>
                                    <input
                                        type="text"
                                        spellCheck={false}
                                        onChange={e => setPhone(e.target.value)}
                                        placeholder="Nhập số điện thoại của bạn ..."
                                        value={phone}
                                        className="w-full outline-none mt-2 p-3 rounded-xl text-white cursor-pointer bg-black/50 border border-white/10"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm text-gray-400">Chọn tầng</label>
                                    <select
                                        value={codefloor}
                                        onChange={(e) => {
                                            setCodeFloor(e.target.value);
                                            setSelectedTable(null);
                                        }}

                                        className="w-full mt-2 p-3 outline-none cursor-pointer rounded-xl bg-black/50 border border-white/10"
                                    >
                                        {floor.map((f, index) => (
                                            <option key={index} value={f?.codefloor}>
                                                {f?.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>


                                <div>
                                    <label className="text-sm text-gray-400">Ngày</label>
                                    <input
                                        type="date"
                                        value={toDate}
                                        onChange={e => setToDate(e.target.value)}
                                        className="w-full outline-none mt-2 p-3 rounded-xl text-white cursor-pointer bg-black/50 border border-white/10"
                                    />
                                </div>


                                <div>
                                    <label className="text-sm text-gray-400">Giờ (vui lòng đến trước 10 phút)</label>
                                    <div className="flex gap-3 mt-2 flex-wrap">
                                        {times?.map((time) => (
                                            <button
                                                key={time?.id}
                                                onClick={() => setSelectedTime(time?.codehour)}
                                                className={`px-4 py-2 cursor-pointer rounded-xl border transition ${selectedTime === time?.codehour
                                                    ? "bg-red-600 border-red-500"
                                                    : "border-white/10 hover:bg-white/10"
                                                    }`}
                                            >
                                                {time?.hour}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="text-sm text-gray-400">Số khách</label>
                                    <input
                                        type="text"
                                        value={guest}


                                        onChange={(e) => setGuest(e.target.value)}
                                        className="w-full mt-2 cursor-pointer outline-none p-3 rounded-xl bg-black/50 border border-white/10"
                                    />
                                </div>


                                <button
                                    onClick={handleSubmit}
                                    className="w-full mt-4 py-3 cursor-pointer rounded-xl bg-red-600 hover:bg-red-700 transition shadow-lg shadow-red-500/30"
                                >
                                    Xác nhận đặt bàn
                                </button>
                            </div>


                            <div className="flex flex-col gap-3">
                                <div className="flex flex-col gap-1">
                                    <div className="text-[26px] font-bold text-center">Sơ đồ bàn ăn</div>
                                    <div className="text-[12px] font-bold text-center text-blue-300">(Chọn 1 trong các bạn dưới đây)</div>
                                </div>
                                <div className="grid mt-10 grid-cols-3 sm:grid-cols-3 gap-2">
                                    {tables?.map((table, i) => {
                                        const isSelected = selectedTable === table?.id;
                                        const notEnoughSeats = +table?.order_customer?.customer < +guest;

                                        return (
                                            <motion.div
                                                key={table.id}
                                                initial={{ opacity: 0, y: 20 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                transition={{ delay: i * 0.05 }}
                                                onClick={() => {
                                                    if (
                                                        !notEnoughSeats
                                                    ) {
                                                        setSelectedTable(table.id);
                                                        setCodeTableName(table?.order_table_name?.codetable);
                                                    }
                                                }}
                                                className={`
                      aspect-square
                      flex flex-col items-center justify-center
                      rounded-2xl transition text-center border
                      
                      ${table?.isorder
                                                        ? "bg-red-600/80 cursor-not-allowed"
                                                        : notEnoughSeats
                                                            ? "bg-gray-600/40 cursor-not-allowed"
                                                            : isSelected
                                                                ? "bg-red-600"
                                                                : "bg-white/5 hover:bg-white/10 cursor-pointer"
                                                    }

                      border-white/10
                    `}
                                            >
                                                <p className="font-medium">{table?.order_table_name?.name}</p>
                                                <p className="text-sm text-gray-300">
                                                    {table?.order_customer?.customer} khách
                                                </p>

                                                <p className="text-xs mt-1 opacity-80">
                                                    {table?.isorder
                                                        ? "Khách đã đặt"
                                                        : notEnoughSeats
                                                            ? "Không đủ chỗ"
                                                            : "Còn trống"}
                                                </p>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
            <SendingEmailModal open={open} />
            <Footer />
        </div>
    );
}