import {connect} from '@/dbconnect/dbconnect'
import User from '@/models/userModel'
// import { log } from 'console'
import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from "bcryptjs";
import { sendEmail } from '@/helpers/mailer';

connect()

export async function POST(request:NextRequest) {
    try {
        
        const reqBody=await request.json()
        const {username,email,password}=reqBody
        console.log(reqBody);
        

        const user= await User.findOne({email})
        if(user){
            return NextResponse.json({error: "user already exist"}, {status: 400})

        }
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser= new User({
            email,
            username,
            password:hashedPassword,

        })
        const savedUser= await newUser.save();
        console.log(savedUser);

        const userId=savedUser._id
        //send verification email
        await sendEmail({email,emailType:"VERIFY",userId:userId})
        return NextResponse.json({
            message: "User registered succesfully",
            structuredClone:true,
            savedUser
        }) 
        
        
    } catch (error:any) {
        return NextResponse.json({error:error.message}, {status:500})
    }
}

// localhost:3000/api/users/signup