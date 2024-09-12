import express from "express"
import { db } from "./config/db.js"
import authRouter from "./routes/authRoute.js"
import organisationRouter from "./routes/orgRoute.js"


const appInit = () => {

    const app = express()

    // connect to db
    db.authenticate()
        .then(() => { console.log("database connection is succesful...")})
        .catch((err) => { console.log(err)})

    // middlewares
    app.use(express.json())

    // routes
    app.use("/auth", authRouter)
    app.use("/api", organisationRouter)

    return app
}

export const app = appInit()




