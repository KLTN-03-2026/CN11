'use client';

import { useCart } from "@/app/context/CartContext";
import { UserType } from "@/types/data";
import { useState } from "react";

interface Props {
  onAdd: (user: UserType) => void;
}

export default function AddUserForm({ onAdd }: Props) {
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<string>("R3");
  const { setIsCreate, setIsAcctive, messageApi } = useCart();

  const handleAdd = () => {
    if (!name || !phone || !password) {
      setIsCreate(false);
      messageApi.error("Bạn vui lòng điền đầy đủ thông tin để tạo tài khoản.");
      return;
    };
    setIsCreate(true);
    setIsAcctive("Đang tạo tài khoản cho bạn...")
    setTimeout(() => {
      const newUser: UserType = {
        active: true,
        address: "",
        avatar: {
          avatarlink: ""
        },
        codeuser: "",
        createdAt: "",
        email: password,
        id: 0,
        isVerify: false,
        phone,
        role: {
          code: role,
          value: role === "R1" ? "Admin" : role === "R2" ? "Chef" : role === "R3" ? "Customer" : role === "R5" ? "Waiter" : "Staff"
        },
        tag: "#",
        updatedAt: "",
        username: name,

      };

      onAdd(newUser);
    }, 2000);

    setName("");
    setPhone("");
    setPassword("");
    setRole("R3");
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-4">
      <h2 className="font-semibold">➕ Thêm tài khoản</h2>

      <input
        placeholder="Họ và tên"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 outline-none bg-[#111] border border-white/10 rounded"
      />

      <input
        placeholder="Số điện thoại"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="w-full p-2 outline-none bg-[#111] border border-white/10 rounded"
      />

      <input
        placeholder="Mật khẩu"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 outline-none bg-[#111] border border-white/10 rounded"
      />

      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="w-full p-2 outline-none bg-[#111] border border-white/10 rounded"
      >
        <option value="R1">Admin</option>
        <option value="R4">Staff</option>
        <option value="R2">Chef</option>
        <option value="R3">Customer</option>
        <option value="R5">Waiter</option>
      </select>

      <button
        onClick={handleAdd}
        className="w-full cursor-pointer bg-green-600 py-2 rounded-md hover:bg-green-700"
      >
        Thêm tài khoản
      </button>
    </div>
  );
}