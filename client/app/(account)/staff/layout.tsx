
import HeaderDashboard from "@/components/partials/HeaderDashboard";
import StaffSidebar from "@/components/staff/StaffSidebar";

export default function StaffLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex h-screen bg-zinc-950 text-white">
            <StaffSidebar />
            <div className="flex flex-col flex-1">

                <HeaderDashboard />

                <main className="flex-1 p-8 overflow-y-auto">

                    {children}

                </main>

            </div>
        </div>
    );
}
