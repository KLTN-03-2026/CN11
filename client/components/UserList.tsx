'use client';

import { UserType } from "@/types/data";
import { motion } from "framer-motion";
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';



interface Props {
  users: UserType[];
}

export default function UserList({ users }: Props) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
      <h2 className="mb-4 font-semibold">👤 Danh sách User</h2>

      <SimpleBar style={{maxHeight:400}}>
        {users?.map((user) => (
          <motion.div
            key={user.id}
            whileHover={{ backgroundColor: "#111" }}
            className="p-3 rounded-lg border border-white/10 mb-2 flex justify-between items-center"
          >
            <div>
              <p className="font-medium">{user?.username}</p>
              <p className={`text-xs ${user?.email ? "text-gray-400" : "text-red-600"}`}>{user?.email ? user?.email : "Chưa thêm email vào tài khoản"}</p>
            </div>

            <div className="text-right text-sm">
              <p
                className={
                  user?.role?.value === "Admin"
                    ? "text-yellow-400"
                    : user?.role?.value === "Staff"
                      ? "text-blue-400"
                      : "text-green-400"
                }
              >
                {user?.role?.value}
              </p>

              <p
                className={
                  user?.active === true
                    ? "text-green-400 text-xs"
                    : "text-gray-400 text-xs"
                }
              >
                {user?.active ? "Đang hoạt động" : "Tài không cấp hoạt động"}
              </p>
            </div>
          </motion.div>
        ))}
      </SimpleBar>
    </div>
  );
}