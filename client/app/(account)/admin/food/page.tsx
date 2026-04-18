'use client';

import AddFoodButton from "@/components/AddFoodButton";
import FoodChart from "@/components/FoodChart";
import StatusCard from "@/components/utils/StatusCard";
import { Food } from "@/types/data";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";






export default function FoodManagement() {

    const [foods, setFoods] = useState<Food[]>([]);
    const [foodsCount, setFoodsCount] = useState<number>(0);
    const router = useRouter();

    useEffect(() => {
        const callAPICount = async () => {
            const foodsCountAPI = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/count/foods`,
                { method: "GET" }
            )

            const foodsAPI = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/food/get-foods`,
                { method: "GET" }
            )


            const dataCountFood = await foodsCountAPI?.json();
            const dataFoods = await foodsAPI?.json();


            if (dataCountFood?.error === 0) {
                setFoodsCount(dataCountFood?.data);
            }

            if (dataFoods?.error === 0) {
                setFoods(dataFoods?.data);
            }


        }

        callAPICount();
    }, [])

    return (
        <div className="flex-1 space-y-10 p-6">
            <div className="grid grid-cols-3 gap-6">

                <StatusCard
                    title="Số món"
                    value={foodsCount}
                />

            </div>
            <AddFoodButton onClick={() => router.push("/admin/food/add")} />
            <FoodChart foods={foods} />

        </div>
    );
}