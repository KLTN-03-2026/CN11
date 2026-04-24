"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

type Chef = {
  id: string;
  name: string;
  isAvailable: boolean;
};

type Dish = {
  id: string;
  name: string;
  quantity: number;
};

type AssignPayload = {
  chefId: string;
  dishIds: string[];
  note: string;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  chefs: Chef[];
  dishes: Dish[];
  onAssign: (data: AssignPayload) => Promise<void>;
};

export default function AssignChefModal({
  isOpen,
  onClose,
  chefs,
  dishes,
  onAssign,
}: Props) {
  const [selectedChef, setSelectedChef] = useState<string>("");
  const [selectedDishes, setSelectedDishes] = useState<string[]>([]);
  const [note, setNote] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const toggleDish = (id: string) => {
    setSelectedDishes((prev) =>
      prev.includes(id)
        ? prev.filter((d) => d !== id)
        : [...prev, id]
    );
  };

  const handleSubmit = async () => {
    if (!selectedChef || selectedDishes.length === 0) return;

    setLoading(true);
    await onAssign({
      chefId: selectedChef,
      dishIds: selectedDishes,
      note,
    });
    setLoading(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Modal */}
          <motion.div
            className="w-130 rounded-2xl bg-white p-6 shadow-2xl border border-gray-200"
            initial={{ scale: 0.9, y: 40 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 40 }}
          >
            {/* Title */}
            <h2 className="text-xl font-bold text-gray-800 mb-6">
              👨‍🍳 Bàn giao cho đầu bếp
            </h2>

            {/* Chef */}
            <div className="mb-6">
              <p className="text-sm font-semibold text-gray-700 mb-3">
                Chọn đầu bếp
              </p>

              <div className="grid grid-cols-2 gap-3">
                {chefs.map((chef) => {
                  const disabled = !chef.isAvailable;
                  const active = selectedChef === chef.id;

                  return (
                    <button
                      key={chef.id}
                      disabled={disabled}
                      onClick={() => setSelectedChef(chef.id)}
                      className={`
                        p-3 rounded-xl border text-sm transition
                        ${
                          active
                            ? "bg-indigo-600 text-white border-indigo-600 shadow"
                            : disabled
                            ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                            : "bg-white text-gray-700 border-gray-300 hover:bg-indigo-50"
                        }
                      `}
                    >
                      <div className="font-medium">{chef.name}</div>
                      <div className="text-xs mt-1">
                        {disabled ? "Đang bận" : "Đang rảnh"}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Dish */}
            <div className="mb-6">
              <p className="text-sm font-semibold text-gray-700 mb-3">
                Chọn món
              </p>

              <div className="space-y-2 max-h-44 overflow-y-auto pr-1">
                {dishes.map((dish) => {
                  const active = selectedDishes.includes(dish.id);

                  return (
                    <div
                      key={dish.id}
                      onClick={() => toggleDish(dish.id)}
                      className={`
                        flex justify-between items-center
                        p-3 rounded-xl border cursor-pointer transition
                        ${
                          active
                            ? "bg-indigo-100 border-indigo-500"
                            : "bg-white border-gray-300 hover:bg-gray-50"
                        }
                      `}
                    >
                      <span className="text-sm text-gray-800 font-medium">
                        {dish.name} x{dish.quantity}
                      </span>

                      <div
                        className={`
                          w-5 h-5 rounded-full border flex items-center justify-center
                          ${
                            active
                              ? "bg-indigo-600 border-indigo-600"
                              : "border-gray-400"
                          }
                        `}
                      >
                        {active && (
                          <div className="w-2 h-2 bg-white rounded-full" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Note */}
            <textarea
              placeholder="Ghi chú cho đầu bếp..."
              value={note}
              spellCheck={false}
              onChange={(e) => setNote(e.target.value)}
              className="w-full p-3 rounded-xl border text-black border-gray-300 mb-6
              focus:outline-none focus:ring-2 resize-none focus:ring-indigo-500"
            />

            {/* Actions */}
            <div className="flex justify-end gap-3">
              <button
                onClick={onClose}
                className="px-4 cursor-pointer py-2 rounded-xl text-black border border-gray-300 hover:bg-gray-100"
              >
                Huỷ
              </button>

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="px-5 py-2 cursor-pointer rounded-xl bg-indigo-600 text-white shadow hover:bg-indigo-700 transition"
              >
                {loading ? "Đang giao..." : "Xác nhận"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}