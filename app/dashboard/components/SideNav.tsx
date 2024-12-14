"use client"
import React from "react";
import { FileVideo, PanelsTopLeft, ShieldPlus, CircleUser } from "lucide-react";
import Link from "next/link";
import { usePathname } from 'next/navigation';

export const SideNav = () => {
    const path: string = usePathname();
    const MenuOption: Record<string, any>[] = [
        {
            id:1,
            name:'Dashboard',
            path: '/dashboard',
            icon: PanelsTopLeft
        },
        {
            id:1,
            name:'Create New',
            path: '/dashboard/create-new',
            icon: FileVideo
        },
        {
            id:1,
            name:'Upgrade',
            path: '/upgrade',
            icon: ShieldPlus
        },
        {
            id:1,
            name:'Account',
            path: '/account',
            icon: CircleUser
        }
    ];

    return (
        <div className="w-64 h-screen shadow-md p-5">
           <div className="grid gap-3">
                {
                    MenuOption.map((item, index)=>(
                        <Link href={item.path} key={item.id}>
                            <div className={`flex items-center gap-3 p-3 hover:bg-primary hover:text-white rounded-md cursor-pointer ${path == item.path && 'bg-primary text-white'}`}>
                            <item.icon></item.icon>
                            <h2>{item.name}</h2>
                            </div>
                        </Link>
                    ))
                }
           </div>
        </div>
    )
}

export default SideNav;