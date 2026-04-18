'use client';

import { FC } from "react";
import { motion } from "framer-motion";
import {
    User,
    ClipboardList,
    Calendar,
    Gift,
    Settings,
    LogOut,
    SquareArrowRightExit
} from "lucide-react";
import { useRouter } from "next/navigation";
import { logout } from "@/store/state/auth";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { useCart } from "@/app/context/CartContext";

type MenuItem = {
    id: string;
    label: string;
    icon: React.ReactNode;
};

type ProfileSidebarProps = {
    active: string;
    onChange: (id: string) => void;
};

const menuItems: MenuItem[] = [
    { id: "profile", label: "Thông tin cá nhân", icon: <User size={18} /> },
    { id: "orders", label: "Lịch sử đặt bàn", icon: <Calendar size={18} /> },
    { id: "history", label: "Đơn hàng", icon: <ClipboardList size={18} /> },
    { id: "rewards", label: "Điểm thưởng", icon: <Gift size={18} /> },
    { id: "settings", label: "Cài đặt", icon: <Settings size={18} /> },
    { id: "home", label: "Màn hình", icon: <SquareArrowRightExit size={18} /> },
];

const ProfileSidebar: FC<ProfileSidebarProps> = ({
    active,
    onChange,
}) => {

    const { setIsAcctive, setIsCreate } = useCart();
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();

    const handleSidebar = (item: MenuItem) => {
        onChange(item.id)
        const params = item?.id === "profile" ? "/profile" : item?.id === "home" ? "/" : "/profile/" + item?.id;
        router.push(params);
    }

    const handleLogout = () => {
        setIsCreate(true);
        setIsAcctive("Đang đăng xuất tài khoản ! Vui lòng chờ trong giây lát ...");
        setTimeout(async () => {
            setTimeout(() => {
                setIsAcctive("Đang chuyển hướng về trang chủ ...");
            }, 1000);
            await dispatch(logout())
            setTimeout(() => {
                setIsCreate(false);
                router.push("/");
            }, 2000);
        }, 2000)
    }

    return (
        <div className="w-64 h-full bg-[#0f0f0f] border-r border-white/10 p-4 flex flex-col justify-between">


            <div className="flex flex-col gap-2">
                {menuItems.map((item) => {
                    const isActive = active === item.id;

                    return (
                        <button
                            key={item.id}
                            onClick={() => handleSidebar(item)}
                            className={`relative cursor-pointer flex items-center gap-3 px-4 py-3 rounded-xl transition 
                ${isActive ? "text-white " : "text-gray-400 hover:text-white hover:bg-white/10"}`}
                        >
                            {item.icon}
                            <span className="text-sm">{item.label}</span>

                            {isActive && (
                                <motion.div
                                    layoutId="active-bg"
                                    className="absolute inset-0 bg-white/10 rounded-xl -z-10"
                                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                />
                            )}
                        </button>
                    );
                })}
            </div>

            <button onClick={handleLogout} className="flex cursor-pointer items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/20 transition">
                <LogOut size={18} />
                Đăng xuất
            </button>
        </div>
    );
};

export default ProfileSidebar;