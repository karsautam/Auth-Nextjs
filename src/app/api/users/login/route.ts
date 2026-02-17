import {connect} from '@/dbconnect/dbconnect'
import User from '@/models/userModel'
// import { log } from 'console'
import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from "bcryptjs";
import { sendEmail } from '@/helpers/mailer';
import jwt from 'jsonwebtoken'

connect()

export async function POST(request:NextRequest) {
    try {
        const reqBody=await request.json()
        const {email,password} = reqBody
        console.log(reqBody);

        const user=await User.findOne({email})
        if(!user){
            return NextResponse.json({message:"user does not exist"}, {status:400})
        }

        console.log("user exist");

        const validPassword= await bcryptjs.compare(password,user.password)

        if(!validPassword){
                    return NextResponse.json({message:"check your credentials"}, {status:400})
        }
        
        const tokenData ={
            id: user._id,
            username: user.username,
            email: user.email,
        }

        const token=await jwt.sign(tokenData,process.env.TOKEN_SECRET!,{ expiresIn:'1d'})

        const response= NextResponse.json({message:"Loggedin",
            success:true,
        })

        response.cookies.set("token", token, {
            httpOnly:true
        })
        return response
        
        
    } catch (error:any) {
        return NextResponse.json({error:error.message}, {status:500})
        
    }
}