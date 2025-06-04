import express from "express";
import auth from "../../middlewares/auth.js";
import addIncome from "./controllers/addIncome.js";
import addExpense from "./controllers/addExpense.js";
import getTransactions from "./controllers/getTransactions.js";
import deleteTransaction from "./controllers/deleteTransaction.js";
import editTransaction from "./controllers/editTransaction.js";
const transactionRoutes = express.Router();

//Routes


transactionRoutes.use(auth)

//Protected routes

transactionRoutes.post("/addIncome",addIncome)
transactionRoutes.post("/addExpense",addExpense)
transactionRoutes.get("/",getTransactions)

transactionRoutes.delete("/:transaction_id", deleteTransaction)
transactionRoutes.patch("/", editTransaction)


export default transactionRoutes;