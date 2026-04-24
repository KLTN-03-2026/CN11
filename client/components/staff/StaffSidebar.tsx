"use client"

import Link from "next/link"
import { icons } from "@/utils/icons/icons.utils"

const { Gauge, Package, Utensils, CreditCard, QrCode, Bell, ShieldCheck } = icons;


export default function AdminSidebar() {

    return (

        <div className="w-64 bg-black/40 backdrop-blur-xl border-r border-zinc-800">
            <div className="p-6 text-xl font-bold">
                Staff Panel
            </div>

            <nav className="flex flex-col gap-3 p-4">

                <Link className="sidebar-item" href="/staff/dashboard">
                    <Gauge size={18} /> Tổng quan
                </Link>

                <Link className="sidebar-item" href="/staff/qr">
                    <QrCode size={18} /> QR Code
                </Link>

                <Link className="sidebar-item" href="/staff/food">
                    <ShieldCheck size={18} /> Khách gọi
                </Link>



                <Link className="sidebar-item" href="/staff/order-table">
                    <Utensils size={18} /> Đặt bàn
                </Link>


                <Link className="sidebar-item" href="/staff/bell">
                    <Bell size={18} /> Thông báo
                </Link>
                <Link className="sidebar-item" href="/staff/payment">
                    <CreditCard size={18} /> Thanh toán
                </Link>

                <Link className="sidebar-item" href="/staff/order">
                    <Package size={18} /> Đơn hàng
                </Link>
            </nav>

        </div>

    )

}