import { NextResponse } from "next/server";
import VisitModel from '@/lib/models/Visits'
import { DBconnection } from '@/lib/db'


export async function GET() {
    try {
        await DBconnection()
        const visits = await VisitModel.find()
        return NextResponse.json(visits)
    } catch (err) {
        return NextResponse.json(
            { error: "Failed to fetch visits" },
            { status: 500 }
        )
    }
}

export async function POST(request: Request) {
    try {
        DBconnection()
        const { id, name, location, date, pharmacy, remarks } = await request.json()

        if (!name || !location || !date) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            )
        }
        await VisitModel.create({
            id, name, location, date, pharmacy, remarks
        })
        return NextResponse.json(
            { success: "Added Successfully" },
            { status: 201 }
        )
    } catch (err) {
        return NextResponse.json(
            { error: "Failed to add visit" },
            { status: 500 }
        )

    }
}