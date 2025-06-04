import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true,"name is required"]
    },
    email:{
        type: String,
        required: [true, "Email is required"],
        unique: true,
    },
    password:{
        type:String,
        required: [true, "password is required"]
    },
    balance:{
        type : Number,
        required: [true, "Balance is required"],
        default: 0
    },
    reset_code:{
        type: Number,
    },
},{timestamps: true})


const userModel = mongoose.model("users",userSchema);
export default userModel;

