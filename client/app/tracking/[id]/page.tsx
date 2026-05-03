import OrderTrackingMobile from "@/components/OrderTrackingMobile";

import { use } from "react";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);

    return <>
        <OrderTrackingMobile  orderId="1"  total={+id} />
    </>
}