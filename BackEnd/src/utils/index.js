const express = require("express")
const bodyParser = require("body-parser")
const path = require("path")
const cors = require("cors")
const dotenv = require("dotenv")
const cookieParser = require("cookie-parser")

// Import routes and database connection
const authRoutes = require("../routes/authRoutes.js")
const connectDB = require("../db/index.js")
const calculationRoutes = require("../routes/calculationRoutes.js")
const finalDataRoutes = require("../routes/finalDataRoutes.js")
const memberRoutes = require("../routes/memberRoutes.js")
const soilRoutes = require("../routes/soilRoutes.js")
const reportRoutes = require("../routes/reportRoutes.js")

dotenv.config() // Load environment variables

// Global handlers to log uncaught exceptions and unhandled promise rejections
process.on("uncaughtException", err => {
	console.error(
		"[FATAL] Uncaught Exception:",
		err && err.stack ? err.stack : err,
	)
})

process.on("unhandledRejection", (reason, promise) => {
	console.error("[FATAL] Unhandled Rejection at:", promise, "reason:", reason)
})

// Provide safe development defaults for JWT env vars if missing so dev doesn't crash
if (!process.env.ACCESS_TOKEN_SECRET) {
	console.warn(
		"[WARN] ACCESS_TOKEN_SECRET not set - using development default. Set a real secret in BackEnd/.env for production.",
	)
	process.env.ACCESS_TOKEN_SECRET = "dev_access_secret_change_me"
}
if (!process.env.REFRESH_TOKEN_SECRET) {
	console.warn(
		"[WARN] REFRESH_TOKEN_SECRET not set - using development default. Set a real secret in BackEnd/.env for production.",
	)
	process.env.REFRESH_TOKEN_SECRET = "dev_refresh_secret_change_me"
}
if (!process.env.ACCESS_TOKEN_EXPIRY) {
	process.env.ACCESS_TOKEN_EXPIRY = "1h"
}
if (!process.env.REFRESH_TOKEN_EXPIRY) {
	process.env.REFRESH_TOKEN_EXPIRY = "7d"
}

const app = express()
const PORT = process.env.PORT || 4000

// Middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(
	cors({
		origin: [
			"http://localhost:3000",
			"https://flowmen-common.onrender.com",
			"http://192.168.4.102:3000",
			"http://localhost:4000",
			"http://localhost:5174",
			"http://localhost:5173",
		],
		methods: "GET,POST,PUT,DELETE",
		allowedHeaders: "Content-Type,Authorization",
	}),
)

// Connect to MongoDB
connectDB()

// Routes
app.use("/auth", authRoutes)
app.use("/calculation", calculationRoutes)
app.use("/data", finalDataRoutes)
app.use("/member", memberRoutes)
app.use("/soil", soilRoutes)
app.use("/reports", reportRoutes)

// **✅ Serve Frontend Static Files (React Build)**
app.use(express.static(path.join(__dirname, "dist")))

// **✅ Handle SPA (React Single Page Application)**
app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "dist", "index.html"))
})

// Basic error handler to format ApiError and other errors
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
	const status = err.statusCode || err.status || 500
	const message = err.message || "Internal Server Error"
	res.status(status).json({ error: message })
})

// Start server
app.listen(PORT, () => {
	console.log(`🚀 Server is running on http://localhost:${PORT}`)
})
