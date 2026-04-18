'use client';
import dynamic from "next/dynamic";

const ChefDashboard = dynamic(()=>import("../../../../components/ChefDashboard"),{
    ssr:false
})


export default function Page(){
    return <ChefDashboard />
}