import { app } from "./server.js"
import { PORT } from "./config/config.js"

export const server = app.listen(PORT || 0, () => {
    console.log(`Server running on port ${server.address().port}`)
})



  