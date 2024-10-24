import { app } from "./server.js"
import { PORT } from "./config/config.js"

// for localhost environment
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT || 0, () => {
        console.log(`Server running on port ${PORT || 0}`);
    });
}


// for production environment (vercel)
export default app;



  