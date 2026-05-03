"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

type SuggestItem = {
  id: string;
  name: string;
  price: number;
  image: string;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  suggestions: SuggestItem[];
  onIncrease: (id: string) => void;
  onDecrease: (id: string) => void;
  onCheckout: () => void;
  onAddSuggest: (id: string) => void;
};

export default function CartPanel({
  isOpen,
  onClose,
  items,
  suggestions,
  onIncrease,
  onDecrease,
  onCheckout,
  onAddSuggest,
}: Props) {
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          
          <motion.div
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

         
          <motion.div
            className="fixed right-0 top-0 h-full w-full max-w-md bg-[#0f172a] z-50 shadow-2xl border-l border-gray-700 flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 120 }}
          >
           
            <div className="p-5 border-b border-gray-700 flex justify-between items-center">
              <h2 className="text-white text-lg font-semibold">🛒 Giỏ hàng</h2>
              <button onClick={onClose} className="text-gray-400 cursor-pointer hover:text-white">
                ✕
              </button>
            </div>

            
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {items.length === 0 && (
                <p className="text-gray-400 text-center">
                  Chưa có món nào
                </p>
              )}

              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 bg-[#111827] p-3 rounded-xl border border-gray-700"
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={60}
                    height={60}
                    className="rounded-lg object-cover"
                  />

                  <div className="flex-1">
                    <h3 className="text-white text-sm font-medium">
                      {item.name}
                    </h3>
                    <p className="text-red-400 text-sm">
                      {item.price.toLocaleString()}đ
                    </p>

                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => onDecrease(item.id)}
                        className="px-2 cursor-pointer bg-gray-700 rounded"
                      >
                        -
                      </button>
                      <span className="text-white">{item.quantity}</span>
                      <button
                        onClick={() => onIncrease(item.id)}
                        className="px-2 cursor-pointer bg-gray-700 rounded"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              
              <div>
                <h3 className="text-white font-semibold mb-3">
                  🍣 Gợi ý cho bạn
                </h3>

                <div className="space-y-3">
                  {suggestions.map((s) => (
                    <div
                      key={s.id}
                      className="flex items-center justify-between bg-[#111827] p-3 rounded-xl border border-gray-700"
                    >
                      <div className="flex items-center gap-3">
                        <Image
                          src={s.image}
                          alt={s.name}
                          width={50}
                          height={50}
                          className="rounded-lg"
                        />
                        <div>
                          <p className="text-white text-sm">{s.name}</p>
                          <p className="text-red-400 text-xs">
                            {s.price.toLocaleString()}đ
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => onAddSuggest(s.id)}
                        className="px-3 py-1 cursor-pointer text-sm bg-red-500 rounded-lg text-white hover:bg-red-600"
                      >
                        + Thêm
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            
            <div className="p-4 border-t border-gray-700">
              <div className="flex justify-between text-white mb-3">
                <span>Tổng</span>
                <span className="text-red-400 font-semibold">
                  {total.toLocaleString()}đ
                </span>
              </div>

              <button
                onClick={onCheckout}
                className="w-full cursor-pointer py-3 rounded-xl bg-linear-to-r from-red-500 to-red-600 text-white font-semibold hover:opacity-90 transition"
              >
                Thanh toán
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}