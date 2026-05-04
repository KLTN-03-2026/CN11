"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import { useRouter } from "next/navigation";


type Item = {
    id: string;
    name: string;
    price: number;
    quantity: number;
};

type Voucher = {
    id: string;
    code: string;
    discount: number;
    description: string;
    minOrder: number;
    expire: string;
    isBest?: boolean;
};

const vouchers: Voucher[] = [
    {
        id: "1",
        code: "HOT50K",
        discount: 50000,
        minOrder: 200000,
        description: "Giảm 50K cho đơn từ 200K",
        expire: "HSD: 30/12",
        isBest: true,
    },
    {
        id: "2",
        code: "SALE20K",
        discount: 20000,
        minOrder: 100000,
        description: "Giảm 20K",
        expire: "HSD: 25/12",
    },
    {
        id: "3",
        code: "FREESHIP",
        discount: 15000,
        minOrder: 80000,
        description: "Hỗ trợ phí giao",
        expire: "HSD: 20/12",
    },
    {
        id: "4",
        code: "FREESHIP",
        discount: 15000,
        minOrder: 80000,
        description: "Hỗ trợ phí giao",
        expire: "HSD: 20/12",
    },
];

export default function CheckoutMobile() {
    const [note, setNote] = useState<string>("");
    const [useUtensils, setUseUtensils] = useState<boolean>(true);
    const [payment, setPayment] = useState<"cash" | "vnpay">("cash");
    const [voucherInput, setVoucherInput] = useState<string>("");
    const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null);
    const [showVoucher, setShowVoucher] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const router = useRouter();

    const items: Item[] = [
        { id: "1", name: "Ramen Nhật Bản", price: 180000, quantity: 2 },
    ];

    const foodTotal = items.reduce(
        (sum, i) => sum + i.price * i.quantity,
        0
    );

    const discount = selectedVoucher ? selectedVoucher.discount : 0;
    const total = foodTotal - discount;

    const handdlePayment = async () => {

        if (payment === "vnpay") {
            const res = await fetch("http://localhost:5000/api/vnpay/create-payment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ amount: total, orderId:"1" }),
            });

            const data = await res.json();

            if (typeof window !== 'undefined') {
                // eslint-disable-next-line react-hooks/immutability
                window.location.href = data.paymentUrl;
            }
        } else {

            router.push(`/orderstatus/${total}`)

        }

    }

    return (
        <div className="min-h-screen bg-black flex justify-center">
           
            <div className="w-full max-w-105 text-white pb-28">

                
                <div className="p-4 border-b border-gray-800 flex items-center gap-3">
                    <span className="text-xl cursor-pointer" onClick={()=>router.back()}>←</span>
                    <h1 className="font-semibold">Xác nhận đơn hàng</h1>
                </div>

               
                <div className="p-4 border-b border-gray-800">
                    <p className="text-sm text-gray-400">Hình thức</p>
                    <p className="font-medium text-green-400">
                        🏪 Nhận tại cửa hàng
                    </p>
                </div>

              
                <div className="p-4 border-b border-gray-800">
                    <p className="text-sm text-gray-400">Thời gian nhận</p>
                    <p>~ 15 - 20 phút</p>
                </div>

              
                <div className="p-4 border-b border-gray-800">
                    {items.map((item) => (
                        <div key={item.id} className="flex justify-between mb-2">
                            <span>
                                {item.quantity}x {item.name}
                            </span>
                            <span className="text-red-400">
                                {(item.price * item.quantity).toLocaleString()}đ
                            </span>
                        </div>
                    ))}
                </div>

               
                <div className="p-4 border-b border-gray-800">
                    <p className="text-sm text-gray-400 mb-2">🎟️ Voucher</p>

                   
                    <div className="flex gap-2 mb-2">
                        <input
                            value={voucherInput}
                            onChange={(e) => setVoucherInput(e.target.value)}
                            placeholder="Nhập mã voucher..."
                            className="flex-1 bg-[#111827] border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none"
                        />

                        <button
                            onClick={() => {
                                const found = vouchers.find(
                                    (v) => v.code.toLowerCase() === voucherInput.toLowerCase()
                                );

                                if (!found) {
                                    setError("Mã không hợp lệ");
                                    return;
                                }

                                setSelectedVoucher(found);
                                setError("");
                            }}
                            className="px-3 py-2 bg-red-500 rounded-lg text-white text-sm"
                        >
                            Áp dụng
                        </button>
                    </div>

                    
                    {error && (
                        <p className="text-red-400 text-xs mb-2">{error}</p>
                    )}

                
                    {selectedVoucher && (
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="bg-green-500/20 border border-green-500 p-3 rounded-xl text-sm text-green-400 mb-2"
                        >
                            ✔ {selectedVoucher.code} - giảm{" "}
                            {selectedVoucher.discount.toLocaleString()}đ
                        </motion.div>
                    )}

                    <button
                        onClick={() => setShowVoucher(true)}
                        className="cursor-pointer text-sm text-blue-500"
                    >
                        Chọn voucher có sẵn
                    </button>

                    {showVoucher && (
                        <div className="fixed inset-0 bg-black/70 z-50 flex justify-center items-end">

                            <div className="w-full max-w-105 bg-[#0f172a] rounded-t-3xl p-4">


                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-white font-semibold text-lg">
                                        🎟️ Kho voucher
                                    </h3>
                                    <button onClick={() => setShowVoucher(false)}>✕</button>
                                </div>

                                <SimpleBar style={{ maxHeight: 300 }}>
                                    {vouchers.map((v) => {
                                        const isValid = foodTotal >= v.minOrder;

                                        return (
                                            <div
                                                key={v.id}
                                                onClick={() => {
                                                    if (!isValid) return;

                                                    setSelectedVoucher(v);
                                                    setShowVoucher(false);
                                                    setError("");
                                                }}
                                                className={`
                relative p-4 rounded-2xl cursor-pointer transition mb-2
                ${isValid
                                                        ? "bg-linear-to-r from-red-500/20 to-pink-500/20 border border-red-500/40 hover:scale-[1.02]"
                                                        : "bg-gray-800 border border-gray-700 opacity-50 cursor-not-allowed"
                                                    }
              `}
                                            >

                                                {v.isBest && (
                                                    <span className="absolute top-2 right-2 text-xs bg-yellow-400 text-black px-2 py-1 rounded-full">
                                                        BEST
                                                    </span>
                                                )}


                                                <div className="flex justify-between items-center">
                                                    <div>
                                                        <p className="text-white font-semibold">{v.code}</p>
                                                        <p className="text-gray-300 text-xs">
                                                            {v.description}
                                                        </p>
                                                        <p className="text-gray-500 text-xs">
                                                            Đơn tối thiểu: {v.minOrder.toLocaleString()}đ
                                                        </p>
                                                    </div>

                                                    <div className="text-right">
                                                        <p className="text-red-400 font-bold">
                                                            -{v.discount.toLocaleString()}đ
                                                        </p>
                                                        <p className="text-gray-400 text-xs">
                                                            {v.expire}
                                                        </p>
                                                    </div>
                                                </div>


                                                {!isValid && (
                                                    <p className="text-xs text-red-400 mt-2">
                                                        Chưa đạt điều kiện
                                                    </p>
                                                )}
                                            </div>
                                        );
                                    })}
                                </SimpleBar>

                               
                                <button
                                    onClick={() => setShowVoucher(false)}
                                    className="w-full mt-4 py-3 bg-gray-700 rounded-xl text-white"
                                >
                                    Đóng
                                </button>
                            </div>
                        </div>
                    )}


                </div>

               
                <div className="p-4 border-b border-gray-800">
                    <p className="mb-2 text-sm text-gray-400">
                        Thưởng cho nhân viên
                    </p>
                    <div className="flex gap-2">
                        {["0đ", "5K", "10K", "Khác"].map((t) => (
                            <button
                                key={t}
                                className="px-3 py-1 rounded-lg bg-[#111827] border border-gray-700 text-sm"
                            >
                                {t}
                            </button>
                        ))}
                    </div>
                </div>

             
                <div className="p-4 border-b border-gray-800 flex justify-between items-center">
                    <span>🍴 Lấy dụng cụ ăn</span>

                  
                    <div
                        onClick={() => setUseUtensils(!useUtensils)}
                        className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition ${useUtensils ? "bg-green-500" : "bg-gray-600"
                            }`}
                    >
                        <div
                            className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${useUtensils ? "translate-x-6" : ""
                                }`}
                        />
                    </div>
                </div>

               
                <div className="p-4 border-b border-gray-800">
                    <p className="text-sm text-gray-400 mb-2">Ghi chú</p>
                    <textarea
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="Ít cay, không hành..."
                        className="w-full bg-[#111827] h-25 resize-none border border-gray-700 rounded-xl p-3 text-sm focus:outline-none"
                    />
                </div>

              
                <div className="p-4 border-b border-gray-800">
                    <p className="text-sm text-gray-400 mb-2">
                        Phương thức thanh toán
                    </p>

                    <div className="flex gap-2">
                        <button
                            onClick={() => setPayment("cash")}
                            className={`flex-1 py-2 cursor-pointer rounded-lg border ${payment === "cash"
                                ? "border-red-500 bg-red-500/20 text-white"
                                : "border-gray-700 text-gray-400"
                                }`}
                        >
                            Tiền mặt
                        </button>

                        <button
                            onClick={() => setPayment("vnpay")}
                            className={`flex-1 cursor-pointer py-2 rounded-lg border ${payment === "vnpay"
                                ? "border-pink-500 bg-pink-500/20 text-white"
                                : "border-gray-700 text-gray-400"
                                }`}
                        >
                            VNPAY
                        </button>
                    </div>
                </div>


                <div className="p-4 border-b border-gray-800">
                    <div className="flex justify-between text-sm mb-1">
                        <span>Tổng tiền món</span>
                        <span>{foodTotal.toLocaleString()}đ</span>
                    </div>

                    <div className="flex justify-between text-sm mb-1">
                        <span>Giảm giá</span>
                        <span className="text-green-400">
                            -{discount.toLocaleString()}đ
                        </span>
                    </div>

                    <div className="flex justify-between mt-3 font-semibold">
                        <span>Tổng thanh toán</span>
                        <span className="text-red-400">
                            {total.toLocaleString()}đ
                        </span>
                    </div>
                </div>


                <div className="fixed bottom-0 left-0 w-full flex justify-center bg-black border-t border-gray-800">
                    <div className="w-full max-w-105 p-4">
                        <button
                            onClick={handdlePayment}
                            className="w-full py-3 cursor-pointer rounded-xl bg-linear-to-r from-red-500 to-red-600 text-white font-semibold shadow-lg">
                            Đặt đơn - {total.toLocaleString()}đ
                        </button>
                    </div>
                </div>


            </div>
        </div>
    );
}