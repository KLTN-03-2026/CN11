'use client';

import { FC, useState } from "react";
import { motion } from "framer-motion";
import { Lock, Bell, Mail, ShieldAlert } from "lucide-react";

const SettingsPage: FC = () => {
  const [emailVerified, setEmailVerified] = useState<boolean>(true);
  const [notifications, setNotifications] = useState<boolean>(true);

  return (
    <div className="space-y-6">

      <h2 className="text-xl font-semibold">Cài đặt tài khoản</h2>

     
      <div className="p-5 rounded-2xl bg-[#111] border border-white/10">
        <h3 className="text-sm mb-4">Thông tin cá nhân</h3>

        <div className="grid md:grid-cols-2 gap-4">
          <input
            className="bg-black border border-white/10 rounded-lg px-3 py-2 text-sm"
            placeholder="Họ tên"
            defaultValue="Trung Kiên"
          />
          <input
            className="bg-black border border-white/10 rounded-lg px-3 py-2 text-sm"
            placeholder="Số điện thoại"
            defaultValue="0123456789"
          />
        </div>

        <button className="mt-4 px-4 py-2 bg-white text-black rounded-lg text-sm hover:opacity-90 transition">
          Lưu thay đổi
        </button>
      </div>

    
      <div className="p-5 rounded-2xl bg-[#111] border border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Mail size={18} className="text-green-400" />
          <div>
            <p className="text-sm">Email</p>
            <p className="text-xs text-gray-400">
              {emailVerified ? "Đã xác minh" : "Chưa xác minh"}
            </p>
          </div>
        </div>

        {!emailVerified && (
          <button
            onClick={() => setEmailVerified(true)}
            className="px-3 py-1.5 bg-blue-500/20 text-blue-400 rounded-lg text-sm"
          >
            Xác minh
          </button>
        )}
      </div>

     
      <div className="p-5 rounded-2xl bg-[#111] border border-white/10">
        <div className="flex items-center gap-2 mb-4">
          <Lock size={18} />
          <h3 className="text-sm">Đổi mật khẩu</h3>
        </div>

        <div className="space-y-3">
          <input
            type="password"
            placeholder="Mật khẩu cũ"
            className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-sm"
          />
          <input
            type="password"
            placeholder="Mật khẩu mới"
            className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-sm"
          />
        </div>

        <button className="mt-4 px-4 py-2 bg-white text-black rounded-lg text-sm">
          Cập nhật mật khẩu
        </button>
      </div>

      
      <div className="p-5 rounded-2xl bg-[#111] border border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Bell size={18} />
          <div>
            <p className="text-sm">Thông báo</p>
            <p className="text-xs text-gray-400">
              Nhận thông báo ưu đãi & đơn hàng
            </p>
          </div>
        </div>

       
        <div
          onClick={() => setNotifications(!notifications)}
          className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition
            ${notifications ? "bg-green-400" : "bg-gray-600"}`}
        >
          <motion.div
            layout
            className="w-4 h-4 bg-white rounded-full"
          />
        </div>
      </div>

    
      <div className="p-5 rounded-2xl bg-red-500/10 border border-red-500/30">
        <div className="flex items-center gap-2 mb-3 text-red-400">
          <ShieldAlert size={18} />
          <h3 className="text-sm">Vùng nguy hiểm</h3>
        </div>

        <p className="text-xs text-gray-400 mb-3">
          Hành động này không thể hoàn tác
        </p>

        <button className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm hover:opacity-90 transition">
          Xoá tài khoản
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;