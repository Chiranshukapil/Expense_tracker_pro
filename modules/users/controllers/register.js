import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwtManager from "../../../managers/jwtManager.js";
import emailManager from "../../../managers/emailManager.js";

const register = async (req,res)=>{

    const userModel = mongoose.model("users")

    const {email, password, confirm_password, name, balance} = req.body;

    //Validations
    if(!email) throw "email must be provided!"
    if(!password) throw "password must be provided!"
    if(password.length < 5) throw "password must be at least 5 characters long"
    if(!name) throw "Name is required!"
    if(password!==confirm_password) throw "Password and Confirm Password doesn't match"

    const getDuplicateEmail = await userModel.findOne({
        email: email,
    })

    if(getDuplicateEmail) throw "This email already exist";
    
    const hashedPassword = await bcrypt.hash(password, 12)

    const createdUser = await userModel.create({
        name: name,
        email: email,
        password: hashedPassword,
        balance: balance,
    });

    const accesstoken = jwtManager(createdUser);
    
    await emailManager(createdUser.email, "Welcome to the expense tracker pro. We hope you can manage your expense easily from our platform.", 
        "<h1>Welcome to the expense tracker pro.</h1> <br/><br/> We hope you can manage your expense easily from our platform.", 
        "Welcome to Expense Tracker PRO!"
    )

    res.status(201).json({
        status:"User Registered Successfully!",
        accesstoken: accesstoken,
    })
}

export default register;