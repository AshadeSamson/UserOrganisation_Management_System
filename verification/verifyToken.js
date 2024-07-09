import { JWT } from "../config/config.js";
import jwt from "jsonwebtoken"

export const verifyToken = (req, res, next) => {

    const token = req.headers.accessToken

    if(!token){
        return res.status(403).json("Unauthorized")
    }

    jwt.verify(token, JWT, (err, decodedToken) => {
        if(err){
            return res.send("Invalid Token!")
        }
        req.user = decodedToken
        next()
        })

}