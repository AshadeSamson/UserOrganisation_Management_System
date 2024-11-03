import express from "express";
import { db } from "./config/db.js";
import authRouter from "./routes/authRoute.js";
import userRouter from "./routes/userRoute.js"
import organisationRouter from "./routes/orgRoute.js";
import swaggerUI from "swagger-ui-express";
import swaggerDocs from "./swagger.json" assert { type: 'json' };


const appInit = () => {

    const app = express()

    // connect to db
    db.authenticate()
        .then(() => { console.log("database connection is succesful...")})
        .catch((err) => { console.log(err)})

    // middlewares
    app.use(express.json())

    const CSS_URL = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css"
    app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs, {
        customCss:
            '.swagger-ui .opblock .opblock-summary-path-description-wrapper { align-items: center; display: flex; flex-wrap: wrap; gap: 0 10px; padding: 0 10px; width: 100%; }',
        customCssUrl: CSS_URL,
    }));

    // routes
    app.get("/", (req, res) => { res.json("you are welcome")})
    app.use("/auth", authRouter)
    app.use("/api", organisationRouter)
    app.use("/api", userRouter)

    return app
}

export const app = appInit()




