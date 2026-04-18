'use client';
import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { redirect } from "next/navigation";
import { useCart } from "@/app/context/CartContext";
import SendingEmailModal from "@/components/SendingEmailModal";


const generateSendOTP = () => {
    const chars: string = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let otp: string = "";
    for (let i = 0; i < 4; i++) {
        otp += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return otp;
};

export default function ForgotPasswordPage() {
    const [step, setStep] = useState<"email" | "otp" | "reset">("email");
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const { messageApi, setIsAcctive, setIsCreate } = useCart();
    const [codeOTPRandom, setCodeOTPRandom] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const handleSendOTP = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!email || !email.includes("@gmail.com")) {
            messageApi.error("Vui lòng nhập email hợp lệ!");
            return;
        }

        setIsCreate(true);
        setIsAcctive("Đang xử lý ...");

        const otpSendReset = generateSendOTP();
        setCodeOTPRandom(otpSendReset);
        setLoading(true);
        const responsive = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/email/sendOtp-ResetPassword`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: email, otp: otpSendReset.toUpperCase() })
        })

        const data = await responsive?.json();
        if (data?.success) {
            messageApi.success("Gửi mã OTP thành công! Vui lòng kiểm tra email của bạn.");
            setIsCreate(false);
            setStep("otp");
            setLoading(false);
        } else {
            setIsCreate(false);
            setLoading(false);
            setTimeout(() => {
                messageApi.error("Gửi mã OTP thất bại! Vui lòng thử lại.");
            }, 2000);
        }
    };

    const handleVerifyOTP = () => {
        if (!otp || otp.length < 4) {
            messageApi.error("Bạn vui lòng nhập đầy đủ mã OTP.")
            return;
        }
        if (otp.trim().toUpperCase() === codeOTPRandom) {
            setStep("reset");
        } else {
            messageApi.error("Mã OTP không đúng!");
            return;
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
        if (e.key === "Enter") {
            if (!otp || otp.length < 4) {
                messageApi.error("Bạn vui lòng nhập đầy đủ mã OTP.")
            } else {
                handleVerifyOTP();
            }
        }

    };


    const handleResetPassword = () => {
        if (!password || password !== confirmPassword) return;
        const callAPI = async () => {
            const responsive = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/update-pass`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email: email, password: password })
            })

            const data = await responsive?.json();
            if (data?.error === 0) {
                messageApi.success("Đặt lại mật khẩu thành công!");
                setIsAcctive("Đang chuyển hướng sang trang đăng nhập ...");
                setIsCreate(false);
                setTimeout(() => {
                    redirect("/login");
                }, 4000)
            } else {
                setIsCreate(false);
                messageApi.error(data?.message);
            }
        }
        callAPI();

    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-blue-200 to-indigo-400 p-6">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-md"
            >
                <Card className="shadow-2xl rounded-2xl border-0 backdrop-blur-lg bg-white/90">
                    <CardHeader>
                        <CardTitle className="text-center text-2xl font-bold text-indigo-700">
                            {step === "email" && "Quên mật khẩu"}
                            {step === "otp" && "Nhập mã OTP"}
                            {step === "reset" && "Đặt mật khẩu mới"}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {step === "email" && (
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <form onSubmit={handleSendOTP} className="space-y-4">
                                    <Input
                                        spellCheck={false}
                                        placeholder="Nhập email đăng ký"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <Button type="submit" className="w-full bg-linear-to-br from-blue-500 cursor-pointer to-indigo-600">
                                        Gửi mã OTP
                                    </Button>
                                </form>
                            </motion.div>
                        )}

                        {step === "otp" && (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5 }}
                                className="space-y-4"
                            >
                                <Input
                                    placeholder="Nhập mã OTP"
                                    spellCheck={false}
                                    onKeyDown={handleKeyDown}
                                    value={otp.toUpperCase()}
                                    onChange={(e) => setOtp(e.target.value)}
                                />
                                <div className="flex justify-between items-center">
                                    <Button variant="outline" onClick={() => setStep("email")}>
                                        Quay lại
                                    </Button>
                                    <Button className="bg-linear-to-br from-blue-500 cursor-pointer to-indigo-600" onClick={handleVerifyOTP}>Xác nhận OTP</Button>
                                </div>
                            </motion.div>
                        )}
                        {step === "reset" && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="space-y-4"
                            >
                                <Input
                                    spellCheck={false}
                                    type="password"
                                    placeholder="Mật khẩu mới"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <Input
                                    type="password"
                                    placeholder="Xác nhận mật khẩu mới"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                <div className="flex justify-between items-center">
                                    <Button variant="outline" onClick={() => {
                                        setStep("otp")
                                    }}>
                                        Quay lại
                                    </Button>
                                    <Button className="bg-linear-to-br from-blue-500 cursor-pointer to-indigo-600" onClick={handleResetPassword}>Đặt mật khẩu</Button>
                                </div>
                            </motion.div>
                        )}
                    </CardContent>
                </Card>
                <SendingEmailModal open={loading} />
            </motion.div>
        </div>
    );
}
