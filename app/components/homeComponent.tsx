'use client'
import { v4 as uuidv4 } from 'uuid'
import { UseSelector, useDispatch } from 'react-redux';
import { FaUserDoctor, FaMapLocationDot, FaStore } from "react-icons/fa6";
import { BsFillCalendar2DateFill } from "react-icons/bs";
import { GrCompliance } from "react-icons/gr";
import { useState, useEffect } from "react";
import { addvishlist } from '@/app/store/visitSite'




export default function HomePage() {

    const dispatch = useDispatch()

    const [name, setName] = useState('')
    const [location, setLocation] = useState('')
    const [date, setDate] = useState('')
    const [pharmacy, setPharmacy] = useState('')
    const [remarks, setRemarks] = useState('')
    const [errorMsg, setErrorMsg] = useState(false)

    const submitToRedux = () => {

        if (!name.trim() || !location.trim() || !date.trim() || !pharmacy.trim() || !remarks.trim()) {
            setErrorMsg(true)
            return
        }

        setErrorMsg(false)
        const demo = {
            id: uuidv4(),
            name,
            location,
            date,
            pharmacy,
            remarks,
        }
        dispatch(addvishlist(demo))
        setName('')
        setLocation('')
        setDate('')
        setPharmacy('')
        setRemarks('')

    }

    return (
        <div className="h-screen w-full p-2 bg-[#eeeeee]/50">
            {/* ----- Input Container ----- */}
            <div className="flex flex-col w-full gap-2">

                {/* ----- 1st Row ----- */}

                <div className="p-2 flex flex-col md:grid md:grid-cols-6 gap-4">
                    <div className="col-start-2 col-span-2 inline-flex justify-start items-center bg-white rounded gap-2 p-2 shadow-lg" >
                        <FaUserDoctor className="bg-[#eeeeee]/70 text-[#6bb2f2] rounded p-1 text-4xl" />
                        <div className="p-2 flex flex-col">
                            <label htmlFor="Doctor" className="text-md text-[#6bb2f2] font-bold">Doctor</label>
                            <input type="text" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} className="p-2 outline-none border-1 border-[#eeeeee] rounded " />
                        </div>
                    </div>

                    <div className="col-start-4 col-span-2 inline-flex justify-start items-center bg-white rounded gap-2 p-2 shadow-lg" >
                        <FaMapLocationDot className="bg-[#eeeeee]/70 text-[#6bb2f2] rounded p-1 text-4xl" />
                        <div className="p-2 flex flex-col">
                            <label htmlFor="Location" className="text-md text-[#6bb2f2] font-bold">Location</label>
                            <input type="text" id="Location" placeholder="Enter Place" value={location} onChange={(e) => setLocation(e.target.value)} className="p-2 outline-none border-1 border-[#eeeeee] rounded" />
                        </div>
                    </div>
                </div>

                {/* ----- 2nd Row ----- */}

                <div className="p-2 flex flex-col md:grid md:grid-cols-6 gap-4">
                    <div className="col-start-2 col-span-2 inline-flex justify-start items-center bg-white rounded gap-2 p-2 shadow-lg" >
                        <BsFillCalendar2DateFill className="bg-[#eeeeee]/70 text-[#6bb2f2] rounded p-1 text-4xl" />
                        <div className="p-2 flex flex-col">
                            <label htmlFor="Date" className="text-md text-[#6bb2f2] font-bold">Date</label>
                            <input type="date" id="Date" placeholder="Enter Name" value={date} onChange={(e) => setDate(e.target.value)} className="p-2 outline-none border-1 border-[#eeeeee] rounded" />
                        </div>
                    </div>

                    <div className="col-start-4 col-span-2 inline-flex justify-start items-center bg-white rounded gap-2 p-2 shadow-lg" >
                        <FaStore className="bg-[#eeeeee]/70 text-[#6bb2f2] rounded p-1 text-4xl" />
                        <div className="p-2 flex flex-col">
                            <label htmlFor="Medical" className="text-md text-[#6bb2f2] font-bold">Medical</label>
                            <input type="text" id="Medical" placeholder="Enter Name" value={pharmacy} onChange={(e) => setPharmacy(e.target.value)} className="p-2 outline-none border-1 border-[#eeeeee] w-full rounded" />
                        </div>
                    </div>
                </div>

                {/* ----- Detail Container ----- */}

                <div className="p-2 md:grid md:grid-cols-3 gap-4">
                    <div className="col-start-2 flex flex-col justify-start items-start bg-white rounded gap-2 p-2 shadow-lg" >
                        <label htmlFor="More Detail" className="text-md text-brat-600 font-bold">More Detail</label>
                        <textarea className="p-2 bg-[#eeeeee]/70 text-[#000000] w-full rounded" value={remarks} onChange={(e) => setRemarks(e.target.value)} />
                    </div>
                </div>
                <button className="p-2 bg-blue-500 rounded w-70 self-center shadow-lg shadow-blue-400" onClick={() => submitToRedux()}>SUBMIT</button>
            </div>

            {/* ----- Summery Container ----- */}

            <div className="grid grid-cols-2 gap-4 mt-20 pb-4 fixed-bottom">

                {/* ----- Daily Visit ----- */}

                <div className="inline-flex justify-start items-center md:w-1/2 bg-white rounded gap-2 p-2 shadow-lg" >
                    <GrCompliance className="bg-[#eeeeee]/70 text-[#ce7e00] rounded p-1 text-4xl" />
                    <div className="p-2 flex flex-col">
                        <p className="text-md text-[#6bb2f2] font-bold">Today's Visits</p>
                        <p className="text-lg font-black self-center">6</p>
                    </div>
                </div>

                {/* ----- Total Visit----- */}

                <div className=" inline-flex justify-start items-center md:w-1/2 bg-white rounded gap-2  p-2 shadow-lg" >
                    <GrCompliance className="bg-[#eeeeee]/70 text-green-500 rounded p-1 text-4xl" />
                    <div className="p-2 flex flex-col">
                        <p className="text-md text-[#6bb2f2] font-bold">Total Visits</p>
                        <p className="text-lg font-black self-center">6</p>
                    </div>
                </div>
            </div>

        </div>
    )
}