'use client';

import Image from "next/image";


type Chef = {
    id: number
    name: string
    image: string
    role: string
}

const chefs: Chef[] = [
    {
        id: 1,
        name: "Chef Nguyễn",
        role: "Chuyên gia ẩm thực Việt",
        image: "https://res.cloudinary.com/dhb5ubvvy/image/upload/v1773764065/chef1_le0psv.webp"
    },
    {
        id: 2,
        name: "Chef Trần",
        role: "Bếp trưởng",
        image: "https://res.cloudinary.com/dhb5ubvvy/image/upload/v1773764092/chef2_xezqpu.jpg"
    },
    {
        id: 3,
        name: "Chef Lê",
        role: "Đầu bếp chính",
        image: "https://res.cloudinary.com/dhb5ubvvy/image/upload/v1773764115/chef3_pibnwk.jpg"
    }
]

export default function ChefRestaurent() {
    return <section className="py-16 px-10">

        <h2 className="text-3xl font-bold text-center mb-10">
            Đầu bếp của chúng tôi
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

            {chefs.map((chef) => (

                <div
                    key={chef.id}
                    className="bg-white shadow rounded-xl p-6 text-center hover:shadow-xl transition"
                >

                    <Image
                        alt={chef.name}
                        src={chef.image}
                        width={128}
                        height={128}
                        className="rounded-full w-32 h-32 mx-auto object-cover"
                    />

                    <h3 className="font-bold mt-4">
                        {chef.name}
                    </h3>

                    <p className="text-gray-500 text-sm">
                        {chef.role}
                    </p>

                </div>

            ))}

        </div>

    </section>
};