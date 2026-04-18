'use client';

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { RoleType } from "@/types/data";
import { icons } from "@/utils/icons/icons.utils";
import { useCart } from "@/app/context/CartContext";

const { BiMailSend } = icons;

const FroalaEditor = dynamic(
    async () => (await import("react-froala-wysiwyg")).default,
    { ssr: false }
);


export default function AdminNotificationPage() {
    const [title, setTitle] = useState<string>("");
    const [roles, setRoles] = useState<RoleType[]>([]);
    const [belltypes, setBellType] = useState<{ title: string; codetype: string }[]>([]);
    const [content, setContent] = useState<string>("");
    const [target, setTarget] = useState<string>("R3");
    const [bellcode, setBellCode] = useState<string>("BT01");
    const [sent, setSent] = useState<boolean>(false);
    const { messageApi, setIsCreate, setIsAcctive } = useCart();
    const [userToRole, setUserToRole] = useState<{ codeuser: string, username: string, phone: string }[]>([]);


    useEffect(() => {
        const callApi = async () => {
            const users = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/get-user-to-role/${target}`,
                { method: "GET" }
            )
            const userData = await users.json();
            if (userData?.error === 0) {
                setUserToRole(userData?.data);
            }
        }

        callApi();
    }, [target])

    const handleSend = () => {
        if (!title || !content) {
            messageApi.error("Vui lòng điền đầy đủ tiêu đề và nội dung!");
            return
        };

        setIsCreate(true);
        setIsAcctive("Đang gửi thông báo...");

        setTimeout(async () => {
            let userDataRole: { codeuser: string, username: string, phone: string }[] = []
            if (userToRole.length === 0) {
                const users = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/get-user-to-role/R3`,
                    { method: "GET" }
                )
                const userData = await users.json();
                if (userData?.error === 0) {
                    userDataRole = [...userData?.data,]
                    setUserToRole(userData?.data);
                }
            }
            const responsive = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/bell/create-bell`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title,
                    des: content,
                    rolecode: target,
                    codetype: bellcode,
                    items: userToRole?.length > 0 ? userToRole : userDataRole
                }),
            })

            const data = await responsive.json();
            if (data?.error === 0) {
                messageApi.success("Gửi thông báo thành công!");
                setIsCreate(false);
                setSent(true);
                setTitle("");
                setContent("");
                setTarget("R3");
                setBellCode("BT01");
                setTimeout(() => {
                    setSent(false);
                }, 2000);
            } else {
                messageApi.error("Gửi thông báo thất bại!");
                setIsCreate(false);
            }


        }, 2000);
    };

    useEffect(() => {
        const callAPICount = async () => {
            const rolesAPI = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/get-role`,
                { method: "GET" }
            )

            const belltypesAPI = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/bell/get-bell-types`,
                { method: "GET" }
            )

            const dataRoles = await rolesAPI?.json();
            const dataBellTypes = await belltypesAPI?.json();

            if (dataBellTypes?.error === 0) {
                setBellType(dataBellTypes?.data);
            } else {
                setBellType([]);
            }

            if (dataRoles?.error === 0) {
                const dataRolesNew = dataRoles?.data?.map((t: RoleType) => {
                    if (t.code !== "R1") {
                        return {
                            code: t.code,
                            value: t.code === "R3" ? "Khách hàng" : t.code === "R2" ? "Đầu bếp" : "Nhân viên"
                        }
                    } else {
                        return {
                            code: t.code,
                            value: "Tất cả"
                        }
                    }
                });
                setRoles(dataRolesNew);
            }
        }
        callAPICount();
    }, [])

    return (
        <div className="p-6 text-white space-y-6">


            <h1 className="text-xl font-semibold">
                📢 Tạo thông báo
            </h1>


            <div className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-4">


                <input
                    placeholder="Tiêu đề thông báo..."
                    value={title}
                    spellCheck={false}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full outline-none p-2 bg-[#111] border border-white/10 rounded"
                />


                <div className="flex gap-3">
                    {roles?.map((t, index) => (
                        <button
                            key={index}
                            onClick={() => setTarget(t?.code)}
                            className={`px-4 py-1.5 cursor-pointer rounded-full text-sm transition
                ${target === t?.code
                                    ? "bg-linear-to-r from-pink-500 to-red-500 text-white"
                                    : "bg-white/5 text-gray-400 hover:bg-white/10"
                                }`}
                        >
                            {t?.value}
                        </button>
                    ))}
                </div>

                <div className="flex flex-col gap-1">
                    <div className="flex gap-3">
                        {belltypes?.map((t, index) => (
                            <button
                                key={index}
                                onClick={() => setBellCode(t?.codetype)}
                                className={`px-4 py-1.5 cursor-pointer rounded-full text-sm transition
                ${bellcode === t?.codetype
                                        ? "bg-linear-to-r from-pink-500 to-red-500 text-white"
                                        : "bg-white/5 text-gray-400 hover:bg-white/10"
                                    }`}
                            >
                                {t?.title}
                            </button>
                        ))}
                    </div>
                </div>



                <div className="bg-white text-black rounded overflow-hidden">
                    <FroalaEditor
                        tag="textarea"
                        model={content}
                        config={{
                            height: 300,
                            heightMin: 300,
                            heightMax: 300,
                            spellcheck: false,
                            attribution: false,
                        }}

                        onModelChange={(e: string) => setContent(e)}
                    />
                </div>


                <div className="flex justify-between items-center">


                    <span className="text-sm text-gray-400">
                        Gửi đến:{" "}
                        <span className="text-pink-400">
                            {target === "R1" ? "Tất cả" : target === "R2" ? "Đầu bếp" : target === "R3" ? "Khách hàng" : "Nhân viên"}
                        </span>
                    </span>


                    <button
                        onClick={handleSend}
                        className={`px-5 py-2 cursor-pointer flex items-center justify-center gap-2 rounded-lg font-medium transition
              ${sent
                                ? "bg-green-500 text-white"
                                : "bg-linear-to-r from-pink-500 to-red-500 hover:scale-105"
                            }`}
                    >
                        {!sent && <BiMailSend size={20} />} {sent ? "✔ Đã gửi" : "Gửi thông báo"}
                    </button>
                </div>
            </div>


            <div className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-3">

                <h2 className="text-sm text-gray-400">👁️ Xem trước</h2>

                <div className="bg-[#111] p-4 rounded space-y-2">
                    <div className="text-pink-400 font-medium">
                        {title || "Tiêu đề thông báo"}
                    </div>

                    <div
                        className="text-sm text-gray-300"
                        dangerouslySetInnerHTML={{
                            __html: content || "Nội dung sẽ hiển thị ở đây...",
                        }}
                    />
                </div>
            </div>
        </div>
    );
}