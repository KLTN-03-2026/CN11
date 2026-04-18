import { OrderBookedType } from "@/types/data"
import { useEffect, useState } from "react"




export default function OrderTable() {

    const [orders, setOrders] = useState<OrderBookedType[]>([]);

    useEffect(() => {
        const callAPICount = async () => {


            const OrdersAPI = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/order/get-orders`,
                { method: "GET" }
            )



            const dataOrders = await OrdersAPI?.json();


            if (dataOrders?.error === 0) {
                setOrders(dataOrders?.data);
            }



        }

        callAPICount();
    }, [])

    return (

        <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">

            <h3 className="text-white text-xl mb-6">
                Đơn hàng theo bàn
            </h3>

            <table className="w-full text-left text-white">

                <thead className="text-zinc-400 text-sm">

                    <tr>
                        <th>Mã</th>
                        <th>Bàn</th>
                        <th>Khách</th>
                        <th>Trạng thái</th>
                    </tr>

                </thead>

                <tbody>

                    {orders.map((order: OrderBookedType) => (
                        <tr key={order?.codeorder} className="border-t border-zinc-800">

                            <td className="py-3">{order?.codeorder}</td>
                            <td>{order?.order_table?.name}</td>
                            <td>{order?.order_table?.table_status?.customer}</td>
                            <td className="text-yellow-400">{order?.status === "inservice" ? "Đang phục vụ" : order?.status === "cooking" ? "Đang nấu" : "Đã xong"}</td>

                        </tr>
                    ))}

                </tbody>

            </table>

        </div>

    )
}