import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import authRouter from './routes/authRoute.js'
import userRouter from "./routes/userRoutes.js";
const app=express();
const port=process.env.PORT || 5050;
connectDB()
const allwoedOrigins=['http://localhost:5173']
app.use(express.json());
app.use(cookieParser())
app.use(cors({origin:allwoedOrigins,credentials:true}))
app.use(express.urlencoded({ extended: true }));
app.get('/',(req,res)=>{
res.send("log")
})
app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)
app.listen(port,()=>{
    console.log(`server is running ${port}`);
})