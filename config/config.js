import { configDotenv } from "dotenv";
configDotenv()

export const { PORT, MONGODB_URL, PASS, JWT } = process.env