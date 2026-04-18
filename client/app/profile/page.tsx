'use client';

import { useState, ChangeEvent, useEffect } from "react";
import Image from "next/image";
import {
    Mail,
    User,
    Phone,
    MapPin,
    Camera,
    CheckCircle,
    AlertCircle,
} from "lucide-react";
import { UserType } from "@/types/data";
import { useCart } from "@/app/context/CartContext";
import EmailVerifyModal from "@/components/VerifyEmail";



export default function ProfilePage() {


    const userDefault = { active: false, codeuser: "", createdAt: "", email: "", id: 0, phone: "", role: { code: "", value: "" }, tag: "", updatedAt: "", username: "", avatar: { avatarlink: "" }, isVerify: false, address: "" }

    const [editing, setEditing] = useState<boolean>(false);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const [isVerify, setIsVerify] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [avatar, setAvatar] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [codeOTPRanddom, setCodeOTPRandom] = useState<string>("");
    const [user, setUser] = useState<UserType>(userDefault);
    const { messageApi, setIsAcctive, setIsCreate } = useCart();

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
                        const { username, email, phone, address, isVerify, avatar } = data?.data;
                        if (address) {
                            setAddress(address);
                        }

                        if (avatar?.avatarlink) {
                            setAvatar(avatar?.avatarlink);
                        }

                        setIsVerify(isVerify)

                        if (email) {
                            setEmail(email);
                        }
                        setUsername(username);
                        setPhone(phone);
                    } else {
                        setUser({ active: false, codeuser: "", createdAt: "", email: "", id: 0, phone: "", role: { code: "", value: "" }, tag: "", updatedAt: "", username: "", avatar: { avatarlink: "" }, isVerify: false, address: "" });
                    }
                }

                callUserAPI();
                // eslint-disable-next-line react-hooks/set-state-in-effect
                setIsLoggedIn(JSON.parse(isLogged)?.isLoggedIn);
            }
        }

    }, [])




    const handleAvatarChange = async (
        e: ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];
        if (file) {
            setIsCreate(true);
            setIsAcctive("Đang cập nhật ảnh ...");
            const imageFile = file;
            const formData = new FormData();

            if (imageFile) {
                formData.append('file', imageFile);
            }
            formData.append('upload_preset', 'images_preset');
            formData.append('cloud_name', 'dhb5ubvvy');

            const fectUi = await fetch("https://api.cloudinary.com/v1_1/dhb5ubvvy/image/upload", {
                method: "post",
                body: formData
            });
            const imageServer = await fectUi.json();

            const image = imageServer?.secure_url;

            setTimeout(async () => {
                const uploadAPI = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/upload-avatar/${user?.codeuser}`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ image: image })
                    }

                )

                const data = await uploadAPI?.json();

                if (data?.error === 0) {
                    setIsCreate(false);
                    setAvatar(image);
                    messageApi.success("Upload ảnh lên thành công !");
                    if (typeof window !== "undefined") {
                        location.reload();
                    }
                } else {
                    setIsCreate(false);
                    messageApi.error("Upload ảnh không thành công.")
                }
            }, 2000)
        }
    };

    const generateSendOTP = () => {
        const chars: string = "0123456789";
        let otp: string = "";
        for (let i = 0; i < 4; i++) {
            otp += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return otp;
    };

    const handdleVeriEmail = async () => {
        if (email === "") {
            messageApi.error("Bạn vui lòng nhập email của bạn.");
            return;
        }

        const otpSendReset = generateSendOTP();
        setCodeOTPRandom(otpSendReset);
        setIsCreate(true);
        setIsAcctive("Đang gửi email đến " + email + "...");
        setTimeout(async () => {
            const responsive = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/email/verify-email`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ codeuser: user?.codeuser, email: email, otp: otpSendReset })
            })

            const data = await responsive?.json();

            if (data?.success === 0) {
                messageApi.success("Hệ thống đã gửi mã xác thực qua email. Bạn vui lòng vào email để xác minh !");
                setIsCreate(false);
                setTimeout(() => {
                    setOpen(true);
                }, 3000)
            } else {
                setIsCreate(false);
                messageApi.error("Xác thực email không thành công. Bạn vui lòng xác thực lại !");
            }
        }, 3000)

    }

    const handdleSave = async () => {
        setEditing(!editing)
        if (editing) {
            if (phone === "" || username === "") {
                messageApi.error("Bạn không được phép bỏ trống !");
                return;
            }
            setIsAcctive("Đang cập nhật dữ liệu...");
            setIsCreate(true);

            const objUpdate: { username: string, phone: string, address: string, email: string } = {
                username: username,
                phone: phone,
                address: "",
                email: ""
            };
            if (email) {
                objUpdate.email = email;
            }
            if (address) {
                objUpdate.address = address;
            }

            setTimeout(async () => {
                const responsive = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/update-account/${user?.codeuser}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(objUpdate)
                })

                const data = await responsive?.json();

                if (data?.error === 0) {
                    messageApi.success("Cập nhật dữ liệu thành công.");
                    setIsAcctive("Cập nhật dữ liệu thành công ...");
                    setTimeout(() => {
                        setIsCreate(false);
                        if (typeof window !== "undefined") {
                            location.reload();
                        }
                    }, 1000)
                } else {
                    messageApi.error("Cập nhật không thành công.");
                    setIsCreate(false);
                }
            }, 3000);


        }
    }

    return (
        <div className="">
            <h2 className="text-xl font-semibold">Trang thông tin cá nhân</h2>
            <div className="mt-6">
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-[#111] rounded-2xl p-6 border border-white/10 flex flex-col items-center">
                        <div className="relative w-32 h-32">
                            {avatar ? <Image
                                src={avatar}
                                alt="avatar"
                                fill
                                className="rounded-full object-cover border border-white/20"
                            /> : <Image
                                src={"/images/daubep.jpg"}
                                alt="avatar"
                                fill
                                className="rounded-full object-cover border border-white/20"
                            />}

                            <label className="absolute bottom-2 right-2 bg-black/70 p-2 rounded-full cursor-pointer hover:bg-black">
                                <Camera size={16} />
                                <input
                                    type="file"
                                    className="hidden"
                                    onChange={handleAvatarChange}
                                />
                            </label>
                        </div>

                        <h2 className="mt-4 text-lg font-semibold">{user?.username}</h2>


                        {<div className="mt-2 flex items-center gap-1 text-sm">
                            {isVerify ? (
                                <>
                                    <CheckCircle className="text-green-400" size={16} />
                                    <span className="text-green-400">Email đã xác minh</span>
                                </>
                            ) : (
                                <>
                                    <AlertCircle className="text-yellow-400" size={16} />
                                    <span className="text-yellow-400">Chưa xác minh</span>
                                </>
                            )}
                        </div>}


                        {(isVerify === false &&
                            <button
                                onClick={handdleVeriEmail}
                                className="mt-4 px-4 py-2 bg-blue-500 cursor-pointer hover:bg-blue-600 rounded-xl text-sm transition"
                            >
                                Xác minh email
                            </button>
                        )}
                    </div>


                    <div className="md:col-span-2 bg-[#111] rounded-2xl p-6 border border-white/10">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold">
                                Thông tin cá nhân
                            </h2>

                            <button
                                onClick={handdleSave}
                                className="text-sm px-3 py-1 cursor-pointer bg-white/10 rounded-lg hover:bg-white/20"
                            >
                                {editing ? "Lưu" : "Chỉnh sửa"}
                            </button>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">


                            <div className="flex flex-col gap-1">
                                <label className="text-sm text-gray-400 flex items-center gap-1">
                                    <User size={14} /> Họ tên
                                </label>
                                <input
                                    name="name"
                                    value={username}
                                    placeholder="Bạn vui lòng nhập họ tên ..."
                                    onChange={(e) => setUsername(e.target.value)}
                                    disabled={!editing}
                                    className="bg-black/40 border border-white/10 rounded-lg px-3 py-2 outline-none focus:border-blue-500"
                                />
                            </div>


                            <div className="flex flex-col gap-1">
                                <label className="text-sm text-gray-400 flex items-center gap-1">
                                    <Mail size={14} /> Email
                                </label>
                                <input
                                    name="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={!editing}
                                    placeholder={!user?.email ? "Bạn chưa thêm email." : "Nhập email của bạn vào đây ..."}
                                    className="bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-gray-400"
                                />
                            </div>


                            <div className="flex flex-col gap-1">
                                <label className="text-sm text-gray-400 flex items-center gap-1">
                                    <Phone size={14} /> Số điện thoại
                                </label>
                                <input
                                    name="phone"
                                    value={phone}
                                    placeholder="Nhập số điện thoại của bạn ..."
                                    onChange={(e) => setPhone(e.target.value)}
                                    disabled={!editing}
                                    className="bg-black/40 border border-white/10 rounded-lg px-3 py-2 outline-none focus:border-blue-500"
                                />
                            </div>


                            <div className="flex flex-col gap-1">
                                <label className="text-sm text-gray-400 flex items-center gap-1">
                                    <MapPin size={14} /> Địa chỉ
                                </label>
                                <input
                                    name="address"
                                    value={address}
                                    onChange={e => setAddress(e.target.value)}
                                    placeholder={user.address ? "Vui lòng nhập địa chỉ của bạn vào đây ..." : "Chưa thêm địa chỉ."}
                                    disabled={!editing}
                                    className="bg-black/40 border border-white/10 rounded-lg px-3 py-2 outline-none focus:border-blue-500"
                                />
                            </div>

                        </div>
                    </div>
                </div>


                <div className="mt-6 bg-[#111] p-6 rounded-2xl border border-white/10">
                    <h2 className="text-lg font-semibold mb-3">
                        Trạng thái tài khoản
                    </h2>

                    <div className="flex flex-col gap-2 text-sm text-gray-300">
                        {user?.active ? <span>✔️ Tài khoản hoạt động</span> : <span>⚠️ Tài khoản không cấp phép hoạt động</span>}
                        <span>
                            {user?.isVerify
                                ? "✔️ Email đã xác minh"
                                : "⚠️ Email chưa xác minh"}
                        </span>
                        <span>🍽️ Tài khoản {user?.role?.code === "R1" ? <span className="text-sm font-semibold text-blue-400">Quản trị (Admin) tại</span> : user?.role?.code === "R2" ? <span className="text-sm font-semibold text-blue-400">đầu bếp (Chef) tại</span> : user?.role?.code === "R3" ? <span className="text-sm font-semibold text-blue-400">Khách hàng (Customer) </span> : <span className="text-sm font-semibold text-blue-400">nhân viên (Staff) tại</span>} nhà hàng</span>
                    </div>
                </div>
            </div>
            <EmailVerifyModal
                isOpen={open}
                email={email}
                onClose={() => setOpen(false)}
                onVerify={async (code) => {
                    if (code === codeOTPRanddom) {
                        const callAPI = async () => {
                            const responsive = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/accept-email/${user?.codeuser}`, {
                                method: "PUT",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify({ isVerify: true })
                            })

                            const data = await responsive?.json();
                            if (data?.error === 0) {
                                setIsVerify(true);
                                messageApi.success("Xác thực tài khoản thành công.");
                            } else {
                                setIsVerify(false);
                                messageApi.success("Xác thực tài khoản không thành công.");
                            }
                        }

                        callAPI();
                    } else {
                        messageApi.error("Mã xác thực không đúng");
                    }
                }}
                onResend={async () => {
                    console.log("Resend code");
                }}
            />
        </div>
    );
}