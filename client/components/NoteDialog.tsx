'use client';

import { useCart } from '@/app/context/CartContext';
import { HourType, TableType, UserType } from '@/types/data';
import { useState, ChangeEvent, useEffect } from 'react';


type FormState = {
  waiterId: string;
  time: string;
  table: string;
  note: string;
  date: string;
};



export default function NoteDialog() {
  const [open, setOpen] = useState<boolean>(false);

  const [form, setForm] = useState<FormState>({
    waiterId: '',
    time: '',
    table: '',
    note: '',
    date: new Date().toISOString().split('T')[0],
  });

  const [times, setTimes] = useState<HourType[]>([]);
  const [tables, setTables] = useState<TableType[]>([]);
  const [users, setUsers] = useState<UserType[]>([]);
  const { messageApi, setIsAcctive, setIsCreate } = useCart();

  useEffect(() => {
    const callAPICount = async () => {
      const hoursAPI = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/log/hours`,
        { method: "GET" }
      )
      const tablesAPI = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/log/tables`,
        { method: "GET" }
      )

      const usersAPI = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/log/waiters`,
        { method: "GET" }
      )
      const dataHours = await hoursAPI?.json();
      const dataTables = await tablesAPI?.json();
      const dataUsers = await usersAPI?.json();
      if (dataHours?.error === 0) {
        setTimes(dataHours?.data);
      }
      if (dataTables?.error === 0) {
        setTables(dataTables?.data);
      }
      if (dataUsers?.error === 0) {
        setUsers(dataUsers?.data);
      }

    }

    callAPICount();
  }, [])


  const handleChange = (
    e: ChangeEvent<HTMLSelectElement | HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (): void => {
    const callApi = async () => {
      if (!form.waiterId || !form.time || !form.table) {
        messageApi.error("Vui lòng điền đầy đủ thông tin");
        return;
      }
      setIsCreate(true);
      const dataPayload = {
        codeuser: form?.waiterId,
        codehour: form?.time,
        codetable: form?.table,
        des: form?.note,
        date: form?.date,
      }
      const responsive = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/create-note-waiter`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataPayload)
      })

      const data = await responsive?.json();
      if (data?.error === 0) {
        messageApi.success("Tạo ghi chú thành công");
        setOpen(false);
        setIsAcctive("Hệ thống đang cập nhật lại dữ liệu...");
        setTimeout(() => {
          if (typeof window !== "undefined") {
            window.location.reload();
          }
        }, 2000)
      } else {
        messageApi.error("Tạo ghi chú thất bại");
        setIsCreate(false);
      }
    }
    callApi();
  };

  return (
    <>

      <button
        onClick={() => setOpen(true)}
        className="px-5 py-2.5 rounded-xl bg-linear-to-r cursor-pointer from-indigo-500 to-purple-600 text-white font-medium shadow-lg hover:scale-105 transition"
      >
        + Tạo ghi chú
      </button>


      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="w-105 rounded-2xl bg-[#111] border border-white/10 shadow-2xl p-6 animate-fadeIn">


            <h2 className="text-white text-xl font-semibold mb-5 tracking-wide">
              📝 Ghi chú phục vụ
            </h2>


            <div className="mb-4">
              <label className="text-gray-400 text-sm mb-1 block">Người phục vụ</label>
              <select
                name="waiterId"
                value={form.waiterId}
                onChange={handleChange}
                className="w-full p-2.5 rounded-lg bg-[#1a1a1a] text-white border border-white/10 focus:border-indigo-500 outline-none"
              >
                <option value="">Chọn người phục vụ</option>
                {users?.map((w) => (
                  <option key={w?.codeuser} value={w?.codeuser}>
                    {w?.username}
                  </option>
                ))}
              </select>
            </div>


            <div className="mb-4">
              <label className="text-gray-400 text-sm mb-1 block">Khung giờ phục vụ</label>
              <select
                name="time"
                value={form.time}
                onChange={handleChange}
                className="w-full p-2.5 rounded-lg bg-[#1a1a1a] text-white border border-white/10 focus:border-indigo-500 outline-none"
              >
                <option value="">Chọn khung giờ</option>
                {times?.map((t) => (
                  <option key={t?.codehour} value={t?.codehour}>
                    {t?.hour}
                  </option>
                ))}
              </select>
            </div>


            <div className="mb-4">
              <label className="text-gray-400 text-sm mb-1 block">Ngày</label>
              <input
                type="date"
                name="date"
                value={form.date}
                disabled
                className="w-full p-2.5 rounded-lg bg-[#222] text-gray-400 border border-white/10 cursor-not-allowed"
              />
            </div>


            <div className="mb-4">
              <label className="text-gray-400 text-sm mb-1 block">Bàn</label>
              <select
                name="table"
                value={form.table}
                onChange={handleChange}
                className="w-full p-2.5 rounded-lg bg-[#1a1a1a] text-white border border-white/10 focus:border-indigo-500 outline-none"
              >
                <option value="">Chọn bàn</option>
                {tables?.map((t) => (
                  <option key={t?.codetable} value={t?.codetable}>
                    {t?.name}
                  </option>
                ))}
              </select>
            </div>


            <div className="mb-5">
              <label className="text-gray-400 text-sm mb-1 block">Ghi chú</label>
              <textarea
                name="note"
                value={form.note}
                onChange={handleChange}
                spellCheck={false}
                placeholder="Nhập ghi chú..."
                className="w-full p-2.5 rounded-lg bg-[#1a1a1a] text-white border border-white/10 focus:border-indigo-500 outline-none resize-none h-24"
              />
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 rounded-lg border cursor-pointer border-white/20 text-gray-300 hover:bg-white/10 transition"
              >
                Huỷ
              </button>

              <button
                onClick={handleSubmit}
                className="px-4 py-2 rounded-lg bg-linear-to-r cursor-pointer from-indigo-500 to-purple-600 text-white shadow-md hover:scale-105 transition"
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}


      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.25s ease;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </>
  );
}