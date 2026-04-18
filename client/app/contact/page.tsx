'use client';

import { ChangeEvent, useState } from "react";
import { motion } from "framer-motion";
import Footer from "@/components/partials/Footer";
import Header from "@/components/partials/Header";
import SendingEmailModal from "@/components/SendingEmailModal";
import { useCart } from "@/app/context/CartContext";
import { validateEmail, validateMessage, validateName } from "@/utils/functions/validate.utils";

export default function ContactPage() {
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState({
        name: "",
        email: "",
        message: "",
    });

    const { messageApi } = useCart();

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ): void => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {

        if (form.email === "" && form.name === "" && form.message === "") {
            messageApi.error("Bạn vui lòng nhập đầy đủ thông tin vào biểu mẫu.")
            return;
        }

        if (!validateName(form.name)) {
            messageApi.error("Bạn vui lòng nhập đầy đủ tên. Ít nhất 2 ký tự.")
            return;
        }

        if (form.email === "") {
            messageApi.error("Bạn vui lòng không bỏ trống email.")
            return;
        }

        if (!validateEmail(form.email)) {
            messageApi.error("Bạn vui lòng nhập đúng định dạng email.")
            return;
        }


        if (!validateMessage(form.message)) {
            messageApi.error("Bạn vui lòng nhập đầy đủ nội dung. Ít nhất 2 ký tự.")
            return;
        }


        setOpen(true);
        setTimeout(async () => {
            const responsive = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/add-contact`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name: form.name, email: form.email, des: form.message })
            })

            const data = await responsive.json();
            console.log(data)
            if (data?.error === 0) {
                setOpen(false);
                messageApi.success("Gửi liên hệ tới admin thành công ! Cảm ơn bạn " + form.email + ".")
                setForm({
                    name: "",
                    email: "",
                    message: "",
                })
            } else {
                setOpen(false);
                messageApi.error("Gửi liên hệ tới admin không thành công ! Bạn vui lòng gửi lại liên hệ.")
            }
        }, 3000)

    };

    return (
        <div>
            <Header />
            <section className="relative min-h-screen pt-15 text-white">


                <div className="absolute inset-0 bg-black" />
                <div className="absolute inset-0 bg-linear-to-br from-black via-[#1a0f0f] to-black opacity-90" />


                <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">


                    <div className="text-center mb-16">
                        <p className="text-red-400 text-xs tracking-widest mb-2 uppercase">
                            Contact
                        </p>
                        <h1 className="text-4xl font-semibold">
                            Liên hệ với chúng tôi
                        </h1>
                    </div>

                    <div className="grid md:grid-cols-2 gap-10">


                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="space-y-6"
                        >
                            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
                                <h3 className="text-lg font-medium mb-4">Thông tin</h3>

                                <p className="text-gray-300">📍 Đà Nẵng, Việt Nam</p>
                                <p className="text-gray-300">📞 0336 099 317</p>
                                <p className="text-gray-300">✉️ nguyenkiencnttltv@gmail.com</p>

                                <div className="mt-4 text-sm text-gray-400">
                                    Giờ mở cửa: 17:00 - 22:00 mỗi ngày
                                </div>
                            </div>

                            <div className="rounded-md overflow-hidden border border-white/10">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d983827.6201890724!2d107.31547240361677!3d15.587553502374528!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314219c792252a13%3A0x1df0cb4b86727e06!2sDa%20Nang%2C%20Vietnam!5e0!3m2!1sen!2s!4v1773771803084!5m2!1sen!2s"
                                    className="w-full h-64 border-0"
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                />
                            </div>

                        </motion.div>


                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 space-y-4"
                        >
                            <h3 className="text-lg font-medium mb-2">
                                Gửi tin nhắn
                            </h3>

                            <input
                                name="name"
                                placeholder="Tên của bạn"
                                value={form.name}
                                spellCheck={false}
                                onChange={handleChange}
                                className="w-full p-3 rounded-xl bg-black/50 border border-white/10 focus:outline-none focus:border-red-500"
                            />

                            <input
                                name="email"
                                placeholder="Email"
                                value={form.email}
                                spellCheck={false}
                                onChange={handleChange}
                                className="w-full p-3 rounded-xl bg-black/50 border border-white/10 focus:outline-none focus:border-red-500"
                            />

                            <textarea
                                name="message"
                                placeholder="Nội dung..."
                                value={form.message}
                                spellCheck={false}
                                rows={7}
                                onChange={handleChange}
                                className="w-full p-3 rounded-xl bg-black/50 border border-white/10 focus:outline-none focus:border-red-500 resize-none"
                            />

                            <button
                                onClick={handleSubmit}
                                className="w-full py-3 cursor-pointer rounded-xl bg-red-600 hover:bg-red-700 transition shadow-lg shadow-red-500/30"
                            >
                                Gửi liên hệ
                            </button>
                        </motion.div>

                    </div>
                </div>
            </section>
            <SendingEmailModal open={open} />
            <Footer />
        </div>
    );
}