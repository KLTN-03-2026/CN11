'use client';

import { useCart } from "@/app/context/CartContext";
import { BankHistoryType } from "@/types/data";
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";









export default function AdminPaymentPage() {
  const [payments, setPayments] = useState<BankHistoryType[]>([]);
  const [search, setSearch] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const { messageApi, setIsCreate, setIsAcctive } = useCart();


  const handleConfirm = async (id: string) => {
    setIsCreate(true);
    setIsAcctive("Đang xác nhận thanh toán...");
    setTimeout(async () => {
      const responsive = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/bank/put-bank/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          }
        }
      )
      const data = await responsive?.json();
      if (data?.error === 0) {
        setPayments(data?.data);
        setIsCreate(false);
        messageApi.success("Xác nhận thanh toán thành công");
      } else {
        setIsCreate(false);
        messageApi.error("Xác nhận thanh toán thất bại");
      }
    }, 2000)
  };


  const today = new Date();

  const setToday = () => {
    const d = today.toISOString().split("T")[0];
    setFromDate(d);
    setToDate(d);
  };

  const setAll = async () => {
    if (typeof window !== "undefined") {
      location.reload();
    }
  }

  const setWeek = () => {
    const first = new Date(today);
    first.setDate(today.getDate() - today.getDay());
    const last = new Date(first);
    last.setDate(first.getDate() + 6);

    setFromDate(first.toISOString().split("T")[0]);
    setToDate(last.toISOString().split("T")[0]);
  };

  const setMonth = () => {
    const first = new Date(today.getFullYear(), today.getMonth(), 1);
    const last = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    setFromDate(first.toISOString().split("T")[0]);
    setToDate(last.toISOString().split("T")[0]);
  };


  const filtered = payments.filter((p) => {
    const matchName = p?.user_bank?.username
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchFrom =
      !fromDate || new Date(p.date) >= new Date(fromDate);

    const matchTo =
      !toDate || new Date(p.date) <= new Date(toDate);

    return matchName && matchFrom && matchTo;
  });


  useEffect(() => {
    const callAPICount = async () => {
      const bankHisAPI = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/bank/get-bank`,
        { method: "GET" }
      )
      const dataBanks = await bankHisAPI?.json();

      if (dataBanks?.error === 0) {
        setPayments(dataBanks?.data);
      }



    }

    callAPICount();
  }, [])

  const exportExcel = () => {
    const data = filtered.map((p) => ({
      "Khách": p?.user_bank?.username || "Khách ẩn danh",
      "Bàn": p?.table?.name || "N/A",
      "Số tiền": p?.total,
      "Phương thức": p?.method === "cash" ? "Tiền mặt" : "VNPAY",
      "Trạng thái":
        p.status === "pending" ? "Chờ xác nhận" : "Đã xác nhận",
      "Ngày": p?.date,
      "Giờ": p?.hour,
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Payments");
    XLSX.writeFile(wb, "payments.xlsx");
  };

  return (
    <div className="p-6 text-white space-y-6">

      <h1 className="text-xl font-semibold">
        💳 Quản lý Thanh Toán
      </h1>


      <div className="grid grid-cols-4 gap-4">
        <input
          placeholder="Tìm khách..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 bg-[#111] border border-white/10 rounded"
        />

        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          className="p-2 bg-[#111] border border-white/10 rounded"
        />

        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          className="p-2 bg-[#111] border border-white/10 rounded"
        />

        <button
          onClick={exportExcel}
          className="bg-linear-to-r from-blue-500 to-indigo-500 rounded px-4 hover:scale-105 transition"
        >
          Export Excel
        </button>
      </div>


      <div className="flex gap-3">
        <button onClick={setAll} className="px-3 cursor-pointer py-1 bg-pink-500/20 text-pink-400 rounded">
          Tất cả
        </button>
        <button onClick={setToday} className="px-3 cursor-pointer py-1 bg-yellow-500/20 text-yellow-400 rounded">
          Hôm nay
        </button>
        <button onClick={setWeek} className="px-3 cursor-pointer py-1 bg-green-500/20 text-green-400 rounded">
          Tuần
        </button>
        <button onClick={setMonth} className="px-3 cursor-pointer py-1 bg-purple-500/20 text-purple-400 rounded">
          Tháng
        </button>
      </div>


      <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">

        <div className="grid grid-cols-8 px-4 py-3 text-sm text-gray-400 border-b border-white/10">
          <div>Khách</div>
          <div>Bàn</div>
          <div>Số tiền</div>
          <div>Phương thức</div>
          <div>Ngày</div>
          <div>Giờ</div>
          <div className="flex items-center justify-centerx">Trạng thái</div>
          <div className="text-center">Hành động</div>
        </div>

        <div className="max-h-100 overflow-y-auto">

          {filtered.map((p) => (
            <div
              key={p.id}
              className="grid grid-cols-8 px-4 py-3 border-b border-white/5 hover:bg-[#111]"
            >
              <div>{p?.user_bank?.username || "Khách ẩn danh"}</div>

              <div className="text-blue-400">{p?.table?.name || "N/A"}</div>

              <div className="text-yellow-400">
                {p?.total}
              </div>

              <div>
                {p?.method === "cash" ? (
                  <span className="text-green-400">Tiền mặt</span>
                ) : (
                  <span className="text-purple-400">VNPAY</span>
                )}
              </div>

              <div>{p?.date}</div>
              <div>{p?.hour}</div>


              <div>
                {p.status === "pending" ? (
                  <div className="flex items-center justify-center">
                    <div className="flex items-center gap-2 px-3 py-1 text-xs rounded-full bg-orange-500/10 text-orange-400 border border-orange-400/30 animate-pulse">
                      ⏳ Chờ xác nhận
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <div className="flex items-center gap-2 px-3 py-1 text-xs rounded-full bg-green-500/10 text-green-400 border border-green-400/30 shadow-[0_0_10px_rgba(34,197,94,0.4)]">
                      ✔ Đã xác nhận
                    </div>
                  </div>
                )}
              </div>


              <div className="flex justify-center">
                {p.status === "pending" ? (
                  <button
                    onClick={() => handleConfirm(p?.codebank)}
                    className="px-4 py-1.5 text-xs font-medium rounded-lg 
                    bg-linear-to-r cursor-pointer from-emerald-400 to-green-500
                    text-black hover:scale-110 transition"
                  >
                    Xác nhận
                  </button>
                ) : (
                  <span className="text-gray-500">—</span>
                )}
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="text-center py-6 text-gray-400">
              Không có dữ liệu
            </div>
          )}

        </div>
      </div>
    </div>
  );
}