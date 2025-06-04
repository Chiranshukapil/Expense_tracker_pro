import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwtManager from "../../../managers/jwtManager.js";

const login = async (req,res)=>{
    const userModel = mongoose.model("users")

    const {email, password} = req.body;

    const getUser = await userModel.findOne({
        email: email
    })

    if (!getUser)   throw "This email does not exist"

    const comparePass = await bcrypt.compare(password,getUser.password);
    if(!comparePass) throw "Email and password do not match!"

    const accesstoken = jwtManager(getUser);

    //success response
    res.status(200).json({
        status:"success",
        message:"User logged in successfuly",
        accesstoken,
    })
}

export default login;