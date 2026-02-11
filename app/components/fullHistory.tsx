'use client'

import { useState, useEffect } from "react";
import { GrCompliance } from "react-icons/gr";
import { TbPlayerTrackPrevFilled, TbPlayerTrackNextFilled } from "react-icons/tb";
import { GoSearch } from "react-icons/go";
import { fetchVisits } from './fetchdata'
import { useSelector } from "react-redux";
import type { RootState } from "@/app/store/store"

type Visit = {
    name: string
    location: string
    date: string
    pharmacy: string
    remarks: string
}


export default function List() {
    const [data, setVisits] = useState<Visit[]>([])

    const [isMounted, setIsMounted] = useState(false)



    const demoData = useSelector(
        (state: RootState) => state.visit.visits
    )



    useEffect(() => {
        fetchVisits()
            .then(setVisits)
            .catch(console.error)
        setIsMounted(true)
    }, [])

    const items_per_page = 7
    const [currentPage, setCurrentPage] = useState(1)
    const startIndex = (currentPage - 1) * items_per_page
    const endIndex = startIndex + items_per_page

    const totalPages = Math.ceil(data.length / items_per_page)

    const currentData = data.slice(startIndex, endIndex)
    console.log(data)
    return (
        <div className="h-screen w-full p-2 bg-[#eeeeee]/50">
            {/* ----- Summery Container ----- */}

            <div className="grid grid-cols-2 gap-4 mt-3 pb-2 fixed-bottom">

                {/* ----- Daily Visit ----- */}

                <div className="inline-flex justify-start items-center md:w-1/2 bg-white rounded gap-2 p-2 shadow-lg" >
                    <GrCompliance className="bg-[#eeeeee]/70 text-[#ce7e00] rounded p-1 text-4xl" />
                    <div className="p-2 flex flex-col">
                        <p className="text-md text-[#6bb2f2] font-bold">Today's Visits</p>
                        <p className="text-lg font-black self-center">{isMounted ? demoData.length : 0}</p>
                    </div>
                </div>

                {/* ----- Total Visit----- */}

                <div className=" inline-flex justify-start items-center md:w-1/2 bg-white rounded gap-2  p-2 shadow-lg" >
                    <GrCompliance className="bg-[#eeeeee]/70 text-green-500 rounded p-1 text-4xl" />
                    <div className="p-2 flex flex-col">
                        <p className="text-md text-[#6bb2f2] font-bold">Total Visits</p>
                        <p className="text-lg font-black self-center">{data.length}</p>
                    </div>
                </div>
            </div>

            {/* ----- Visit List ----- */}

            <div className="flex flex-col mt-2 p-2">
                <div className="flex flex-col md:flex-row gap-2 md:inline-flex md:justify-between items-center p-2 rounded w-full bg-dlue-100">
                    <div className="md:inline-flex">
                        <input type="search" placeholder="Search Name.." className="outline-none bg-white p-1 border-b-1 border-gray-400 border-offset-3 mb-2" />
                        <input type="date" className="outline-none border-b-1 mb-2" />
                    </div>

                    <GoSearch className="text-sm md:text-xl font-black hidden md:block hover:text-blue-400" />
                    <button className="p-2 bg-blue-400 rounded self-center text-white md:hidden">Search</button>
                </div>

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
        </div>
    )
}