import { User } from "../models/user.js";
import { Organisation } from "../models/organisaton.js";
import  CryptoJS  from "crypto-js";
import { PASS, JWT } from "../config/config.js";
import jwt from "jsonwebtoken";


// user registration controller
const register = async (req, res) => {

    const { firstName, lastName, email, password, phone} = req.body
    const hashedPassword = CryptoJS.AES.encrypt(password, PASS) 

    try{
        
        const newUser = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            phone
        })

        const userOrg = await Organisation.create({
            name: `${firstname}'s Organisation`,
            description: ""
        })

        await newUser.addOrganisation(userOrg)
        
        const token = jwt.sign({ userId: newUser.userId, email: newUser.email }, JWT, {expiresIn: "1h"})
        const tokenLS = 1000 * 3 * 24 * 60 * 60
        res.cookie("auth", token, {httpOnly: true, maxAge: tokenLS})
     
        res.status(201).json({
            status: 'success',
            message: 'Registration successful',
            data: {
              accessToken: token,
              user: {
                userId: newUser.userId,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email,
                phone: newUser.phone,
              },
            },
          })

    } catch(e){
        res.status(400).json({
            status: 'Bad request',
            message: 'Registration unsuccessful',
            statusCode: 400,
          })
    }
}




// user login controller
const login = async (req, res) => {

    const { email, password } = req.body
    const savedPassword = CryptoJS.AES.decrypt(password, PASS).toString(CryptoJS.enc.Utf8)

    try {
        const user = await User.findOne({ where: { email }})

        if(!user || password !== savedPassword){
            return res.status(401).json({
                status: 'Bad request',
                message: 'Authentication failed',
                statusCode: 401,
              })
        }

        const token = jwt.sign({ userId: newUser.userId, email: newUser.email }, JWT, {expiresIn: "1h"})
        const tokenLS = 1000 * 3 * 24 * 60 * 60
        res.cookie("auth", token, {httpOnly: true, maxAge: tokenLS})

        res.status(200).json({
            status: 'success',
            message: 'Login successful',
            data: {
              accessToken: token,
              user: {
                userId: user.userId,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phone: user.phone,
              },
            },
          })
        
        
    } catch (e) {
        res.status(401).json({
          status: 'Bad request',
          message: 'Authentication failed',
          statusCode: 401,
        })
}
}


export { register, login }