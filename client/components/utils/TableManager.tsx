'use client';
import { DataTable, FloorType } from "@/types/data";
import { useEffect, useState } from "react";





export default function TableManager() {

    const [target, setTarget] = useState<string>("F01");
    const [tables, setTables] = useState<DataTable[]>([]);
    const [floors, setFloors] = useState<FloorType[]>([]);

    useEffect(() => {
        const callAPICount = async () => {
            const floorsAPI = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/log/floors`,
                { method: "GET" }
            )
            const dataFloors = await floorsAPI?.json();

            if (dataFloors?.error === 0) {
                setFloors(dataFloors?.data);
            }

        }

        callAPICount();
    }, [])

    useEffect(() => {
        const callAPICount = async () => {
            const tablesAPI = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/log/floors-table/${target}`,
                { method: "GET" }
            )
            const dataTables = await tablesAPI?.json();
            if (dataTables?.error === 0) {
                setTables(dataTables?.data);

            } else {
                setTables([]);
            }

        }

        callAPICount();
    }, [target])

    const handleGetTable = (t: string) => {
        setTarget(t)

        // const callAPI = async () => {
        //     const tablesAPI = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/log/floors-table/${t}`,
        //         { method: "GET" }
        //     )
        //     const dataTables = await tablesAPI?.json();
        //     if (dataTables?.error === 0) {
        //         setTables(dataTables?.data);
        //         setIsCreate(false);
        //     } else {
        //         setIsCreate(false);
        //     }
        // }

        // callAPI();

    }

    return (

        <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">

            <h3 className="text-white mb-6 text-xl">
                Quản Lý Bàn
            </h3>
            <div className="flex gap-3 mb-6">
                {floors?.map((t, index) => (
                    <button
                        key={index}
                        onClick={() => handleGetTable(t?.codefloor)}
                        className={`px-4 py-1.5 cursor-pointer rounded-full text-sm transition
                ${target === t?.codefloor
                                ? "bg-linear-to-r from-pink-500 to-red-500 text-white"
                                : "bg-white/5 text-gray-400 hover:bg-white/10"
                            }`}
                    >
                        {t?.name}
                    </button>
                ))}
            </div>
            <div className="grid grid-cols-3 gap-4">

                {tables?.map((table: DataTable,index:number) => (
                    <div
                        key={index}
                        className={`p-4 rounded-xl text-center
${!table?.active
                                ? "bg-red-500"
                                : "bg-green-500"}
`}
                    >

                        <p>{table?.name}</p>
                        <p>{table?.table_status?.customer} khách</p>

                    </div>
                ))}
            </div>
        </div>
    )
}