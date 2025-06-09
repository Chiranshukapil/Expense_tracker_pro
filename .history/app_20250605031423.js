import express from "express"
import cors from "cors"
import errorHandler from "./handlers/errorHandler.js";
import mongoose from "mongoose"
import userRoutes from "./modules/users/users.route.js";
import transactionRoutes from "./modules/transactions/transactions.route.js";

import 'dotenv/config'

const app = express();
app.use(cors());


console.log("Mongo URI:", process.env.mongo_connection);

mongoose.connect(process.env.mongo_connection,{}).then(()=>{
    console.log("Mongo connection successfull!");
}).catch(()=>{
    console.log("Mongo Connection failed!")
})

//models initialisation
import userModel from "./models/user.model.js";
import transactionModel from "./models/transaction.model.js";


app.use(express.json());

//Routes
app.use("/api/users", userRoutes)
app.use("/api/transactions", transactionRoutes)

// app.all("*", (req,res,next)=>{
//     res.status(404).json({
//         status:"failed",
//         message:"Not Found!"
//     });
// });
app.use((req, res, next) => {
    console.warn(`Unmatched route: ${req.method} ${req.originalUrl}`);
    res.status(404).json({
        status: "failed",
        message: "Not Found!"
    });
});

app.use(errorHandler);

app.listen(8000,()=>{
    console.log("Server started successfully!");
})