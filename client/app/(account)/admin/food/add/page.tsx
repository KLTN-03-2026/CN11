'use client';

import { useCart } from "@/app/context/CartContext";
import BackButton from "@/components/BackButton";
import { CategoriesType, Food } from "@/types/data";
import Image from "next/image";
import { useEffect, useState } from "react";





export default function Page() {
    const [foods, setFoods] = useState<Food[]>([]);
    const [open, setOpen] = useState<boolean>(false);
    const [name, setName] = useState<string>("");
    const [des, setDes] = useState<string>("");
    const { messageApi, setIsAcctive, setIsCreate } = useCart();
    const [editingId, setEditingId] = useState<string | "">("");

    const [payload, setPayload] = useState<Food>({
        id: 0,
        name: "",
        price: "",
        category: {
            codecategories: "",
            des: "",
            name: ""
        },
        image: "",
        tag: "",
        note: "",
        customers: {
            codefood: "",
            quatify: 0
        },
        codefood: ""
    })


    const [categories, setCategories] = useState<CategoriesType[]>([]);


    useEffect(() => {
        const callAPICount = async () => {
            const categoriesAPI = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/cate/get-categories`,
                { method: "GET" }
            )

            const foodsAPI = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/food/get-foods`,
                { method: "GET" }
            )


            const dataCategories = await categoriesAPI?.json();
            const dataFoods = await foodsAPI?.json();


            if (dataCategories?.error === 0) {
                setCategories(dataCategories?.data);
            }

            if (dataFoods?.error === 0) {
                setFoods(dataFoods?.data);
            }


        }

        callAPICount();
    }, [])

    const handleImage = async (file: File | null) => {
        if (!file) return;
        setIsCreate(true);
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
        if (imageServer?.secure_url) {
            setIsAcctive("Hệ thống đang lấy ảnh ...");

            setPayload((prev) => {
                const newPayload = { ...prev, image: imageServer.secure_url };

                setTimeout(() => {
                    setIsAcctive("Hệ thống đã xong !");
                    messageApi.success("Hệ thống lấy ảnh thành công !");
                    setIsCreate(false);
                }, 1000);

                return newPayload;
            });
        }


    };


    const handleSubmit = async () => {

        if (editingId === "") {
            if (!payload?.category?.codecategories) {
                messageApi.error("Vui lòng chọn loại món !");
                return;
            }
            if (!payload?.price) {
                messageApi.error("Vui lòng nhập gái món !");
                return;
            }
            if (!payload?.name || payload?.name?.length < 3) {
                messageApi.error("Vui lòng ghi tên món đầy đủ và ít nhất từ 3 kí tự !");
                return;
            }

            if (!payload?.image) {
                messageApi.error("Vui lòng chọn ảnh !");
                return;
            }
            setIsCreate(true);
            setIsAcctive("Đang tiến hành tạo sản phẩm...");
            setTimeout(async () => {
                const responsive = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/food/create-food`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name: payload?.name,
                        tag: payload?.tag,
                        price: payload?.price,
                        image: payload?.image,
                        codecategories: payload?.category?.codecategories,
                        note: payload?.note
                    })
                })

                const data = await responsive?.json();

                if (data?.error === 0) {
                    messageApi.success("Thêm sản phẩm thành công !");
                    setFoods(data?.data);
                    setIsCreate(false);
                    setPayload({
                        id: 0,
                        name: "",
                        price: "",
                        category: {
                            codecategories: "",
                            des: "",
                            name: ""
                        },
                        image: "",
                        tag: "",
                        note: "",
                        customers: {
                            codefood: "",
                            quatify: 0
                        },
                        codefood: ""
                    })
                } else {
                    setIsCreate(false);
                    messageApi.error("Thêm sản phẩm không thành công !");
                }
            }, 3000);

        } else {
            if (!payload?.category?.codecategories) {
                messageApi.error("Vui lòng chọn loại món !");
                return;
            }
            if (!payload?.price) {
                messageApi.error("Vui lòng nhập gái món !");
                return;
            }
            if (!payload?.name || payload?.name?.length < 3) {
                messageApi.error("Vui lòng ghi tên món đầy đủ và ít nhất từ 3 kí tự !");
                return;
            }

            if (!payload?.image) {
                messageApi.error("Vui lòng chọn ảnh !");
                return;
            }
            setIsCreate(true);
            setIsAcctive("Đang tiến hành cập nhật sản phẩm...");
            setTimeout(async () => {
                const responsive = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/food/update-food/${editingId}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name: payload?.name,
                        tag: payload?.tag,
                        price: payload?.price,
                        image: payload?.image,
                        codecategories: payload?.category?.codecategories,
                        note: payload?.note
                    })
                })

                const data = await responsive?.json();

                if (data?.error === 0) {
                    messageApi.success("Cập sản phẩm thành công !");
                    setFoods(data?.data);
                    setIsCreate(false);
                    setPayload({
                        id: 0,
                        name: "",
                        price: "",
                        category: {
                            codecategories: "",
                            des: "",
                            name: ""
                        },
                        image: "",
                        tag: "",
                        note: "",
                        customers: {
                            codefood: "",
                            quatify: 0
                        },
                        codefood: ""
                    })
                    setEditingId("");
                } else {
                    setIsCreate(false);
                    messageApi.error("Cập nhật sản phẩm không thành công !");
                }
            }, 3000);
        }
    };

    const handleCreateNewCategories = () => {
        if (!name) {
            messageApi.error("Bạn không được phép bỏ trống tên.");
            return;
        }

        setIsCreate(true);
        setIsAcctive("Đang tiến hành tạo danh mục...");
        setTimeout(async () => {
            const responsive = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/cate/create-categories`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: name,
                    des: des
                })
            })

            const data = await responsive?.json();

            if (data?.error === 0) {
                messageApi.success("Thêm danh mục thành công !");
                setCategories(data?.data);
                setIsCreate(false);
                setName("");
                setDes("");
                setOpen(false);
            } else {
                setIsCreate(false);
                messageApi.error("Thêm sản phẩm không thành công !");
            }
        }, 3000);
    }

    const handleEdit = (food: Food) => {
        setEditingId(food?.codefood);
        const { price } = food;
        setPayload({ ...food, price: price.split(" ")[0] })
    };

    const handleDelete = (id: string) => {
        setIsCreate(true);
        setIsAcctive("Đang tiến hành xoá sản phẩm...");
        setTimeout(async () => {
            const responsive = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/food/delete-food/${id}`, {
                method: "DELETE",
            })

            const data = await responsive?.json();

            if (data?.error === 0) {
                setFoods(data?.data);
                messageApi.success("Xoá sản phẩm thành công !");
                setIsCreate(false);
            } else {
                setIsCreate(false);
                messageApi.error("Xoá sản phẩm không thành công.");
            }

        }, 2000);
    };
    return <div className=" bg-[#0a0a0a] min-h-screen text-white space-y-6">
        <BackButton label="Trở về trang trước" />
        <div className="bg-white/5 p-5 rounded-xl grid md:grid-cols-2 gap-6">

            <div className="space-y-4">

                <div>
                    <label className="text-sm text-gray-400">Tên món</label>
                    <input
                        spellCheck={false}
                        placeholder="Nhập tên món..."
                        value={payload?.name}
                        onChange={(e) => setPayload((prev) => ({ ...prev, name: e.target.value }))}
                        className="w-full p-2 outline-none mt-1 bg-[#111] border border-white/10 rounded"
                    />
                </div>

                <div>
                    <label className="text-sm text-gray-400">Giá (VNĐ)</label>
                    <input
                        spellCheck={false}
                        type="text"
                        placeholder="Nhập giá tiền..."
                        value={payload?.price}
                        onChange={(e) => setPayload((prev) => ({ ...prev, price: e.target.value }))}
                        className="w-full p-2 outline-none mt-1 bg-[#111] border border-white/10 rounded"
                    />
                </div>

                <div>
                    <label className="text-sm text-gray-400 flex items-center gap-2"><span>Loại món</span> <div onClick={() => setOpen(true)} className="text-[12px] hover:underline cursor-pointer text-blue-600">Thêm mới</div></label>
                    <select
                        value={payload?.category?.codecategories}
                        onChange={(e) => setPayload((prev) => ({ ...prev, category: { codecategories: e.target.value, des: "", name: "" } }))}
                        className="w-full p-2 outline-none mt-1 bg-[#111] border border-white/10 rounded"
                    >
                        <option value="default" defaultChecked>------Chọn danh mục------</option>
                        {categories?.map((item, index) => {
                            return <option key={index} value={item?.codecategories}>{item?.name}</option>
                        })}

                    </select>
                </div>

                <div>
                    <label className="text-sm text-gray-400">Tag (nóng, mới, giảm giá,..v.v..)</label>
                    <input
                        spellCheck={false}
                        placeholder="Nhập loại..."
                        value={payload?.tag}
                        onChange={(e) => setPayload((prev) => ({ ...prev, tag: e.target.value }))}
                        className="w-full p-2 outline-none mt-1 bg-[#111] border border-white/10 rounded"
                    />
                </div>

                <div>
                    <label className="text-sm text-gray-400">Ghi chú</label>
                    <textarea
                        placeholder="Mô tả ngắn về món ăn..."
                        value={payload.note}
                        spellCheck={false}
                        onChange={(e) => setPayload((prev) => ({ ...prev, note: e.target.value }))}
                        className="w-full p-2 outline-none mt-1 bg-[#111] border h-37.5 resize-none border-white/10 rounded"
                    />
                </div>

                <button
                    onClick={handleSubmit}
                    className="w-full bg-green-600 py-2 cursor-pointer rounded hover:bg-green-700"
                >
                    {editingId ? "Cập nhật món" : "Thêm món"}
                </button>
            </div>


            <div className="flex flex-col items-center justify-center">
                <label className="w-full relative h-125 border-2 border-dashed border-white/20 rounded-lg flex items-center justify-center cursor-pointer">
                    <input
                        spellCheck={false}
                        type="file"
                        hidden
                        onChange={(e) => handleImage(e.target.files?.[0] ?? null)}
                    />
                    {payload?.image ? (
                        <Image alt="logo" height={500} width={500} src={payload.image} className="object-cover object-center rounded" />
                    ) : (
                        <span className="text-gray-400">📷 Chọn ảnh món</span>
                    )}
                </label>
            </div>
        </div>


        <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
            <div className="grid grid-cols-6 px-4 py-3 text-gray-400 border-b border-white/10">
                <div className="text-center">Tên món</div>
                <div className="text-center text-yellow-400">Giá bán</div>
                <div className="text-center text-green-500">Loại</div>
                <div className="text-center text-pink-400">Chủ đề</div>
                <div className="text-center text-green-400">Khách mua</div>
                <div className="text-center">Hành động</div>
            </div>

            {foods?.map((f) => (
                <div
                    key={f.id}
                    className="grid grid-cols-6 px-4 py-3 border-b border-white/5 items-center"
                >
                    <div className="flex items-center justify-start gap-2">
                        {f?.image && <Image alt="logo" width={40} height={40} src={f?.image} className="w-10 h-10 rounded object-cover" />}
                        {f?.name}
                    </div>

                    <div className="text-center text-yellow-400">{f?.price}</div>
                    <div className="text-center text-green-500">{f?.category?.name}</div>
                    <div className="text-center text-pink-400">{f?.tag}</div>
                    <div className="text-center text-green-400">{f?.customers?.quatify}</div>

                    <div className="flex justify-center items-center gap-2">
                        <button
                            onClick={() => handleEdit(f)}
                            className="px-2 py-1 bg-blue-500 cursor-pointer rounded"
                        >
                            Sửa
                        </button>
                        <button
                            onClick={() => handleDelete(f?.codefood)}
                            className="px-2 py-1 cursor-pointer bg-red-500 rounded"
                        >
                            Xoá
                        </button>
                    </div>
                </div>
            ))}

            {foods?.length === 0 && <span className="text-gray-400 flex items-center justify-center my-4">Không có sản phẩm nào.</span>}
        </div>

        {open && <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-10">

            <div className="bg-[#111] border border-white/10 rounded-xl w-105 p-5 space-y-4">

                <h2 className="text-lg font-semibold">
                    📩 Tạo danh mục
                </h2>


                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nhập tên danh mục..."
                    spellCheck={false}
                    className="w-full p-2 bg-[#222] outline-none border border-white/10 rounded text-gray-400"
                />


                <textarea
                    value={des}
                    spellCheck={false}
                    onChange={(e) => setDes(e.target.value)}
                    placeholder="Nhập mô tả danh mục..."
                    className="w-full p-2  outline-none resize-none  bg-[#111] border border-white/10 rounded h-24"
                />


                <div className="flex gap-3">

                    <button
                        onClick={handleCreateNewCategories}
                        className="flex-1 py-2 cursor-pointer rounded-lg bg-linear-to-r from-blue-400 to-blue-600 text-white font-medium hover:scale-105 transition"
                    >
                        Tạo mới
                    </button>

                    <button
                        onClick={() => setOpen(false)}
                        className="flex-1 py-2 cursor-pointer rounded-lg bg-white/10 hover:bg-white/20"
                    >
                        Huỷ
                    </button>

                </div>

            </div>
        </div>}


    </div>
};