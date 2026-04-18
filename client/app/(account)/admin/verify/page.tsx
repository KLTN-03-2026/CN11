'use client';

import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import StatusCard from "@/components/utils/StatusCard";
import { UserType } from "@/types/data";
import { useCart } from "@/app/context/CartContext";

type Role = "Admin" | "Staff" | "Chef" | "Customer";




export default function RoleManagement() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [search, setSearch] = useState<string>("");
  const [filterRole, setFilterRole] = useState<Role | "all">("all");

  const { messageApi, setIsCreate, setIsAcctive } = useCart();
  const [accounts, setAccounts] = useState<number>(0);
  const [userNoverify, setUsersNoVerify] = useState<number>(0);


  useEffect(() => {
    const callAPICount = async () => {

      const accountsAPI = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/count/accounts`,
        { method: "GET" }
      )

      const usersAPI = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/users`,
        { method: "GET" }
      )

      const userNoVerifyRoleAPI = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/role-no-verify`,
        { method: "GET" }
      )



      const dataAcc = await accountsAPI?.json();
      const dataUsers = await usersAPI?.json();
      const dataUsersNoVery = await userNoVerifyRoleAPI?.json();


      if (dataAcc?.error === 0) {
        setAccounts(dataAcc?.data);
      }
      if (dataUsers?.error === 0) {
        setUsers(dataUsers?.data);
      }

      if (dataUsersNoVery?.error === 0) {
        setUsersNoVerify(dataUsersNoVery?.data);
      }

    }

    callAPICount();
  }, [])

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchSearch =
        user?.username?.toLowerCase().includes(search.toLowerCase())


      const matchRole =
        filterRole === "all" || user?.role?.value === filterRole;

      return matchSearch && matchRole;
    });
  }, [users, search, filterRole]);

  const setRole = (userId: string, role: Role) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user?.codeuser === userId
          ? {
            ...user,
            role: {
              ...user.role,
              value: role,
            },
          }
          : user
      )
    );

    setIsCreate(true);
    setIsAcctive("Đang cập nhật lại vai trò của người dùng ...");
    setTimeout(async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/user/set-role/${userId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              role,
            }),
          }
        );

        const data = await res.json();

        if (data?.error !== 0) {
          messageApi.error("Cập nhật không thành công !");
          setIsCreate(false);
        } else {
          messageApi.success("Cập nhật thành công !");
          setIsCreate(false);
          setTimeout(() => {
            if (typeof window != "undefined") {
              location.reload();
            }
          }, 2000);
        }
      } catch (error) {
        console.error(error);
      }
    }, 3000);

  };

  const isScrollable = filteredUsers.length > 15;

  return (
    <div className="flex-1 space-y-10 p-6">
      <div className="grid grid-cols-3 gap-6">

        <StatusCard
          title="Tài khoản"
          value={accounts}
        />
        <StatusCard
          title="Đã phân quyền"
          value={accounts}
        />

        <StatusCard
          title="Chưa phân quyền"
          value={userNoverify}
        />


      </div>
      <div className=" bg-[#0a0a0a] min-h-screen text-white space-y-6">




        <div className="flex flex-col md:flex-row gap-4">
          <input
            placeholder="🔍 Tìm tên ..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 p-3 rounded-lg bg-[#111] border border-white/10"
          />

          <select
            value={filterRole}
            onChange={(e) =>
              setFilterRole(e.target.value as Role | "all")
            }
            className="p-3 rounded-lg bg-[#111] border border-white/10"
          >
            <option value="all">Tất cả</option>
            <option value="Admin">Admin</option>
            <option value="Staff">Staff</option>
            <option value="Chef">Chef</option>
            <option value="Customer">Customer</option>
          </select>
        </div>


        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">


          <div className="grid grid-cols-5 px-4 py-3 text-sm text-gray-400 border-b border-white/10">
            <div>User</div>
            <div className="">Admin</div>
            <div className="">Staff</div>
            <div className="">Chef</div>
            <div className="">Khách hàng</div>
          </div>


          <div
            className={`${isScrollable ? "max-h-150 overflow-y-auto" : ""
              }`}
          >
            {filteredUsers.map((user) => (
              <motion.div
                key={user.id}
                whileHover={{ backgroundColor: "#111" }}
                className="grid grid-cols-6 px-4 py-3 items-center border-b border-white/5"
              >
                <div className="font-medium">{user?.username}</div>



                <div className="ml-12">
                  <input
                    type="checkbox"
                    name="role"
                    checked={user?.role?.value === "Admin"}
                    onChange={() => setRole(user?.codeuser, "Admin")}
                    className="w-5 h-5 accent-yellow-400"
                  />
                </div>


                <div className="ml-20">
                  <input
                    type="checkbox"
                    name="role"
                    checked={user?.role?.value === "Staff"}
                    onChange={() => setRole(user?.codeuser, "Staff")}
                    className="w-5 h-5 accent-blue-400"
                  />
                </div>


                <div className="ml-30">
                  <input
                    type="checkbox"
                    name="role"
                    checked={user?.role?.value === "Chef"}
                    onChange={() => setRole(user?.codeuser, "Chef")}
                    className="w-5 h-5 accent-green-400"
                  />
                </div>

                <div className="ml-45">
                  <input
                    type="checkbox"
                    name="role"
                    checked={user?.role?.value === "Customer"}
                    onChange={() => setRole(user?.codeuser, "Customer")}
                    className="w-5 h-5 accent-pink-600"
                  />
                </div>
              </motion.div>
            ))}

            {filteredUsers.length === 0 && (
              <div className="text-center py-10 text-gray-400">
                Không tìm thấy user
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}