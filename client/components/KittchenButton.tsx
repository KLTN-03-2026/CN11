"use client";

import { motion } from "framer-motion";

type Status = "new" | "cooking" | "done";

type Props = {
    status: Status;
    onClick?: () => void;
    children: React.ReactNode;
};

export default function KitchenButton({ status, onClick, children }: Props) {
    const styles = {
        new: {
            bg: "from-blue-500 to-indigo-500",
            glow: "shadow-blue-500/30",
        },
        cooking: {
            bg: "from-orange-500 to-red-500",
            glow: "shadow-red-500/40",
        },
        done: {
            bg: "from-green-500 to-emerald-500",
            glow: "shadow-green-500/30",
        },
    };

    const current = styles[status];

    return (
        <motion.button
            onClick={onClick}

            
            whileHover={{
                scale: 1.05,
                boxShadow: "0px 0px 20px rgba(255,255,255,0.2)",
            }}

            
            whileTap={{ scale: 0.95 }}

            
            animate={{
                opacity: [1, 0.85, 1],
            }}

            transition={{
                duration: 1.5,
                repeat: Infinity,
            }}

            className={`
        px-4 py-2 rounded-xl text-white font-medium
        bg-linear-to-r ${current.bg}
        ${current.glow}
        shadow-lg
        text-xs
        cursor-pointer
        transition-all
      `}
        >
            {children}
        </motion.button>
    );
}