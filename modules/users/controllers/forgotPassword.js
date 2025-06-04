import mongoose from "mongoose"
import emailManager from "../../../managers/emailManager.js";

const forgotPassword = async (req,res)=>{

    const userModel = mongoose.model("users")

    const {email} = req.body;

    if(!email) throw "Email is required!"

    const getUser = await userModel.findOne({
        email:email,
    })

    if(!getUser) throw "This email does not exist in the system"

    const resetCode = Math.floor(10000 + Math.random()*90000);

    await userModel.updateOne({
        email: email,
    },{
        reset_code: resetCode,
    },{
        runValidators: true
    })


    await emailManager(email, "Your password reset code is "+ resetCode, "Your password reset code is "+ resetCode, 
        "Reset your password - Expense Tracker PRO"
    )


    res.status(200).json({
        status: "success",
        message:"Reset code has been to email successfully"
    })
}

export default forgotPassword