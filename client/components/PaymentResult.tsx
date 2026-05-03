"use client";

import { useSearchParams } from "next/navigation";

export default function PaymentResult() {
  const params = useSearchParams();

  const responseCode = params.get("vnp_ResponseCode");

  const success = responseCode === "00";

  return (
    <div className="min-h-screen bg-black flex justify-center items-center text-white">
      <div className="max-w-105 w-full p-4 text-center">

        {success ? (
          <>
            <h1 className="text-green-400 text-xl mb-2">
              Thanh toán thành công 🎉
            </h1>
            <p className="text-gray-400">
              Cảm ơn bạn đã đặt hàng
            </p>
          </>
        ) : (
          <>
            <h1 className="text-red-400 text-xl mb-2">
              Thanh toán thất bại ❌
            </h1>
            <p className="text-gray-400">
              Vui lòng thử lại
            </p>
          </>
        )}

      </div>
    </div>
  );
}