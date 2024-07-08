import { JWT } from "../config/config.js";
import jwt from "jsonwebtoken"

export const verifyToken = (req, res, next) => {

    const token = req.cookies.auth

    if(token){
        jwt.verify(token, JWT, (err, decodedToken) => {
            if(err){
                res.status(403).json("unauthorized!")
            }
            req.user = decodedToken
            next()
        })
    }else{
        res.status(403).json("you are not authenticated!")
    }
}