import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.route.js"
import linkRoutes from './routes/link.route.js'
import profileRoutes from './routes/profile.route.js'
import cookieParser from "cookie-parser"
import cors from "cors"

dotenv.config()
const app = express()
const corsOptions = {
  origin: ["https://yourdevlinks.netlify.app", "http://localhost:5173"],
  methods: "GET, POST, PUT, DELETE",
  credentials: true
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())

app.use("/api", authRoutes)
app.use("/api", linkRoutes)
app.use("/api", profileRoutes)

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500
  const errorMessage = err.message || "Something went wrong"
  return res.status(errorStatus).send(errorMessage)
})

const databaseUri = process.env.DATABASE_URI
const port = process.env.PORT

mongoose
  .connect(databaseUri)
  .then(() => {
    app.listen(port, () => {
      console.log("server running")
    })
  })
  .catch((err) => console.error(err))
