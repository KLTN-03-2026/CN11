'use client';

import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'framer-motion';

interface Category {
  id: number;
  name: string;
  icon: string;
}

interface Food {
  id: number;
  name: string;
  price: number;
  image: string;
}

const categories: Category[] = [
  { id: 1, name: 'Deal Hot', icon: '/icon1.png' },
  { id: 2, name: 'Mì Giảm 50%', icon: '/icon2.png' },
  { id: 3, name: 'Ship 50%', icon: '/icon3.png' },
  { id: 4, name: 'Ăn Vặt', icon: '/icon4.png' },
];

const foods: Food[] = [
  { id: 1, name: 'Nước dừa', price: 20000, image: '/dua.jpg' },
  { id: 2, name: 'Gà ủ muối', price: 120000, image: '/ga.jpg' },
  { id: 3, name: 'Trà sữa', price: 45000, image: '/trasua.jpg' },
];

export default function ShopeeFoodStyle(){
  const [cartCount, setCartCount] = useState<number>(0);

  const addToCart = (): void => {
    setCartCount(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-100">

     
      <div className="bg-linear-to-r from-orange-500 to-red-500 text-white p-4">
        <h1 className="text-lg font-bold">SmartOps Food</h1>
        <p className="text-sm">Giao hàng nhanh - Ưu đãi cực sốc</p>
      </div>

   
      <div className="bg-white -mt-5 rounded-t-3xl p-4 shadow">
        <div className="grid grid-cols-4 gap-3 text-center">
          {categories.map(cat => (
            <div key={cat.id} className="flex flex-col items-center">
              <div className="bg-gray-100 p-3 rounded-full">
                <Image src={cat.icon} alt={cat.name} width={30} height={30} />
              </div>
              <span className="text-xs mt-1">{cat.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3 bg-white p-3">
        <h2 className="font-semibold mb-2">Món phổ biến</h2>

        <div className="flex gap-3 overflow-x-auto">
          {foods.map(food => (
            <motion.div
              key={food.id}
              whileTap={{ scale: 0.95 }}
              className="min-w-30"
            >
              <div className="relative h-24 w-32 rounded-xl overflow-hidden">
                <Image src={food.image} alt={food.name} fill className="object-cover" />
              </div>

              <p className="text-sm mt-1">{food.name}</p>
              <button
                onClick={addToCart}
                className="text-xs bg-black text-white px-2 py-1 rounded mt-1"
              >
                Thêm
              </button>
            </motion.div>
          ))}
        </div>
      </div>

     
      {cartCount > 0 && (
        <div className="fixed bottom-5 right-5 bg-red-500 text-white px-4 py-2 rounded-full shadow-lg">
          🛒 {cartCount}
        </div>
      )}

    </div>
  );
}
