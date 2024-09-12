import { app } from "./server.js"
import { PORT } from "./config/config.js"



export const server = app.listen(PORT || 5000, () => {
    console.log(`Server running on port ${PORT}`)
})