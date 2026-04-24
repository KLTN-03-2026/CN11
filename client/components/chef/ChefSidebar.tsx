"use client"

import Link from "next/link"
import { icons } from "@/utils/icons/icons.utils"

const { Gauge, Bell,Clock,ShieldCheck } = icons;


export default function AdminSidebar() {

    return (

        <div className="w-64 bg-black/40 backdrop-blur-xl border-r border-zinc-800">
            <div className="p-6 text-xl font-bold">
                Kitchen Panel
            </div>

            <nav className="flex flex-col gap-3 p-4">

                <Link className="sidebar-item" href="/chef/dashboard">
                    <Gauge size={18} /> Tổng quan
                </Link>

                <Link className="sidebar-item" href="/chef/food-wrong">
                    <ShieldCheck size={18} /> Món lỗi
                </Link>


                <Link className="sidebar-item" href="/chef/bell">
                    <Bell size={18} /> Thông báo
                </Link>
                <Link className="sidebar-item" href="/chef/history">
                    <Clock size={18} /> Lịch sử
                </Link>

               
            </nav>

        </div>

    )

}