"use client"

import { UserType } from "@/types/data";
import { Bell, Coins, Search } from "lucide-react"
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CountUp from "react-countup";

const AvatarModal = dynamic(() => import("../UserAvatarMenu"), {
    ssr: false,
});

export default function HeaderDashboard() {

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const userDefault = { active: false, codeuser: "", createdAt: "", email: "", id: 0, phone: "", role: { code: "", value: "" }, tag: "", updatedAt: "", username: "", avatar: { avatarlink: "" }, isVerify: false, address: "" }


    const [isVerify, setIsVerify] = useState<boolean>(false)
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [user, setUser] = useState<UserType>(userDefault);
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== "undefined") {
            const isLogged = localStorage.getItem("auth");
            if (isLogged) {

                const token = JSON.parse(isLogged)?.token
                const callUserAPI = async () => {
                    const responsive = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/get-user`, {
                        method: "GET",
                        headers: {
                            'Conten-Type': 'application/json',
                            Authorization: `Bearer ${token}`
                        }
                    })
                    const data = await responsive?.json();


                    if (data?.error === 0) {
                        setUser(data?.data);
                        const { isVerify } = data?.data;
                        setIsVerify(isVerify);
                    } else {
                        setUser(userDefault);
                    }
                }

                callUserAPI();
                setIsLoggedIn(JSON.parse(isLogged)?.isLoggedIn);
            }
        }

    }, [userDefault])

    useEffect(() => {
        if (typeof window !== "undefined") {
            const isLogged = localStorage.getItem("auth");
            if (isLogged) {
                setIsLoggedIn(JSON.parse(isLogged)?.isLoggedIn);
            }
        }
    }, [isLoggedIn])

    return (

        <header className="h-16 border-b border-zinc-800 bg-black/40 backdrop-blur-xl flex items-center justify-between px-6">

            <div className="flex items-center gap-3 bg-zinc-900 px-4 py-2 rounded-lg w-80">

                <Search size={18} className="text-zinc-400" />

                <input
                    type="text"
                    placeholder="Tìm món ăn, đơn hàng..."
                    className="bg-transparent outline-none text-sm w-full"
                />

            </div>


            <div className="flex items-center gap-6">

                <button className="relative cursor-pointer" onClick={() => router.push("/staff/bell")}>
                    <Bell size={20} />
                    <span className="absolute -top-2 -right-2 w-2 h-2 bg-red-500 rounded-full" />
                </button>

                <button className="cursor-pointer text-yellow-300 flex items-end justify-center gap-2">
                    <Coins size={20} />
                    <div className="flex gap-1">
                        <CountUp className="text-[12px]" end={1000000} duration={2} />
                        <div className="text-[12px]">xu</div>
                    </div>
                </button>

                <div className="flex items-center gap-2">
                    {isLoggedIn && <div className="flex items-center justify-center">
                        <AvatarModal name={user?.username}
                            email={user?.email || "Chưa thêm tài khoản email"}
                            avatarUrl={user?.avatar?.avatarlink || "/images/daubep.jpg"}
                            isVerified={isVerify}
                            role={user?.role?.code === "R1" ? "admin" : user?.role.code === "R2" ? "vip" : "user"}
                        />
                    </div>}

                </div>

            </div>

        </header>

    )
}