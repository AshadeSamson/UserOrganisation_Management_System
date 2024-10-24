import express from "express"
import { db } from "./config/db.js"
import authRouter from "./routes/authRoute.js"
import organisationRouter from "./routes/orgRoute.js"
// import swaggerUI from "swagger-ui-express"
// import swaggerDocs from "./swagger.json" assert { type: 'json' }


const appInit = () => {

    const app = express()

    // connect to db
    db.authenticate()
        .then(() => { console.log("database connection is succesful...")})
        .catch((err) => { console.log(err)})

    // middlewares
    app.use(express.json())
    // app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

    // routes
    app.get("/", async (req, res) => { res.json("you are welcome")})
    app.use("/auth", authRouter)
    app.use("/api", organisationRouter)

    return app
}

export const app = appInit()




