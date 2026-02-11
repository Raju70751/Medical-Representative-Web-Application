'use client'

import { useState, useEffect } from "react";
import { GrCompliance } from "react-icons/gr";
import { TbPlayerTrackPrevFilled, TbPlayerTrackNextFilled } from "react-icons/tb";
import { GoSearch } from "react-icons/go";
import { fetchVisits } from './fetchdata'
import { useSelector } from "react-redux"
import type { RootState } from "@/app/store/store"
import { RiDeleteBin5Fill } from "react-icons/ri"
import { removelist } from '@/app/store/visitSite'
import { useDispatch } from "react-redux";


type Visit = {
    id: string
    name: string
    location: string
    date: string
    pharmacy: string
    remarks: string
}


export default function Visits() {

    const [data, setVisits] = useState<Visit[]>([])
    const [isMounted, setIsMounted] = useState(false)

    const demoData = useSelector(
        (state: RootState) => state.visit.visits
    )

    const items_per_page = 7
    const [currentPage, setCurrentPage] = useState(1)
    const startIndex = (currentPage - 1) * items_per_page
    const endIndex = startIndex + items_per_page

    const totalPages = Math.ceil(demoData.length / items_per_page)

    const currentData = demoData.slice(startIndex, endIndex)

    const dispatch = useDispatch()

    useEffect(() => {
        fetchVisits()
            .then(setVisits)
            .catch(console.error)
        setIsMounted(true)
    }, [])

    console.log(currentData)
    return (
        <div className="h-screen w-full p-2 bg-[#eeeeee]/50">
            {/* ----- Summery Container ----- */}

            <div className="grid grid-cols-2 gap-4 mt-3 pb-2 fixed-bottom">

                {/* ----- Daily Visit ----- */}

                <div className="inline-flex justify-start items-center md:w-1/2 bg-white rounded gap-2 p-2 shadow-lg" >
                    <GrCompliance className="bg-[#eeeeee]/70 text-[#ce7e00] rounded p-1 text-4xl" />
                    <div className="p-2 flex flex-col">
                        <p className="text-md text-[#6bb2f2] font-bold">Today's Visits</p>
                        <p className="text-lg font-black self-center">{demoData.length}</p>
                    </div>
                </div>

                {/* ----- Total Visit----- */}

                <div className=" inline-flex justify-start items-center md:w-1/2 bg-white rounded gap-2  p-2 shadow-lg" >
                    <GrCompliance className="bg-[#eeeeee]/70 text-green-500 rounded p-1 text-4xl" />
                    <div className="p-2 flex flex-col">
                        <p className="text-md text-[#6bb2f2] font-bold">Total Visits</p>
                        <p className="text-lg font-black self-center">{isMounted ? data.length : 0}</p>
                    </div>
                </div>
            </div>

            {/* ----- Visit List ----- */}

            <div className="flex flex-col mt-2 p-2">
               

                {/* ----- Table ----- */}


                <div className="overflow-x-auto mt-2">
                    <table className="w-full border-collapse">

                        {/* ----- Table Header ----- */}

                        <thead>
                            <tr className="bg-blue-100 text-left">
                                <th className="p-3 border">Doctor Name</th>
                                <th className="p-3 border">Place</th>
                                <th className="p-3 border">Date</th>
                                <th className="p-3 border">Medical Shop</th>
                                <th className="p-3 border">Additional Data</th>
                            </tr>
                        </thead>

                        {/* ----- Table Body ----- */}

                        <tbody>
                            {currentData.map((item, index) => (
                                <tr key={index} className="hover:bg-gray-400">
                                    <td className="p-3 border bg-green-300">{item.name}</td>
                                    <td className="p-3 border">{item.location}</td>
                                    <td className="p-3 border">{item.date}</td>
                                    <td className="p-3 border">{item.pharmacy}</td>
                                    <td className="p-3 border">{item.remarks}</td>
                                    <td className="p-3 border" ><RiDeleteBin5Fill onClick={() => dispatch(removelist(item.id))} /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="inline-flex justify-between items-center w-full mt-5 px-4">
                        <button onClick={() => setCurrentPage(currentPage - 1)}><TbPlayerTrackPrevFilled className={`p-2 text-black text-2xl bg-blue-100 ${currentPage > 1 ? 'block' : 'hidden'}`} /></button>
                        <p className="text-lg text-black font-block">Pages {currentPage}/{totalPages}</p>
                        <button className='self-end' onClick={() => setCurrentPage(currentPage + 1)}><TbPlayerTrackNextFilled className={`p-2 text-black text-2xl bg-blue-100 ${currentPage < totalPages ? 'block' : 'hidden'}`} /></button>
                    </div>
                </div>

            </div>
        </div >
    )
}