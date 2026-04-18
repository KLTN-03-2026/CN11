'use client';

import { useCart } from "@/app/context/CartContext";
import ActivityPanel from "@/components/ActivityPanel";
import AddUserForm from "@/components/AddUserForm";
import UserList from "@/components/UserList";
import StatusCard from "@/components/utils/StatusCard";
import { LogType, UserType } from "@/types/data";
import { useEffect, useState } from "react";

export default function Page() {

    const [users, setUsers] = useState<UserType[]>([]);
    const { messageApi, setIsCreate, setIsAcctive } = useCart();
    const [activities, setActivities] = useState<LogType[]>([]);



    const [staff, setStaff] = useState<number>(0);
    const [accounts, setAccounts] = useState<number>(0);
    const [customers, setCustomers] = useState<number>(0);
    const [chefs, setChefs] = useState<number>(0);

    useEffect(() => {
        const callAPICount = async () => {
            const customerAPI = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/count/accounts-customer`,
                { method: "GET" }
            )
            const chefsAPI = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/count/accounts-chef`,
                { method: "GET" }
            )
            const staffsAPI = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/count/accounts-staff`,
                { method: "GET" }
            )
            const accountsAPI = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/count/accounts`,
                { method: "GET" }
            )

            const usersAPI = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/users`,
                { method: "GET" }
            )

            const acctiveAPI = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/log/logs`,
                { method: "GET" }
            )

            const dataCus = await customerAPI?.json();
            const dataChef = await chefsAPI?.json();
            const dataStaff = await staffsAPI?.json();
            const dataAcc = await accountsAPI?.json();
            const dataUsers = await usersAPI?.json();
            const datalogs = await acctiveAPI?.json();

            if (dataCus?.error === 0) {
                setCustomers(dataCus?.data);
            }
            if (dataChef?.error === 0) {
                setChefs(dataChef?.data);
            }
            if (dataStaff?.error === 0) {
                setStaff(dataStaff?.data);
            }
            if (dataAcc?.error === 0) {
                setAccounts(dataAcc?.data);
            }
            if (dataUsers?.error === 0) {
                setUsers(dataUsers?.data);
            }

            if (datalogs?.error === 0) {
                setActivities(datalogs?.data);
            }

        }

        callAPICount();
    }, [])

    return <div>
        <div className="flex-1 space-y-10">
            <div className="grid grid-cols-4 gap-6">

                <StatusCard
                    title="Tài khoản"
                    value={accounts}
                />
                <StatusCard
                    title="Khách hàng"
                    value={customers}
                />
                <StatusCard
                    title="Nhân viên"
                    value={staff}
                />

                <StatusCard
                    title="Đầu bếp"
                    value={chefs}
                />

            </div>
            <AddUserForm onAdd={(user) => {
                try {

                    setTimeout(async () => {
                        setIsAcctive("Đang tiến hành đăng ký ...");
                        const responsive = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/register`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({ phone: user?.phone, password: user?.email, username: user?.username, role: user?.role?.code })
                        })

                        const data = await responsive?.json();
                        setIsAcctive("Đã xử lý ...");
                        if (data?.error === 0) {
                            messageApi.success(data?.message);
                            setTimeout(() => {
                                setIsCreate(false);
                                setTimeout(() => {
                                    if (typeof window !== "undefined") {
                                        location.reload();
                                    }
                                }, 2000);
                            }, 3000);
                        } else {
                            messageApi.error(data?.message);
                            setIsCreate(false);
                        }
                    }, 6000);
                } catch (error) {
                    console.log(error)
                }
            }} />
            <div className="grid md:grid-cols-2 gap-6">
                <UserList users={users} />
                <ActivityPanel activities={activities} />
            </div>
        </div>
    </div>
}