
"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Menu, X, User, Calendar } from "lucide-react"
import dynamic from "next/dynamic";
import { UserType } from "@/types/data"

const AvatarModal = dynamic(() => import("../UserAvatarMenu"), {
    ssr: false,
});


export default function Header() {

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const userDefault = { active: false, codeuser: "", createdAt: "", email: "", id: 0, phone: "", role: { code: "", value: "" }, tag: "", updatedAt: "", username: "", avatar: { avatarlink: "" },isVerify:false,address:"" }

    const [open, setOpen] = useState<boolean>(false)
    const [scrolled, setScrolled] = useState<boolean>(false)
    const [isVerify, setIsVerify] = useState<boolean>(false)
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [user, setUser] = useState<UserType>(userDefault);
    

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50)
        }

        window.addEventListener("scroll", handleScroll)

        return () => window.removeEventListener("scroll", handleScroll)
    }, [])


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
                        const {isVerify} = data?.data;
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
        <header
            className={`fixed w-full z-50 transition-all duration-500 ${scrolled
                ? "bg-black/80 backdrop-blur-lg shadow-xl"
                : " bg-black/60 backdrop-blur-lg"
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

                <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="text-2xl font-bold text-white tracking-widest"
                >
                    SmartOps F&B
                </motion.div>


                <nav className="hidden md:flex gap-8 text-white font-medium">
                    <Link href="/" className="hover:text-yellow-400 transition">
                        Trang Chủ
                    </Link>

                    <Link href="/menu" className="hover:text-yellow-400 transition">
                        Thực Đơn
                    </Link>

                    <Link href="/about" className="hover:text-yellow-400 transition">
                        Giới Thiệu
                    </Link>

                    <Link href="/contact" className="hover:text-yellow-400 transition">
                        Liên Hệ
                    </Link>
                </nav>

                <div className="hidden md:flex items-center gap-4">

                    {!isLoggedIn && <Link
                        href="/login"
                        className="flex items-center gap-2 text-white hover:text-yellow-400 transition"
                    >
                        <User size={18} />
                        Đăng Nhập
                    </Link>}

                    {!isLoggedIn && <Link
                        href="/register"
                        className="px-4 py-2 border border-yellow-400 text-yellow-400 rounded-full hover:bg-yellow-400 hover:text-black transition"
                    >
                        Đăng Ký
                    </Link>}

                    {isLoggedIn && <div className="flex items-center justify-center">
                        <AvatarModal name={user?.username}
                            email={user?.email || "Chưa thêm tài khoản email"}
                            avatarUrl={user?.avatar?.avatarlink || "/images/daubep.jpg"}
                            isVerified={isVerify}
                            role={user?.role?.code === "R1" ? "admin" : user?.role.code === "R2" ? "vip" : "user"}
                        />
                    </div>}

                    <motion.div whileHover={{ scale: 1.05 }}>
                        <Link
                            href="/reservation"
                            className="flex items-center gap-2 bg-yellow-400 text-black px-5 py-2 rounded-full font-semibold shadow-lg hover:shadow-yellow-500/40 transition"
                        >
                            <Calendar size={18} />
                            Đặt Bàn
                        </Link>
                    </motion.div>

                </div>

                <button
                    className="md:hidden text-white"
                    onClick={() => setOpen(!open)}
                >
                    {open ? <X /> : <Menu />}
                </button>
            </div>

            {open && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="md:hidden bg-black/90 backdrop-blur-lg text-white px-6 pb-6 space-y-4"
                >
                    <Link href="/">Trang Chủ</Link>
                    <Link href="/menu">Thực Đơn</Link>
                    <Link href="/about">Giới Thiệu</Link>
                    <Link href="/contact">Liên Hệ</Link>

                    {!isLoggedIn && <Link href="/login" className="block">
                        Đăng Nhập
                    </Link>}

                    {!isLoggedIn && <Link href="/register" className="block">
                        Đăng Ký
                    </Link>}

                    <Link
                        href="/reservation"
                        className="block bg-yellow-400 text-black px-4 py-2 rounded-full text-center"
                    >
                        Đặt Bàn
                    </Link>
                </motion.div>
            )}
        </header>
    )
}