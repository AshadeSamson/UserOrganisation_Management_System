import { app } from "./server.js"
import { PORT } from "./config/config.js"

// for localhost environment
// export const server = app.listen(PORT || 0, () => {
//     console.log(`Server running on port ${server.address().port}`)
// })


// for production environment (vercel)
export default app;



  