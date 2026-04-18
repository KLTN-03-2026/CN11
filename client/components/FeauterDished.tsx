'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

type Dish = {
    id: number;
    name: string;
    price: string;
    image: string;
    tag?: string;
};

const dishes: Dish[] = [
    {
        id: 1,
        name: 'Sushi Cá Hồi',
        price: '120.000đ',
        image: '/sushicahoi.jpg',
        tag: 'Best Seller',
    },
    {
        id: 2,
        name: 'Sashimi Tổng Hợp',
        price: '250.000đ',
        image: '/shashimi.jpg',
    },
    {
        id: 3,
        name: 'Tempura Tôm',
        price: '150.000đ',
        image: '/tom.jpg',
        tag: 'Hot',
    },
    {
        id: 4,
        name: 'Ramen Nhật Bản',
        price: '180.000đ',
        image: '/ramen.jpg',
    },
    {
        id: 5,
        name: 'Ramen Nhật Bản',
        price: '180.000đ',
        image: '/ramen.jpg',
    },
];

export default function FeaturedDishes() {
    return (
        <section className="bg-[#0b0b0b] py-24 text-white">
            <div className="max-w-6xl mx-auto px-6">

               
                <div className="text-center mb-16">
                    <p className="text-red-400 text-xs tracking-[0.3em] mb-4">
                        人気メニュー (Popular Dishes)
                    </p>

                    <h2 className="text-3xl md:text-4xl font-semibold">
                        Món ăn nổi bật
                    </h2>
                </div>

               
                <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">

                    {dishes.map((dish, i) => (
                        <motion.div
                            key={dish.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.15 }}
                            whileHover={{ y: -8 }}
                            className="group relative rounded-2xl overflow-hidden border border-white/10 bg-black/40 backdrop-blur-md"
                        >

                          
                            <div className="overflow-hidden">
                                <Image
                                    src={`/images`+dish.image}
                                    alt={dish.name}
                                    height={224}
                                    width={1000}
                                    className="w-full h-56 object-cover group-hover:scale-110 transition duration-500"
                                />
                            </div>

                         
                            {dish.tag && (
                                <div className="absolute top-3 left-3 bg-red-600 text-xs px-3 py-1 rounded-full">
                                    {dish.tag}
                                </div>
                            )}

                            
                            <div className="p-4 space-y-2">
                                <h3 className="font-medium">{dish.name}</h3>
                                <p className="text-red-400 font-semibold">{dish.price}</p>
                            </div>

                         
                            <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                                <button className="px-4 py-2 bg-red-600 rounded-full hover:bg-red-700 transition">
                                    Xem chi tiết
                                </button>
                            </div>

                        </motion.div>
                    ))}

                </div>
            </div>
        </section>
    );
}