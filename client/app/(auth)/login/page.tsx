'use client';
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { icons } from "@/utils/icons/icons.utils";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { validatePassword, validatePhone } from "@/utils/functions/validate.utils";
import Link from "next/link";
import { useCart } from "@/app/context/CartContext";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { loginUser } from "@/store/state/auth";

const { IoReload } = icons;


export default function LoginForm() {
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [loading, setIsLoading] = useState(false);
    const [checkLogin, setCheckLogin] = useState(false);
    const { messageApi, setIsAcctive, setIsCreate } = useCart();
    const [captchaInput, setCaptchaInput] = useState("");
    const [captchaCode, setCaptchaCode] = useState("");
    const [mounted, setMounted] = useState(false);
    const dispatch = useDispatch<AppDispatch>()

    const router = useRouter();
    useEffect(() => {
        // eslint-disable-next-line react-hooks/immutability
        generateCaptcha();
    }, []);

    function generateCaptcha() {
        const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
        let str = "";
        for (let i = 0; i < 4; i++) {
            str += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setCaptchaCode(str);
    }

    useEffect(() => {
        if (phone.length >= 8 && password.length >= 6 && captchaInput.length >= 2) {
            setCheckLogin(true);
        } else {
            setCheckLogin(false);
        }
    }, [phone, password, captchaInput])

    async function handleLogin(e?: React.FormEvent) {
        e?.preventDefault();
        setIsAcctive("Đang xử lý ...");
        setIsCreate(true);
        setIsLoading(true);


        try {
            if (!validatePhone(phone)) {
                setError("Số điện thoại không hợp lệ.");
                setIsCreate(false);
                return;
            }
            if (!validatePassword(password)) {
                setError("Mật khẩu phải có ít nhất 6 ký tự.");
                setIsCreate(false);
                return;
            }
            if (captchaInput.trim().toUpperCase() !== captchaCode) {
                setError("Mã captcha không đúng.");
                setIsCreate(false);
                return;
            }

            setError(null);

            setTimeout(async () => {
                setIsAcctive("Đang tiến hành đăng nhập ...");
                const responsive = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/login`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ phone: phone, password: password })
                })

                const data = await responsive?.json();
                setIsAcctive("Đã xử lý ...");

                if (data?.error === 0) {
                    await dispatch(loginUser({ phone, password }));
                    messageApi.success(data?.message);
                    switch (data?.role) {
                        case "R1":
                            router.push("/admin/dashboard");
                            break;
                        case "R2":
                            router.push("/chef/dashboard");
                            break;
                        case "R3":
                            router.push("/profile");
                            break;
                        case "R4":
                            router.push("/staff/dashboard");
                            break;
                        default:
                            router.push("/login");
                    }
                    setIsCreate(false);
                    setIsLoading(false);
                } else {
                    messageApi.error(data?.message);
                    setIsCreate(false);
                    setIsLoading(false);
                }
            }, 2000);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
            setError("Lỗi không xác định");
        }
    }

    useEffect(() => setMounted(true), []);
    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-linear-to-br from-sky-50 to-indigo-100 flex items-center justify-center p-6">

            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-12"
            >
                <div className="col-span-12 lg:col-span-7 p-8 bg-[linear-gradient(135deg,#7c3aed_0%,#06b6d4_100%)] text-white relative">
                    <div className="absolute inset-0 opacity-30 pointer-events-none" aria-hidden />
                    <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
                        <h2 className="text-3xl md:text-4xl font-bold">SmartDine Portal</h2>
                        <p className="mt-3 max-w-md text-sm md:text-base text-justify font-semibold">Cổng quản trị - đăng ký & đăng nhập - nhà hàng Trung Kiên - nơi quản lý nhanh chóng và dễ dùng. Đăng nhập để vào tài khoản, đặt bàn trước, đặt món ăn và thanh toán.</p>

                        <ul className="mt-6 space-y-3 text-sm">
                            <li className="flex items-start gap-3">
                                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">📋</div>
                                <div>
                                    <div className="font-medium">Menu điện tử</div>
                                    <div className="text-xs opacity-90">Thực đơn trực tuyến dễ xem, cập nhật nhanh và đầy đủ thông tin món ăn.</div>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">📱</div>
                                <div>
                                    <div className="font-medium">Đặt món bằng QR Code</div>
                                    <div className="text-xs opacity-90">Quét mã QR tại bàn để xem menu và đặt món nhanh chóng.</div>
                                </div>
                            </li>



                            <li className="flex items-start gap-3">
                                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">🤖</div>
                                <div>
                                    <div className="font-medium">Gợi ý món ăn thông minh</div>
                                    <div className="text-xs opacity-90">AI đề xuất các món ăn phổ biến và phù hợp với sở thích khách hàng.</div>
                                </div>
                            </li>

                            <li className="flex items-start gap-3">
                                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">🪑</div>
                                <div>
                                    <div className="font-medium">Đặt bàn online</div>
                                    <div className="text-xs opacity-90">Đặt bàn trước để tránh chờ đợi vào giờ cao điểm.</div>
                                </div>
                            </li>



                            <li className="flex items-start gap-3">
                                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">📦</div>
                                <div>
                                    <div className="font-medium">Theo dõi đơn hàng</div>
                                    <div className="text-xs opacity-90">Cập nhật trạng thái món ăn theo thời gian thực.</div>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">💳</div>
                                <div>
                                    <div className="font-medium">Thanh toán VNPAY</div>
                                    <div className="text-xs opacity-90">Thanh toán tiện lợi bằng QR VNPAY hoặc các phương thức online.</div>
                                </div>
                            </li>

                        </ul>
                    </motion.div>
                </div>

                <div id="login" className="col-span-12 lg:col-span-5 p-8">
                    <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
                        {<div>
                            <h3 className="text-xl font-semibold">Đăng nhập SmartDine</h3>
                            <p className="text-sm text-gray-500 mt-1">Nhập số điện thoại và mật khẩu để đăng nhập.</p>

                            <form onSubmit={handleLogin} className="mt-6 space-y-4">
                                {error && (
                                    <div className="text-sm text-red-600 animate-pulse bg-red-50 border border-red-100 p-2 rounded">{error}</div>
                                )}

                                <motion.div>
                                    <label className="block text-xs font-medium text-gray-700">Số điện thoại</label>
                                    <Input autoComplete="off"
                                        autoCorrect="off"
                                        spellCheck={false}
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="mt-1 w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                                        placeholder="Số điện thoại của bạn ..."
                                        required
                                    />
                                </motion.div>

                                <motion.div>
                                    <label className="block text-xs font-medium text-gray-700">Mật khẩu</label>
                                    <Input autoComplete="off"
                                        autoCorrect="off"
                                        spellCheck={false}
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="mt-1 w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                                        placeholder="Mật khẩu của bạn ..."
                                        required

                                    />
                                </motion.div>

                                <motion.div>
                                    <label className="block text-xs font-medium text-gray-700">Mã Captcha</label>
                                    <div className="flex items-center gap-2 mt-1">
                                        <div className="px-4 py-2 bg-gray-100 rounded font-mono tracking-widest flex-1 text-center select-none">{captchaCode}</div>
                                        <Button title="Làm mới" type="button" onClick={generateCaptcha} className="text-xs bg-white hover:bg-white shadow-none text-gray-500 hover:text-gray-600 cursor-pointer flex gap-1 items-center"><IoReload title="Làm mới" size={16} /></Button>
                                    </div>
                                    <Input autoComplete="off"
                                        autoCorrect="off" spellCheck={false} type="text" required value={captchaInput.toUpperCase()} onChange={(e) => setCaptchaInput(e.target.value)} className="mt-2 w-full border rounded-md px-3 py-2" placeholder="Nhập mã captcha" />
                                </motion.div>

                                <motion.div className="flex items-center justify-between">
                                    <label className="flex items-center justify-center gap-2 text-sm">
                                        <div className="flex items-center justify-center"><Input type="checkbox"
                                            autoComplete="off"
                                            autoCorrect="off"
                                            checked={remember} onChange={(e) => setRemember(e.target.checked)} /></div>
                                        <span>Ghi nhớ đăng nhập</span>
                                    </label>
                                    <a className="text-sm text-indigo-600" href="/forgot-password">Quên mật khẩu?</a>
                                </motion.div>

                                <div className="flex gap-2">
                                    <Button
                                        type="submit"
                                        className={`flex-1  justify-center ${checkLogin ? "bg-indigo-600 hover:bg-indigo-700" : "bg-gray-500"} cursor-pointer text-white rounded-md px-4 py-2 font-medium shadow hover:scale-[1.01] active:scale-95`}
                                    // disabled={loading}
                                    >
                                        {loading ? "Đang đăng nhập..." : "Đăng nhập"}
                                    </Button>
                                </div>
                                <div className="flex items-center justify-center">
                                    <label className="block text-xs font-medium text-gray-700">Tôi chưa có tài khoản? <Link className="text-indigo-600 hover:underline" href="/register">Đăng ký</Link></label>
                                </div>
                            </form>
                        </div>}

                        <div className="mt-6 text-xs text-gray-400">&copy; {new Date().getFullYear()} SmartDine — SmartOps F&B | Hệ thống quản lý Nhà hàng </div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}