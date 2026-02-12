'use client'

import { useState, useEffect } from "react";
import { GrCompliance } from "react-icons/gr";
import { TbPlayerTrackPrevFilled, TbPlayerTrackNextFilled } from "react-icons/tb";
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
    const [search, setSearch] = useState('')
    const [reqDate, setReqDate] = useState('')
    const [data, setVisits] = useState<Visit[]>([])
    const [isMounted, setIsMounted] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)

    const demoData = useSelector(
        (state: RootState) => state.visit.visits
    )

    useEffect(() => {
        fetchVisits()
            .then(setVisits)
            .catch(console.error)
        setIsMounted(true)
    }, [])

    // ✅ FILTER LOGIC
    const filteredData = data.filter((item) =>
        (!search || item.name.toLowerCase().includes(search.toLowerCase())) &&
        (!reqDate || item.date === reqDate)
    )

    // ✅ PAGINATION
    const items_per_page = 7
    const totalPages = Math.ceil(filteredData.length / items_per_page)
    const startIndex = (currentPage - 1) * items_per_page
    const endIndex = startIndex + items_per_page
    const currentData = filteredData.slice(startIndex, endIndex)

    // ✅ Reset page when filter changes
    useEffect(() => {
        setCurrentPage(1)
    }, [search, reqDate])

    return (
        <div className="h-screen w-full p-2 bg-[#eeeeee]/50">

            {/* Summary */}
            <div className="grid grid-cols-2 gap-4 mt-3 pb-2">
                <div className="inline-flex items-center bg-white rounded gap-2 p-2 shadow-lg">
                    <GrCompliance className="bg-[#eeeeee]/70 text-[#ce7e00] rounded p-1 text-4xl" />
                    <div className="flex flex-col">
                        <p className="text-md text-[#6bb2f2] font-bold">Today's Visits</p>
                        <p className="text-lg font-black self-center">
                            {isMounted ? demoData.length : 0}
                        </p>
                    </div>
                </div>

                <div className="inline-flex items-center bg-white rounded gap-2 p-2 shadow-lg">
                    <GrCompliance className="bg-[#eeeeee]/70 text-green-500 rounded p-1 text-4xl" />
                    <div className="flex flex-col">
                        <p className="text-md text-[#6bb2f2] font-bold">Total Visits</p>
                        <p className="text-lg font-black self-center">
                            {data.length}
                        </p>
                    </div>
                </div>
            </div>

            {/* Search */}
            <div className="flex flex-col mt-4 p-2 bg-white rounded shadow">
                <div className="flex gap-2">
                    <input
                        type="search"
                        placeholder="Search Name.."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="outline-none bg-white p-2 border border-gray-300 rounded w-full"
                    />
                    <input
                        type="date"
                        value={reqDate}
                        onChange={(e) => setReqDate(e.target.value)}
                        className="outline-none p-2 border border-gray-300 rounded"
                    />
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto mt-4">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-blue-100 text-left">
                            <th className="p-3 border">Doctor Name</th>
                            <th className="p-3 border">Place</th>
                            <th className="p-3 border">Date</th>
                            <th className="p-3 border">Medical Shop</th>
                            <th className="p-3 border">Additional Data</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentData.map((item, index) => (
                            <tr key={index} className="hover:bg-gray-200">
                                <td className="p-3 border">{item.name}</td>
                                <td className="p-3 border">{item.location}</td>
                                <td className="p-3 border">{item.date}</td>
                                <td className="p-3 border">{item.pharmacy}</td>
                                <td className="p-3 border">{item.remarks}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Pagination */}
                <div className="flex justify-between items-center mt-5 px-4">
                    <button
                        onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
                        className={`${currentPage > 1 ? 'block' : 'hidden'}`}
                    >
                        <TbPlayerTrackPrevFilled className="p-2 text-2xl bg-blue-100" />
                    </button>

                    <p className="text-lg font-semibold">
                        Page {currentPage} / {totalPages || 1}
                    </p>

                    <button
                        onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
                        className={`${currentPage < totalPages ? 'block' : 'hidden'}`}
                    >
                        <TbPlayerTrackNextFilled className="p-2 text-2xl bg-blue-100" />
                    </button>
                </div>
            </div>
        </div>
    )
}
