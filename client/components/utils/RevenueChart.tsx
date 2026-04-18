"use client"

import { DataOrderChart } from "@/types/data"
import { formatCurrencyShort, groupOrdersByWeek } from "@/utils/functions/generate.utils"
import { useEffect, useMemo, useState } from "react"
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer
} from "recharts"
import moment from "moment";



export default function RevenueChart() {

    const [dataPaymentDB, setDataPaymentDB] = useState<DataOrderChart[]>([]);

    useEffect(() => {
        const callAPICount = async () => {
            const ordersAPI = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/bank/get-bank-revue-chart`,
                { method: "GET" }
            )

            const dataOrders = await ordersAPI?.json();

            if (dataOrders?.error === 0) {

                const dataOrdersUpdate = dataOrders?.data?.map((order: DataOrderChart) => {
                    return {
                        id: order?.id,
                        createdAt: moment(order?.createdAt)?.format(),
                        total: order?.total
                    }
                })
                setDataPaymentDB(dataOrdersUpdate);
            }

        }
        callAPICount();

    }, []);


    const dataupdate = useMemo(() => {
        return groupOrdersByWeek(dataPaymentDB);
    }, [dataPaymentDB]);




    return (

        <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">

            <h3 className="text-white mb-6 text-xl">
                Doanh Thu Tuần
            </h3>

            <ResponsiveContainer width="100%" height={300}>

                <LineChart data={dataupdate}>
                    <XAxis dataKey="date" />
                    <YAxis tickFormatter={(value: number) => formatCurrencyShort(value)} />
                    <Tooltip />
                    <Line type="monotone" dataKey="total" stroke="#facc15" />
                </LineChart>

            </ResponsiveContainer>

        </div>

    )
}