'use client';

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

interface Props {
  label?: string;
}

export default function BackButton({ label = "Quay lại" }: Props) {
  const router = useRouter();
  const [ripple, setRipple] = useState<{ x: number; y: number } | null>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();

    setRipple({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });

    setTimeout(() => setRipple(null), 500);

    router.back();
  };

  return (
    <button
      onClick={handleClick}
      className="relative overflow-hidden group flex items-center gap-2 px-4 py-2 rounded-xl
      bg-white/5 border border-white/10 text-white
      backdrop-blur-md
      transition-all duration-300
      hover:bg-white/10 hover:scale-105 active:scale-95"
    >
    
      <span className="relative z-10 transition-transform duration-300 group-hover:-translate-x-1">
        <ArrowLeft size={18} />
      </span>

     
      <span className="relative z-10 text-sm">
        {label}
      </span>

   
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-white/10 transition" />

     
      {ripple && (
        <span
          className="absolute bg-white/30 rounded-full animate-ping"
          style={{
            top: ripple.y,
            left: ripple.x,
            width: 100,
            height: 100,
            transform: "translate(-50%, -50%)",
          }}
        />
      )}
    </button>
  );
}