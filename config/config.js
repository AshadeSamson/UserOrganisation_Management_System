import { configDotenv } from "dotenv";
configDotenv()

export const { PORT, DB_URL, PASS, JWT } = process.env