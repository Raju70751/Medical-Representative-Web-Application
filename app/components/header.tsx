import Link from "next/link";
import { TiInfoLarge } from "react-icons/ti";
import { PiTableFill } from "react-icons/pi";


export default function Header() {

    return (
        <div className="inline-flex justify-between items-center p-4 w-full bg-[#67aff0]">
            <Link href={'/'}>
                <div className="inline-flex gap-1 jusstify-start items-center">
                    <TiInfoLarge className="text-xl" />
                    <h1 className="text-lg font-helvetica text-[#2B2B2B] hidden md:block font-bold">Info</h1>
                </div>
            </Link>


            <h1 className="p2 hidden md:block text-lg font-bold">Medical Reprasentative Daily Shuddles</h1>
            <div className="inline-flex">
                <Link href={'/visitlist'}>
                    <PiTableFill className="text-lg" />
                </Link>
            </div>
        </div>
    )
    
}