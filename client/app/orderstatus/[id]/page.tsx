'use client';

import OrderSuccessMobile from "@/components/OrderSuccessMobile";
import { useRouter } from "next/navigation";
import { use } from "react";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();
    return <>
        <OrderSuccessMobile onBackHome={() => router.push("/menu")} orderId="1" total={+id} />
    </>
}