"use client";

import { useCart } from "@/app/context/CartContext";
import { useState } from "react";

type Dish = {
    id: string;
    name: string;
};

type Props = {
    isOpen: boolean;
    onClose: () => void;
    dishes: Dish[];
    onSubmit: (data: { dishId: string; time: string }) => void;
};

export default function AddCookingTimeModal({
    isOpen,
    onClose,
    dishes,
    onSubmit,
}: Props) {
    const [selectedDish, setSelectedDish] = useState<string>("");
    const [time, setTime] = useState<string>("");
  
    const { messageApi } = useCart();

    if (!isOpen) return null;

    const handleSubmit = () => {
        if (!selectedDish || time.length <= 0) {
            messageApi.error("Bạn vui lòng nhập đầy đủ thông tin !");
            return
        };
        onSubmit({ dishId: selectedDish, time });
        setSelectedDish("");
        setTime("");
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">

            <div className="w-full max-w-md rounded-2xl bg-linear-to-br from-[#111827] to-[#1f2937] p-6 shadow-2xl border border-gray-700">


                <h2 className="text-xl font-semibold text-white mb-4">
                    Thêm thời gian nấu
                </h2>


                <div className="mb-4">
                    <label className="block text-sm text-gray-400 mb-2">
                        Chọn món ăn
                    </label>
                    <select
                        value={selectedDish}
                        onChange={(e) => setSelectedDish(e.target.value)}
                        className="w-full rounded-xl bg-[#0f172a] border border-gray-600 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    >
                        <option value="">-- Chọn món --</option>
                        {dishes.map((dish) => (
                            <option key={dish.id} value={dish.id}>
                                {dish.name}
                            </option>
                        ))}
                    </select>
                </div>


                <div className="mb-6">
                    <label className="block text-sm text-gray-400 mb-2">
                        Thời gian nấu (phút)
                    </label>
                    <input
                        type="text"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full rounded-xl bg-[#0f172a] border border-gray-600 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                        placeholder="Nhập thời gian..."
                    />
                </div>


                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 cursor-pointer rounded-xl bg-gray-700 text-gray-300 hover:bg-gray-600 transition"
                    >
                        Huỷ
                    </button>

                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 cursor-pointer rounded-xl bg-linear-to-r from-blue-500 to-indigo-500 text-white font-medium hover:opacity-90 transition"
                    >
                        Thêm
                    </button>
                </div>
            </div>
        </div>
    );
}