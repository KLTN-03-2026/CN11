'use client';

import { useCart } from "@/app/context/CartContext";
import { CategoriesType, ConditionType, VoucherType } from "@/types/data";
import { useEffect, useState } from "react";





export default function AdminVoucherPage() {
  const [vouchers, setVouchers] = useState<VoucherType[]>([]);
  const [name, setName] = useState<string>("");
  const [sale, setSale] = useState<string>("");
  const [style, setStyle] = useState<string>("");
  const [exprice, setExprice] = useState<string>("");
  const [codecategories, setCodecategories] = useState<string>("");
  const [codecondition, setCondition] = useState<string>("");
  const { messageApi, setIsCreate, setIsAcctive } = useCart();

  const [categories, setCategories] = useState<CategoriesType[]>([]);
  const [conditions, setConditions] = useState<ConditionType[]>([]);


  useEffect(() => {
    const callAPICount = async () => {
      const categoriesAPI = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/cate/get-categories`,
        { method: "GET" }
      )

      const conditionAPI = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/condition/get-condition`,
        { method: "GET" }
      )

      const voucherAPI = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/voucher/get-voucher`,
        { method: "GET" }
      )

      const dataCategories = await categoriesAPI?.json();
      const dataConditions = await conditionAPI?.json();
      const dataVouchers = await voucherAPI?.json();

      if (dataCategories?.error === 0) {
        setCategories(dataCategories?.data);
      }

      if (dataConditions?.error === 0) {
        setConditions(dataConditions?.data);
      }

      if (dataVouchers?.error === 0) {
        setVouchers(dataVouchers?.data);
      }
    }
    callAPICount();
  }, [])


  const handleAdd = () => {

    if (!name || !sale || !style || !exprice || !codecategories || !codecondition) {
      messageApi.error("Vui lòng không để trống các trường để tạo voucher !");
      return;
    }

    setIsCreate(true);
    setIsAcctive("Đang tiến hàng tạo voucher cho bạn ...");
    setTimeout(async () => {
      const responsive = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/voucher/create-voucher`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, sale, active: true, style, codecategories, codecondition, exprice })
      })

      const data = await responsive?.json();

      if (data?.error === 0) {
        setVouchers(data?.data);
        setName("");
        setExprice("");
        setSale("");
        setStyle("");
        setCodecategories("");
        setCondition("");
        setIsCreate(false);
        messageApi.success("Tạo voucher thành công !");
      } else {
        messageApi.error("Tạo voucher không thành công !");
        setIsCreate(false);
      }

    }, 2000);


  };

  const handleDelete = (id: string) => {
    setIsCreate(true);
    setIsAcctive("Đang tiến hành xoá voucher cho bạn ...");
    setTimeout(async () => {
      const responsive = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/voucher/delete-voucher/${id}`,
        { method: "DELETE" }
      )
      const dataVouchers = await responsive?.json();

      if (dataVouchers?.error === 0) {
        setVouchers(dataVouchers?.data);
        setIsCreate(false);
        messageApi.success("Xoá thành công !");
      } else {
        setIsCreate(false);
        messageApi.error("Xoá không thành công !");

      }


    }, 3000);
  };

  return (
    <div className="p-6 space-y-6 text-white">

      <h1 className="text-xl font-semibold">
        🎟️ Quản lý Voucher
      </h1>


      <div className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-4">

        <h2 className="font-medium">➕ Tạo voucher</h2>

        <div className="grid grid-cols-2 gap-4">


          <input
            placeholder="Mã voucher"
            value={name}
            spellCheck={false}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="p-2 bg-[#111] outline-none border border-white/10 rounded"
          />


          <input
            placeholder="Giảm giá"
            type="text"
            value={sale}
            onChange={(e) =>
              setSale(e.target.value)
            }
            className="p-2 bg-[#111] outline-none border border-white/10 rounded"
          />


          <select
            value={style}
            onChange={(e) =>
              setStyle(e.target.value)
            }
            className="p-2 bg-[#111] outline-none border border-white/10 rounded"
          >
            <option value="percent" defaultChecked={true}>%</option>
            <option value="amount">VNĐ</option>
          </select>


          <select
            value={codecategories}
            onChange={(e) =>
              setCodecategories(e.target.value)
            }
            className="p-2 bg-[#111] outline-none border border-white/10 rounded"
          >
            <option value="all">Tất cả</option>
            {categories?.map((item, index) => {
              return <option key={index} value={item?.codecategories}>{item?.name}</option>
            })}

          </select>


          <select
            value={codecondition}
            onChange={(e) =>
              setCondition(e.target.value)
            }
            className="p-2 bg-[#111] outline-none border border-white/10 rounded col-span-2"
          >
            {conditions?.map((item, index) => {
              return <option key={index} defaultChecked={index === 0 && true} value={item?.codecondition}>{item?.name}</option>
            })}
          </select>


          <input
            type="date"
            value={exprice}
            onChange={(e) =>
              setExprice(e.target.value)
            }
            className="p-2 bg-[#111] outline-none border border-white/10 rounded col-span-2"
          />
        </div>


        <button
          onClick={handleAdd}
          className="mt-3 px-5 py-2 cursor-pointer rounded-lg bg-linear-to-r from-pink-500 to-red-500 hover:scale-105 transition"
        >
          Tạo voucher
        </button>
      </div>


      <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">

        <div className="grid grid-cols-7 px-4 py-3 text-sm text-gray-400 border-b border-white/10">
          <div>Mã</div>
          <div>Giảm</div>
          <div>Loại</div>
          <div>Áp dụng</div>
          <div>Điều kiện</div>
          <div>Hết hạn</div>
          <div className="text-center">Xoá</div>
        </div>

        <div className="max-h-75 overflow-y-auto">

          {vouchers.map((v) => (
            <div
              key={v.id}
              className="grid grid-cols-7 px-4 py-3 border-b border-white/5 hover:bg-[#111]"
            >
              <div className="font-medium text-pink-400">
                {v?.name}
              </div>

              <div>
                {v?.sale}
                {v?.style === "percent" ? "%" : "đ"}
              </div>

              <div>
                {v?.style === "percent" ? "Phần trăm" : "Tiền"}
              </div>

              <div className="text-blue-400">
                {v?.category_voucher?.name}
              </div>


              <div className="text-yellow-400">
                {v?.condition?.name}
              </div>

              <div className="text-gray-400">
                {v?.exprice || "—"}
              </div>

              <div className="flex justify-center">
                <button
                  onClick={() => handleDelete(v?.codevoucher)}
                  className="px-3 py-1 cursor-pointer text-xs bg-red-500/20 text-red-400 rounded hover:bg-red-500/40"
                >
                  Xoá
                </button>
              </div>
            </div>
          ))}

          {vouchers.length === 0 && (
            <div className="text-center py-6 text-gray-400">
              Chưa có voucher nào
            </div>
          )}

        </div>
      </div>
    </div>
  );
}