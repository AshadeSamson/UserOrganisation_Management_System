import express from "express"
import { PORT } from "./config/config.js"
import { db } from "./config/db.js"
import authRouter from "./routes/authRoute.js"

const app = express()

// connect to db
db.authenticate()
    .then(() => { console.log("database connection is succesful...")})
    .catch((err) => { console.log(err)})



// MIDDLEWARES
app.use(express.json())




// routes
app.get("/", (req, res) => {
    res.status(200).json("You are welcome")
})
app.use("/auth", authRouter)


app.listen(PORT || 5000, () => {
    console.log(`Server running on port ${PORT}`)
})