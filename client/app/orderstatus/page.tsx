import OrderSuccessMobile from "@/components/OrderSuccessMobile";
import { useRouter } from "next/navigation";

export default function OrderStatusPage({total}:{total:number}) {
    const router = useRouter();
    return <>
      <OrderSuccessMobile onBackHome={()=>router.push("/menu")} orderId="1" total={total} />
    </>
}