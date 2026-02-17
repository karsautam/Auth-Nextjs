import {connect} from '@/dbconnect/dbconnect'
import User from '@/models/userModel'
// import { log } from 'console'
import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from "bcryptjs";
import { sendEmail } from '@/helpers/mailer';
import jwt from 'jsonwebtoken'

connect()

export async function GET(request:NextRequest) {
    try {
            const response= NextResponse.json({
                message:"Logout sujccessfully",
                success: true,
            })

            response.cookies.set("token", "",{
                httpOnly:true,
                expires:new Date(0)
            })
                return response

          } catch (error:any) {
                return NextResponse.json({error:error.message}, {status:500})
                
            }
    }