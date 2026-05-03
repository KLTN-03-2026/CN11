"use client";

import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";

type Props = {
    count: number;
    total: number;
    onClick?: () => void;
};

export default function CartButton({ count, total, onClick }: Props) {
    return (
        <motion.div
            onClick={onClick}
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}

            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}

            className="
        fixed bottom-24 right-6 z-50
        cursor-pointer
      "
        >
            <div className="
        flex items-center gap-3
        px-5 py-3 rounded-full
        bg-linear-to-r from-red-500 to-red-600
        shadow-lg shadow-red-500/30
        text-white font-medium
      ">
                <ShoppingCart size={20} />

                <span>{count} món</span>

                <span className="opacity-80">|</span>

                <span>{total.toLocaleString()} đ</span>
            </div>
        </motion.div>
    );
}