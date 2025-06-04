import mongoose from "mongoose";

const userDashboard = async (req,res)=>{
    const userModel = mongoose.model("users");
    const transactionModel = mongoose.model("transactions");

    // console.log(req.user);

    const getUser = await userModel.findOne({
        _id:req.user._id,
    }).select("-password")

    const transactions = await transactionModel.find({
        user_id: req.user._id,
    }).sort("-createdAt").limit(5);

    res.status(200).json({
        status:"success",
        data: getUser,
        transactions,
    })
}

export default userDashboard;