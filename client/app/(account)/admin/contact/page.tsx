'use client';

import { useEffect, useMemo, useState } from "react";
import moment from "moment";
import { useCart } from "@/app/context/CartContext";

interface Contact {
    id: number;
    name: string;
    email: string;
    des: string;
    createdAt: string;
    emailed: boolean;
}




export default function AdminContactPage() {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [search, setSearch] = useState<string>("");
    const [open, setOpen] = useState<boolean>(false);
    const { messageApi } = useCart();
    const [selected, setSelected] = useState<Contact | null>(null);
    const [emailTarget, setEmailTarget] = useState<Contact | null>(null);
    const [emailContent, setEmailContent] = useState<string>("");


    useEffect(() => {
        const callAPI = async () => {
            const responsive = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/gets-contact`, {
                method: 'GET',
            })
            const data = await responsive.json();
            if (data?.error === 0) {
                setContacts(data?.data);
            } else {
                setContacts([]);
            }
        }
        callAPI();
    }, [])

    const filtered = useMemo(() => {
        return contacts?.filter(
            (c) =>
                c.name.toLowerCase().includes(search.toLowerCase()) ||
                c.email.toLowerCase().includes(search.toLowerCase())
        );
    }, [contacts, search]);

    const handleDelete = async (id: number) => {
        const responsive = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/delete-contact/${id}`, {
            method: "DELETE"
        })


        const data = await responsive.json();

        if (data?.error === 0) {
            setContacts(data?.data);
            messageApi.success("Xoá liên hệ thành công !");
        } else {
            messageApi.error("Xoá liên hệ không thành công");
        }


    };


    const handleSendEmail = () => {
        if (!emailTarget) {
            messageApi.error("Bạn vui lòng nhập đầy đủ nội dung !.")
            return;
        }

        setOpen(true);
        setTimeout(async () => {
            const responsive = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/email/sendEmailMessage/${emailTarget?.id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name: emailTarget.name, email: emailTarget.email, message: emailContent })
            })

            const data = await responsive.json();

            if (data?.error === 0) {
                messageApi.success("Gửi email thành công đến " + emailTarget.email);
                setOpen(false);
                setContacts(data?.data);
                setEmailTarget(null);
                setEmailContent("");
            } else {
                setOpen(false);
            }
        }, 1000);


    };

    return (
        <div className="p-6 space-y-6 text-white">

          
            <div className="flex justify-between items-center">
                <h1 className="text-xl font-semibold">
                    📩 Quản lý liên hệ khách hàng
                </h1>

                <input
                    placeholder="🔍 Tìm theo tên hoặc email..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="px-3 py-2 rounded-lg bg-[#111] border border-white/10 w-72"
                />
            </div>

            
            <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">

                <div className="grid grid-cols-5 px-4 py-3 text-sm text-gray-400 border-b border-white/10">
                    <div>Tên</div>
                    <div>Email</div>
                    <div>Nội dung</div>
                    <div>Thời gian</div>
                    <div className="text-center">Hành động</div>
                </div>

              
                <div className="max-h-105 overflow-y-auto">

                    {filtered?.map((c) => (
                        <div
                            key={c.id}
                            className="grid grid-cols-5 px-4 py-3 text-sm border-b border-white/5 hover:bg-[#111]"
                        >
                            <div>{c.name}</div>

                            <div className="text-blue-400">{c.email}</div>

                            <div
                                onClick={() => setSelected(c)}
                                className="truncate cursor-pointer hover:text-white"
                            >
                                {c.des}
                            </div>

                            <div className="text-gray-400">{moment(c.createdAt).fromNow()}</div>


                            <div className="flex justify-center gap-2">


                                <>
                                    <button
                                        onClick={() => setEmailTarget(c)}
                                        className="px-3 py-1 text-xs bg-yellow-500/20 text-yellow-400 rounded hover:bg-yellow-500/40 transition"
                                    >
                                        Gửi
                                    </button>

                                    <button
                                        onClick={() => handleDelete(c.id)}
                                        className="px-3 py-1 text-xs bg-red-500/20 text-red-400 rounded hover:bg-red-500/40 transition"
                                    >
                                        Xoá
                                    </button>
                                </>

                            </div>
                        </div>
                    ))}
                </div>
            </div>


            {selected && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                    <div className="bg-[#111] border border-white/10 rounded-xl w-100 p-5 space-y-4">
                        <h2 className="text-lg font-semibold">📄 Nội dung</h2>
                        <p className="text-gray-300">{selected.des}</p>
                        <p className="text-gray-300 text-[12px]">{moment(selected.createdAt).fromNow()}</p>

                        <button
                            onClick={() => setSelected(null)}
                            className="w-full py-2 cursor-pointer bg-white/10 rounded hover:bg-white/20"
                        >
                            Đóng
                        </button>
                    </div>
                </div>
            )}

          
            {emailTarget && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

                    <div className="bg-[#111] border border-white/10 rounded-xl w-105 p-5 space-y-4">

                        <h2 className="text-lg font-semibold">
                            📩 Gửi email cảm ơn
                        </h2>

                        
                        <input
                            value={emailTarget.email}
                            disabled
                            className="w-full p-2 bg-[#222] border border-white/10 rounded text-gray-400"
                        />

                       
                        <textarea
                            value={emailContent}
                            onChange={(e) => setEmailContent(e.target.value)}
                            placeholder="Nhập lời cảm ơn..."
                            className="w-full p-2 resize-none  bg-[#111] border border-white/10 rounded h-24"
                        />


                        <div className="flex gap-3">

                            <button
                                onClick={handleSendEmail}
                                className="flex-1 py-2 cursor-pointer rounded-lg bg-linear-to-r from-yellow-400 to-yellow-600 text-black font-medium hover:scale-105 transition"
                            >
                                Xác nhận
                            </button>

                            <button
                                onClick={() => setEmailTarget(null)}
                                className="flex-1 py-2 rounded-lg bg-white/10 hover:bg-white/20"
                            >
                                Huỷ
                            </button>

                        </div>

                    </div>
                </div>
            )}
        </div>
    );
}