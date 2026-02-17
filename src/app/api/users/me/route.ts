import { connect } from '@/dbconnect/dbconnect'
import User from '@/models/userModel'
// import { log } from 'console'
import { NextRequest, NextResponse } from 'next/server'

import { getDataFromToken } from '@/helpers/getDataFromToken';

connect()


export async function POST(request: NextRequest) {
    const userId = await getDataFromToken(request)
    const user = await User.findOne({ _id: userId }).select("-password")
    return NextResponse.json({
        message: "User found",
        data: user
    })
}


