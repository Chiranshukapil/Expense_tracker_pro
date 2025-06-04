import mongoose from "mongoose";
import validator from "validator";

const addIncome = async (req,res) =>{

    const userModel = mongoose.model("users")
    const transactionModel = mongoose.model("transactions")

    const {amount, remarks} = req.body;

    if(!amount) throw "Amount is required!"
    if(!remarks) throw "Remarks is required!"
    if(remarks.length < 5) throw "Remarks must be at least 5 characters long"
    if(!validator.isNumeric(amount.toString())) throw "Amount must be a valid Number"
    if(amount<0) throw "Amouunt must not be negative"

    await transactionModel.create({
        user_id: req.user._id,
        amount: amount,
        remarks: remarks,
        transaction_type: "income",

    })

    await userModel.updateOne({
        _id:req.user._id,
    },{
        $inc:{
            balance: amount
        }
    },{
        runValidators: true
    })

    res.status(200).json({
        status:"Success",
        messsage:"Income added successfully"
    })

}

export default addIncome;