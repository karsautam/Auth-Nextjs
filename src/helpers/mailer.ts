import nodemailer from 'nodemailer'
import User from '@/models/userModel'
import bcryptjs from "bcryptjs";


export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)

        console.log("MAIL",userId);
        console.log("MAIL TYPE",emailType);
        console.log(typeof emailType);
        

        if (emailType === "VERIFY") {
            const updateUser=await User.findByIdAndUpdate(userId,{
                $set:{
                    verifyToken: hashedToken,
                    verifyTokenExpiry: Date.now() + 3600000
                }
                });

        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId,{
                $set:{
                    forgotPasswordToken: hashedToken,
                    forgotPasswordTokenExpiry: Date.now() + 3600000
                }
                });
        }

        // Looking to send emails in production? Check out our Email API/SMTP product!
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "659faed22abf62", //❌😒
                pass: "135bdd2ad72f65" // ❌
            }
        });
        const mailOption = {
            from: 'hitesh@hitesh./ai',
            to: email,
            subject: emailType === 'VERIFY' ? "VERIFY YOUR EMAIL" : "RESET YOUR PASSWORD",
            html: `<p>click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here<a/> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"} 
            or copy and paste the link below in your blowser. <br>${process.env.DOMAIN}/verifyemail?token=${hashedToken} </p>`
        }
        const emailResponse = await transport.sendMail(mailOption)
        return emailResponse
    } catch (error: any) {
        throw new error(error.message)
    }
}