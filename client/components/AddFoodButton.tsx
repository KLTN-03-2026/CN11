'use client';

import { useState } from "react";
import { Plus } from "lucide-react";

interface Props {
  onClick?: () => void;
}

export default function AddFoodButton({ onClick }: Props) {
  const [ripple, setRipple] = useState<{ x: number; y: number } | null>(null);

  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setRipple({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });

    setTimeout(() => setRipple(null), 500);

    onClick?.();
  };

  return (
    <button
      onClick={handleClick}
      className="relative overflow-hidden group flex items-center gap-2 px-5 py-3 rounded-xl cursor-pointer
      bg-linear-to-r from-orange-500 via-red-500 to-pink-500
      text-white font-medium shadow-lg
      transition-all duration-300
      hover:scale-105 hover:shadow-orange-500/40 active:scale-95"
    >
     
      <span className="relative z-10 transition-transform duration-300 group-hover:rotate-90">
        <Plus size={18} />
      </span>

     
      <span className="relative z-10">
        Thêm món ăn
      </span>

      
      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition" />

      {ripple && (
        <span
          className="absolute bg-white/30 rounded-full animate-ping"
          style={{
            top: ripple.y,
            left: ripple.x,
            width: 120,
            height: 120,
            transform: "translate(-50%, -50%)",
          }}
        />
      )}
    </button>
  );
}