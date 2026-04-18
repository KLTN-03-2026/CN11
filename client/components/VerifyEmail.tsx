"use client";

import React, { useState } from "react";

interface EmailVerifyModalProps {
    isOpen: boolean;
    email: string;
    onClose: () => void;
    onVerify: (code: string) => Promise<void>;
    onResend: () => Promise<void>;
}

const EmailVerifyModal: React.FC<EmailVerifyModalProps> = ({
    isOpen,
    email,
    onClose,
    onVerify,
    onResend,
}) => {
    const [code, setCode] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    if (!isOpen) return null;

    const handleVerify = async () => {
        if (code.length !== 4) {
            setError("Vui lòng nhập đủ 4 số");
            return;
        }

        setLoading(true);
        setError("");

        try {
            await onVerify(code);
        } catch {
            setError("Mã OTP không đúng hoặc đã hết hạn");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
                <h2 className="text-xl font-bold text-center text-gray-800">
                    Xác thực Email
                </h2>

                <p className="mt-2 text-center text-sm text-gray-500">
                    Nhập mã OTP gửi tới
                </p>

                <p className="text-center text-orange-500 font-medium">{email}</p>

                <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value.replace(/[^0-9]/g, ""))}
                    maxLength={4}
                    minLength={1}
                    placeholder="----"
                    className="mt-5 w-full rounded-lg border border-gray-300 px-4 py-3 text-center text-xl tracking-[10px] focus:border-orange-500 text-orange-500 focus:outline-none"
                />

                {error && (
                    <p className="mt-2 text-center text-sm text-red-500">{error}</p>
                )}

                <button
                    onClick={handleVerify}
                    disabled={loading}
                    className="mt-5 w-full rounded-lg cursor-pointer bg-orange-500 py-3 font-semibold text-white hover:bg-orange-600 disabled:opacity-50"
                >
                    {loading ? "Đang xác thực..." : "Xác nhận"}
                </button>

                <button
                    onClick={onResend}
                    className="mt-3 w-full text-sm cursor-pointer text-orange-500 hover:underline"
                >
                    Gửi lại mã
                </button>

                <button
                    onClick={onClose}
                    className="mt-2 w-full text-sm cursor-pointer text-gray-400 hover:text-gray-600"
                >
                    Đóng
                </button>
            </div>
        </div>
    );
};

export default EmailVerifyModal;
