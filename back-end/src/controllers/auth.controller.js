import Users from "../models/user.schema.js"
import bcrypt from 'bcrypt'
import transporter from "../utils/sendEmail.js"


export const SignUp = async (req, res) => {
    try{
        const user = await Users.findOne({email:req.body.email})
        if(user) return res.status(400).json({message:"This email connected with another account"})

        req.body.password = await bcrypt.hash(req.body.password, 10)
        const verifyCode = Math.floor(Math.random() * 900000 + 100000).toString()
        const newUser = await Users.create({...req.body, verifyCode:verifyCode})

        await transporter.sendMail({
            from:process.env.EMAIL_FROM,
            to:req.body.email,
            subject:"Verify Your Account",
            html:`
                <div style="font-family:Arial, sans-serif; background-color:#f9f9f9; padding:20px;">
                    <div style="max-width:600px; margin:auto; background-color:#ffffff; border-radius:8px; box-shadow:0 2px 8px rgba(0,0,0,0.1); padding:30px;">

                        <h2 style="color:#333;">Hello <span style="color:#007bff;">${newUser.firstName}</span>,</h2>
                        
                        <p style="font-size:16px; color:#555;"> Thank you for registering on our website! We’re excited to have you with us.</p>
                        
                        <p style="font-size:16px; color:#555;">Here is your verification code: 
                            <span style="font-size:22px; font-weight:bold; color:#007bff; margin:10px 0;">${verifyCode}</span>
                        </p>
                        
                        <p style="font-size:15px; color:#777;">Please note that this code will expire in <strong>10 minutes</strong>.</p>
                        <br/>
                        <p style="font-size:16px; color:#555;">Best regards,
                            <br/><strong>The Support Team</strong>
                        </p>
                        
                    </div>
                </div>
            `
        })
        res.status(201).json({message:"successful registration, check your email"})

    }
    catch(error){
        console.log(error.message)
        res.status(500).json({message:error.message})
    }
}



export const SinnIn = async (req, res) => {

}