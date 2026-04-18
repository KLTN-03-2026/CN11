import AdminSidebar from "@/components/admin/AdminSidebar";
import HeaderDashboard from "@/components/partials/HeaderDashboard";

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex h-screen bg-zinc-950 text-white">
            <AdminSidebar />
            <div className="flex flex-col flex-1">

                <HeaderDashboard />

                <main className="flex-1 p-8 overflow-y-auto">

                    {children}

                </main>

            </div>
        </div>
    );
}
