"use client"

import Link from "next/link"
import { icons } from "@/utils/icons/icons.utils"
const { LayoutDashboard, UserRoundCog, ShieldCheck, Utensils, UserPen, Settings, TicketPercent, CreditCard, BellPlus } = icons;


export default function AdminSidebar() {

    return (

        <div className="w-64 bg-black/40 backdrop-blur-xl border-r border-zinc-800">

            <div className="p-6 text-xl font-bold">

                SmartOps F&B

            </div>

            <nav className="flex flex-col gap-3 p-4">

                <Link className="sidebar-item" href="/admin/dashboard">
                    <LayoutDashboard size={18} /> Dashboard
                </Link>

                <Link className="sidebar-item" href="/admin/account">
                    <UserRoundCog size={18} /> Tài khoản
                </Link>

                <Link className="sidebar-item" href="/admin/verify">
                    <ShieldCheck size={18} /> Phân quyền
                </Link>

                <Link className="sidebar-item" href="/admin/food">
                    <Utensils size={18} /> Thức ăn
                </Link>

                <Link className="sidebar-item" href="/admin/contact">
                    <UserPen size={18} /> Liên hệ
                </Link>
                <Link className="sidebar-item" href="/admin/voucher">
                    <TicketPercent size={18} /> Voucher
                </Link>
                <Link className="sidebar-item" href="/admin/payment">
                    <CreditCard size={18} /> Thanh toán
                </Link>

                <Link className="sidebar-item" href="/admin/setting">
                    <Settings size={18} /> Cài đặt
                </Link>
                <Link className="sidebar-item" href="/admin/bell">
                    <BellPlus size={18} /> Tạo thông báo
                </Link>

            </nav>

        </div>

    )

}