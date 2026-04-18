
import ChefSidebar from "@/components/chef/ChefSidebar";
import HeaderDashboard from "@/components/partials/HeaderDashboard";

export default function ChefLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex h-screen bg-zinc-950 text-white">
            <ChefSidebar />
            <div className="flex flex-col flex-1">

                <HeaderDashboard />

                <main className="flex-1 p-8 overflow-y-auto">

                    {children}

                </main>

            </div>
        </div>
    );
}
