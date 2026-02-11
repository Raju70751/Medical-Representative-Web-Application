'use client'

import Link from "next/link";
import { TiInfoLarge } from "react-icons/ti";
import { PiTableFill } from "react-icons/pi";
import { CgToday } from "react-icons/cg";
import { ImHome3 } from "react-icons/im";
import { usePathname } from "next/navigation";



export default function Header() {
    const path = usePathname()

    return (
        <div className="inline-flex justify-between items-center p-4 w-full bg-[#67aff0]">
            <Link href={'/'}>
                <div className="inline-flex gap-1 jusstify-start items-center">
                    <TiInfoLarge className="text-xl" />
                    <h1 className="text-lg font-helvetica text-[#2B2B2B] hidden md:block font-bold">Info</h1>
                </div>
            </Link>


            <div className="gap-4 inline-flex text-center justify-center">
                <Link href={'/'} className={`gap-1 inline-flex items-center justify-center hover:underline ${path === '/' ? 'text-white' : 'text-black'}`}>
                    <ImHome3 className="text-md" />
                    <p className="text-md hidden md:block">Home</p>
                </Link>
                <Link href={'/visitlist'} className={`gap-1 inline-flex items-center justify-center hover:underline ${path === '/visitlist' ? 'text-white' : 'text-black'}`}>
                    <PiTableFill className="text-lg" />
                    <p className="text-md hidden md:block">Today</p>
                </Link>
                <Link href={'/listhistory'} className={`gap-1 inline-flex items-center justify-center hover:underline ${path === '/listhistory' ? 'text-white' : 'text-black'}`}>
                    <CgToday className="text-md" />
                    <p className="text-lg hidden md:block">History</p>
                </Link>

            </div>
        </div>
    )

}