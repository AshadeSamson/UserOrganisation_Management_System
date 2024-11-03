import express from "express"
import { verifyToken } from "../verification/verifyToken"
import { getUserRecord } from "../controllers/userController.js";



const userRouter = express.Router()


userRouter.get("/users/:id", verifyToken, getUserRecord)