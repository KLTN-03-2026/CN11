'use client';

import { FC, useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  LogOut,
  Settings,
  User,
  CheckCircle,
  AlertCircle,
  Crown,
  Sparkles,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { getUserCurrent, logout } from "@/store/state/auth";
import { useCart } from "@/app/context/CartContext";

type Role = "admin" | "vip" | "user";

type UserAvatarMenuProps = {
  name: string;
  email: string;
  avatarUrl: string;
  isVerified: boolean;
  role: Role;
};

const getRoleBadge = (role: Role) => {
  switch (role) {
    case "admin":
      return (
        <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 text-xs">
          <Crown size={12} />
          Admin
        </div>
      );
    case "vip":
      return (
        <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-400 text-xs">
          <Sparkles size={12} />
          VIP
        </div>
      );
    default:
      return <div></div>
  }
};

const UserAvatarMenu: FC<UserAvatarMenuProps> = ({
  name,
  email,
  avatarUrl,
  isVerified,
  role,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const { messageApi } = useCart();
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getUserCurrent());
  }, [dispatch])
  const router = useRouter();
  const handdleClose = async () => {
    await dispatch(logout());
    setTimeout(() => {
      messageApi.success("Đăng xuất tài khoản thành công !");
    }, 1000)
    setTimeout(() => {
      if (typeof window !== "undefined") {
        location.reload();
      }
    }, 2000)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/10 transition cursor-pointer"
      >
        <div className="relative w-10 h-10">
          <Image
            src={avatarUrl}
            alt="avatar"
            fill
            className="rounded-full object-cover border border-white/20"
          />
        </div>

        <div className="hidden md:flex flex-col text-left">
          <div className="flex gap-2 items-center">
            <div className="text-sm text-white font-medium leading-tight">
              {name} </div><div>
              {getRoleBadge(role)}
            </div>
          </div>
          <div className="text-xs mt-1 flex gap-1">
            {isVerified ? (
              <>
                <CheckCircle size={14} className="text-green-400" />
                <span className="text-green-400">
                  Đã xác minh
                </span>
              </>
            ) : (
              <>
                <AlertCircle size={14} className="text-yellow-400" />
                <span className="text-yellow-400">
                  Chưa xác minh
                </span>
              </>
            )}
          </div>
        </div>

        <ChevronDown className="text-gray-400" size={18} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="absolute right-0 mt-3 w-72 bg-[#111] border border-white/10 rounded-2xl shadow-2xl p-4 z-50"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center gap-3 pb-3 border-b border-white/10">
              <div className="relative w-12 h-12">
                <Image
                  src={avatarUrl}
                  alt="avatar"
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-white font-semibold">{name}</span>
                <span className="text-xs text-gray-400">{email}</span>
                <div className="flex items-center gap-1 text-xs">
                  {isVerified ? (
                    <>
                      <CheckCircle size={14} className="text-green-400" />
                      <span className="text-green-400">Đã xác minh</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle size={14} className="text-yellow-400" />
                      <span className="text-yellow-400">Chưa xác minh</span>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="mt-3 flex flex-col gap-2">
              <button onClick={() => router.push("/profile")} className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 text-gray-300 hover:text-white transition cursor-pointer">
                <User size={16} />
                Hồ sơ
              </button>
              <button onClick={() => router.push("/profile/settings")} className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 text-gray-300 hover:text-white transition cursor-pointer">
                <Settings size={16} />
                Cài đặt
              </button>
              <button onClick={handdleClose} className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-red-500/20 text-red-400 hover:text-red-300 transition cursor-pointer">
                <LogOut size={16} />
                Đăng xuất
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserAvatarMenu;