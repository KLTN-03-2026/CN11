'use client';

import { motion } from "framer-motion";
import { icons } from "@/utils/icons/icons.utils";
import Link from "next/link";

const { 
    ClipboardList,
    Clock,
    AlertCircle,
    Bell
} = icons;

type MenuItem = {
    icon: React.ElementType;
    label: string;
    badge?: number;
    link:string;
};

const menu: MenuItem[] = [
    { icon: ClipboardList, label: "Dashboard",link:"/chef/dashboard"},
    { icon: Clock, label: "Lịch sử",link:"/chef/history" },
    { icon: AlertCircle, label: "Món lỗi",link:"/chef/food-wrong" },
    { icon: Bell, label: "Thông báo",link:"/chef/bell" },
];

export default function ChefSidebar() {
    return (
        <div className="h-screen w-64 bg-[#0b0b0b] border-r border-white/10 flex flex-col p-4">

            
            <h1 className="text-white font-bold text-lg mb-8">
                Kitchen Panel
            </h1>

            
            <div className="space-y-2 flex-1">
                {menu.map((item, i) => (
                    <motion.div
                        key={i}
                        whileHover={{ x: 6 }}
                        className="flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer bg-white/5 hover:bg-orange-500/20 transition group"
                    >
                        <Link href={item?.link} className="flex items-center gap-3">
                            <item.icon size={18} className="text-gray-300 group-hover:text-orange-400" />
                            <span className="text-sm text-gray-300 group-hover:text-white">
                                {item.label}
                            </span>
                        </Link>

                       
                    </motion.div>
                ))}
            </div>

        </div>
    );
}