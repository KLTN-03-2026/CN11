'use client';
import OrderTable from "@/components/utils/OrderTable";
import RevenueChart from "@/components/utils/RevenueChart";
import StatusCard from "@/components/utils/StatusCard";
import TableManager from "@/components/utils/TableManager";
import { BankHistoryType } from "@/types/data";
import { convertPriceToNumber } from "@/utils/functions/generate.utils";
import { useEffect, useState } from "react";

export default function DashboardPage() {

    const [foodsCount, setFoodsCount] = useState<number>(0);
    const [accounts, setAccounts] = useState<number>(0);
    const [total, setTotal] = useState<number>(0);
    const [table, setTable] = useState<number>(0);


    useEffect(() => {
        const callAPICount = async () => {
            const foodsCountAPI = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/count/foods`,
                { method: "GET" }
            )

            const accountsAPI = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/count/accounts`,
                { method: "GET" }
            )

            const bankHisAPI = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/bank/get-bank`,
                { method: "GET" }
            )

            const tableBlankAPI = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/count/table-blank`,
                { method: "GET" }
            )
            const dataBanks = await bankHisAPI?.json();
            const dataTableBlank = await tableBlankAPI?.json();

            if (dataBanks?.error === 0) {
                const totalMoney = dataBanks?.data?.reduce((total: number, bank: BankHistoryType) => {
                    return total + convertPriceToNumber(bank?.total);
                }, 0);
                setTotal(totalMoney);
            }

            if (dataTableBlank?.error === 0) {
                setTable(dataTableBlank?.data);
            }

            const dataCountFood = await foodsCountAPI?.json();
            const dataAcc = await accountsAPI?.json();

            if (dataCountFood?.error === 0) {
                setFoodsCount(dataCountFood?.data);
            }

            if (dataAcc?.error === 0) {
                setAccounts(dataAcc?.data);
            }

        }
        callAPICount();
    }, [])

    return (

        <div className="flex-1 space-y-10">
            <div className="grid grid-cols-4 gap-6">

                <StatusCard
                    title="Tổng doanh thu"
                    value={total}
                    vnd
                />

                <StatusCard
                    title="Món ăn"
                    value={foodsCount}
                />

                <StatusCard
                    title="Khách hàng"
                    value={accounts}
                />

                <StatusCard
                    title="Bàn trống"
                    value={table}
                />

            </div>
            <RevenueChart />
            <div className="grid md:grid-cols-2 gap-6">
                <OrderTable />
                <TableManager />
            </div>
        </div>

    )

}