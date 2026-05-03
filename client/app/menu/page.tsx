'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import Footer from "@/components/partials/Footer";
import Header from "@/components/partials/Header";
import Image from "next/image";
import CartButton from "@/components/CartButton";
import CartPanel, { CartItem } from "@/components/CartPanel";
import { useRouter } from "next/navigation";

type Dish = {
    id: number;
    name: string;
    price: number;
    image: string;
    category: string;
    popular?: boolean;
};

const categories = ["Tất cả", "Sushi", "Món nóng", "Đồ uống"];

const dishes: Dish[] = [
    {
        id: 1,
        name: "Salmon Sushi",
        price: 120000,
        image: "/sushicahoi.jpg",
        category: "Sushi",
        popular: true,
    },
    {
        id: 2,
        name: "Tuna Sushi",
        price: 140000,
        image: "/shashimi.jpg",
        category: "Sushi",
    },
    {
        id: 3,
        name: "Ramen Nhật Bản",
        price: 180000,
        image: "/ramen.jpg",
        category: "Món nóng",
        popular: true,
    },
    {
        id: 4,
        name: "Tempura",
        price: 160000,
        image: "/tom.jpg",
        category: "Món nóng",
    },
    {
        id: 5,
        name: "Matcha Latte",
        price: 80000,
        image: "/ramen.jpg",
        category: "Đồ uống",
    },
];

export default function MenuPage() {
    const [activeCategory, setActiveCategory] = useState("Tất cả");
    const [open, setOpen] = useState<boolean>(false);
    const router = useRouter();

    const [items, setItems] = useState<CartItem[]>([
        {
            id: "1",
            name: "Ramen Nhật Bản",
            price: 180000,
            quantity: 2,
            image: "/ramen.jpg",
        },
    ]);
    const filtered =
        activeCategory === "Tất cả"
            ? dishes
            : dishes.filter((d) => d.category === activeCategory);

    return (
        <div>
            <Header />
            <CartButton count={2} total={1200} onClick={() => setOpen(true)} />
            <CartPanel
                isOpen={open}
                onClose={() => setOpen(false)}
                items={items}
                suggestions={[
                    {
                        id: "2",
                        name: "Sushi cá hồi",
                        price: 120000,
                        image: "/sushi.jpg",
                    },
                ]}
                onIncrease={(id) =>
                    setItems((prev) =>
                        prev.map((i) =>
                            i.id === id ? { ...i, quantity: i.quantity + 1 } : i
                        )
                    )
                }
                onDecrease={(id) =>
                    setItems((prev) =>
                        prev.map((i) =>
                            i.id === id
                                ? { ...i, quantity: Math.max(1, i.quantity - 1) }
                                : i
                        )
                    )
                }
                onCheckout={() => router.push("/order-confirm")}
                onAddSuggest={(id) => console.log("Add suggest", id)}
            />
            <section className="min-h-screen pt-40 bg-black text-white px-6 py-16">


                <div className="text-center mb-12">
                    <p className="text-red-400 text-xs tracking-widest mb-2">
                        MENU
                    </p>
                    <h1 className="text-4xl font-semibold">
                        Thực Đơn Nhà Hàng
                    </h1>
                </div>


                <div className="flex justify-center gap-4 flex-wrap mb-10">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-5 py-2 rounded-full border transition ${activeCategory === cat
                                ? "bg-red-600 border-red-500"
                                : "border-white/10 hover:bg-white/10"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>


                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">

                    {filtered.map((dish, i) => (
                        <motion.div
                            key={dish.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden group hover:scale-[1.02] transition"
                        >


                            <div className="relative overflow-hidden">
                                <Image
                                    src={`/images` + dish.image}
                                    alt={dish.name}
                                    height={224}
                                    width={1000}
                                    className="w-full h-56 object-cover group-hover:scale-110 transition duration-500"
                                />

                                {dish.popular && (
                                    <span className="absolute top-3 left-3 bg-red-600 text-xs px-3 py-1 rounded-full">
                                        🔥 Bán chạy
                                    </span>
                                )}
                            </div>


                            <div className="p-5 space-y-3">
                                <h3 className="text-lg font-medium">{dish.name}</h3>

                                <p className="text-red-400 font-semibold">
                                    {dish.price.toLocaleString()}đ
                                </p>

                                <button className="w-full mt-3 py-2 rounded-xl bg-red-600 hover:bg-red-700 transition">
                                    Thêm vào giỏ
                                </button>
                            </div>
                        </motion.div>
                    ))}

                </div>
            </section>
            <Footer />
        </div>
    );
}