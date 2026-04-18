"use client"

import { CartItem, Food } from "@/types/food"
import { Spin, message } from "antd"
import { MessageInstance } from "antd/es/message/interface"
import { createContext, useContext, useState } from "react"

interface CartContextType {
    cart: CartItem[]
    addItem: (food: Food) => void;
    increase: (id: number) => void;
    decrease: (id: number) => void;
    setIsCreate: (value: boolean) => void;
    setIsAcctive: (value: string) => void;
    messageApi: MessageInstance;

}

const CartContext = createContext<CartContextType | null>(null)

export const useCart = (): CartContextType => {

    const context = useContext(CartContext)

    if (!context) {
        throw new Error("CartContext not found")
    }

    return context

}

export function CartProvider({
    children
}: {
    children: React.ReactNode
}) {

    const [cart, setCart] = useState<CartItem[]>([]);
    const [messageApi, contextHolder] = message.useMessage();
    const [isCreate, setIsCreate] = useState<boolean>(false);
    const [isAcctive, setIsAcctive] = useState<string>("Đang xử lý ...");


    const addItem = (food: Food) => {

        const exist = cart.find(i => i.id === food.id)

        if (exist) {

            setCart(
                cart.map(i =>
                    i.id === food.id
                        ? { ...i, quantity: i.quantity + 1 }
                        : i
                )
            )

        } else {

            setCart([...cart, { ...food, quantity: 1 }])

        }

    }

    const increase = (id: number) => {

        setCart(
            cart.map(i =>
                i.id === id
                    ? { ...i, quantity: i.quantity + 1 }
                    : i
            )
        )

    }

    const decrease = (id: number) => {

        setCart(
            cart
                .map(i =>
                    i.id === id
                        ? { ...i, quantity: i.quantity - 1 }
                        : i
                )
                .filter(i => i.quantity > 0)
        )

    }

    return (

        <CartContext.Provider
            value={{ cart, addItem, increase, decrease,messageApi,setIsAcctive,setIsCreate }}
        >
            {contextHolder}
            {isCreate && <div className="min-h-screen flex flex-col font-semibold text-[10px] text-white gap-4 items-center justify-center w-full fixed top-0 right-0 bottom-0 left-0 bg-[#2523233f] z-50">
                <Spin size="large" />
                {isAcctive}
            </div>}
            {children}

        </CartContext.Provider>

    )

}