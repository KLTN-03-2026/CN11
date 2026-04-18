'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import { CreditCard, QrCode, Wallet } from "lucide-react";
import Image from "next/image";

type PaymentMethod = "vnpay" | "qr" | "cash";

export default function PaymentPage() {
  const [method, setMethod] = useState<PaymentMethod | null>(null);

  const total = 120000;

  const formatCurrency = (amount: number): string => {
    return amount.toLocaleString("vi-VN") + " đ";
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-100 to-gray-200 flex items-center justify-center p-4">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-6 space-y-6"
      >
      
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            💳 Thanh toán
          </h1>
          <p className="text-gray-500 text-sm">
            Chọn phương thức thanh toán
          </p>
        </div>

       
        <div className="bg-gray-100 rounded-2xl p-4 flex justify-between items-center">
          <span className="text-gray-500">Tổng tiền</span>
          <span className="text-green-600 font-bold text-xl">
            {formatCurrency(total)}
          </span>
        </div>

      
        <div className="space-y-4">

         
          <motion.div
            whileTap={{ scale: 0.97 }}
            onClick={() => setMethod("vnpay")}
            className={`p-4 rounded-2xl border cursor-pointer flex items-center justify-between transition ${
              method === "vnpay"
                ? "border-red-500 bg-red-50"
                : "border-gray-200 hover:border-red-400"
            }`}
          >
            <div className="flex items-center gap-3">
              <CreditCard className="text-red-500" />
              <span className="font-medium">Thanh toán VNPay</span>
            </div>
            → 
          </motion.div>

         
          <motion.div
            whileTap={{ scale: 0.97 }}
            onClick={() => setMethod("qr")}
            className={`p-4 rounded-2xl border cursor-pointer transition ${
              method === "qr"
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:border-blue-400"
            }`}
          >
            <div className="flex items-center gap-3 mb-3">
              <QrCode className="text-blue-500" />
              <span className="font-medium">QR Banking</span>
            </div>

            {method === "qr" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center space-y-2"
              >
                <Image
                  src="/qr-demo.png"
                  alt="QR"
                  width={128}
                  height={128}
                  className="mx-auto"
                />
                <p className="text-sm text-gray-500">
                  Quét QR bằng ứng dụng ngân hàng
                </p>
              </motion.div>
            )}
          </motion.div>

        
          <motion.div
            whileTap={{ scale: 0.97 }}
            onClick={() => setMethod("cash")}
            className={`p-4 rounded-2xl border cursor-pointer flex items-center justify-between transition ${
              method === "cash"
                ? "border-green-500 bg-green-50"
                : "border-gray-200 hover:border-green-400"
            }`}
          >
            <div className="flex items-center gap-3">
              <Wallet className="text-green-500" />
              <span className="font-medium">Thanh toán tiền mặt</span>
            </div>
            →
          </motion.div>

        </div>

      
        <button
          disabled={!method}
          className={`w-full py-3 rounded-xl font-semibold transition ${
            method
              ? "bg-red-600 hover:bg-red-700 text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Xác nhận thanh toán
        </button>

      </motion.div>
    </div>
  );
}