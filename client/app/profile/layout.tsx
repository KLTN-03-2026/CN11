'use client';
import ProfileSidebar from "@/components/partials/ProfileSideBar";
import { useState } from "react";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const [active, setActive] = useState<string>("profile");

    return (

        <div className="flex">
            <div>
                <ProfileSidebar active={active} onChange={setActive} />
            </div>
            <div className="flex-1 min-h-screen bg-[#0a0a0a] text-white px-6 py-10">
                <div className="max-w-5xl mx-auto">
                    <div>
                        {children}
                    </div>
                </div>
            </div>
        </div>

    );
}
