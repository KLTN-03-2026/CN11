"use client"

import { useState, ChangeEvent, FormEvent } from "react"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Facebook, Instagram, Send } from "lucide-react"
import { useCart } from "@/app/context/CartContext"
import moment from "moment"
import SendingEmailModal from "@/components/SendingEmailModal"
import { useRouter } from "next/navigation"


interface ContactForm {
    email: string
}

export default function Footer() {

    const [form, setForm] = useState<ContactForm>({
        email: ""
    })
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);

    const { messageApi } = useCart();

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setForm({
            ...form,
            email: e.target.value
        })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault()
        if (!form.email.includes("@")) {
            alert("Email không hợp lệ")
            return
        }

        setLoading(true);
        moment.locale("vi");
        const time = moment(new Date()).format("LLL");

        (async () => {
            const responsive = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/email/sendEmailRecieve`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email: form.email, time: time })
            })

            const data = await responsive?.json();
            if (data?.success) {
                setLoading(false);
                messageApi.success("Cảm ơn bạn đã liên hệ với nhà hàng!")
            } else {
                setLoading(false);
            }
        })()

        setForm({
            email: ""
        })
    }

    return (
        <footer className="relative bg-zinc-950 text-white overflow-hidden">


            <div className="absolute inset-0 opacity-30 bg-linear-to-tr from-yellow-500/20 via-red-500/10 to-transparent" />

            <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-12 relative z-10">


                <div>
                    <h2 className="text-2xl font-bold mb-4 text-yellow-400">
                        SmartOps Restaurant
                    </h2>

                    <p className="text-zinc-400 text-sm leading-relaxed text-justify">
                        Nhà hàng SmartOps mang đến trải nghiệm ẩm thực hiện đại
                        với công nghệ đặt món QR, thanh toán thông minh và
                        dịch vụ chuyên nghiệp.
                    </p>

                    <div className="mt-6 space-y-2 text-sm text-zinc-400">

                        <div className="flex items-center gap-2">
                            <MapPin size={16} />
                            Đà Nẵng, Việt Nam
                        </div>

                        <div className="flex items-center gap-2">
                            <Phone size={16} />
                            0336 099 317
                        </div>

                        <div className="flex items-center gap-2">
                            <Mail size={16} />
                            nguyenkiencnttltv@gmail.com
                        </div>

                    </div>
                </div>


                <div>
                    <h3 className="text-lg font-semibold mb-4 text-yellow-400">
                        Liên kết nhanh
                    </h3>

                    <ul className="space-y-3 text-zinc-400 text-sm">

                        <li onClick={() => router.push("/")} className="hover:text-yellow-400 cursor-pointer transition">
                            Trang chủ
                        </li>

                        <li onClick={() => router.push("/menu")} className="hover:text-yellow-400 cursor-pointer transition">
                            Thực đơn
                        </li>

                        <li onClick={() => router.push("/reservation")} className="hover:text-yellow-400 cursor-pointer transition">
                            Đặt bàn
                        </li>

                        <li onClick={() => router.push("/")} className="hover:text-yellow-400 cursor-pointer transition">
                            Giới thiệu
                        </li>

                    </ul>
                </div>


                <div>
                    <h3 className="text-lg font-semibold mb-4 text-yellow-400">
                        Giờ mở cửa
                    </h3>

                    <ul className="space-y-2 text-sm text-zinc-400">

                        <li>Thứ 2 - Thứ 6</li>
                        <li>10:00 - 22:00</li>

                        <li className="mt-3">Thứ 7 - Chủ nhật</li>
                        <li>09:00 - 23:00</li>

                    </ul>
                </div>


                <div>
                    <h3 className="text-lg font-semibold mb-4 text-yellow-400">
                        Liên hệ với chúng tôi
                    </h3>

                    <p className="text-sm text-zinc-400 mb-4">
                        Nhập email để nhận ưu đãi mới nhất từ nhà hàng.
                    </p>

                    <form onSubmit={handleSubmit} className="flex">

                        <input
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="Nhập email..."
                            className="w-full px-4 py-2 rounded-l-lg bg-zinc-900 border border-zinc-700 focus:outline-none"
                        />

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            type="submit"
                            className="bg-yellow-500 cursor-pointer px-4 rounded-r-lg flex items-center justify-center"
                        >
                            <Send size={18} />
                        </motion.button>

                    </form>


                    <div className="flex gap-4 mt-6">

                        <motion.div whileHover={{ scale: 1.2 }}>
                            <Facebook className="cursor-pointer text-zinc-400 hover:text-white" />
                        </motion.div>

                        <motion.div whileHover={{ scale: 1.2 }}>
                            <Instagram className="cursor-pointer text-zinc-400 hover:text-white" />
                        </motion.div>

                    </div>

                </div>

            </div>

            <SendingEmailModal open={loading} />

            <div className="border-t border-zinc-800 py-6 text-center text-sm text-zinc-500">
                © {new Date().getFullYear()} SmartOps Restaurant. All rights reserved.
            </div>

        </footer>
    )
}