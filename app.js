import cookieParser from "cookie-parser"
import express from "express"
import cors from "cors"
import { PORT } from "./config/config.js"

const app = express()


// MIDDLEWARES
app.use(express.json())
app.use(cors())
app.use(cookieParser)

app.get("/", (req, res) => {
    res.status(200).json("You are welcome")
})

app.listen(PORT || 5000, () => {
    console.log(`Server running on port ${PORT}`)
})