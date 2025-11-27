const mongoose = require("mongoose")
const dotenv = require("dotenv")
const { DB_NAME } = require("../utils/constants.js")

dotenv.config()

// Ensure MONGODB_URI is provided. In development we prefer a warning and a no-op
// instead of exiting the process so the dev server can start even when a
// database isn't available.
const rawUri = process.env.MONGODB_URI
if (!rawUri || typeof rawUri !== "string" || rawUri.trim() === "") {
	console.warn(
		"\n[WARN] MONGODB_URI is not set. Backend will start without DB connection.",
	)
	console.warn(
		"Create BackEnd/.env with MONGODB_URI=mongodb://localhost:27017 to enable DB.",
	)

	// export a no-op connect function for development convenience
	module.exports = async function connectDBNoop() {
		// keep the shape of the original function (async) so callers can await it
		return Promise.resolve()
	}
} else {
	const URI = rawUri.replace(/\/$/, "") // remove trailing slash if any

	const connectDB = async () => {
		try {
			const connectionInstance = await mongoose.connect(`${URI}/${DB_NAME}`, {
				useNewUrlParser: true,
				useUnifiedTopology: true,
			})
			console.log(
				`\nMongoDB connected! Host: ${connectionInstance.connection.host}`,
			)
		} catch (error) {
			console.error("MONGODB connection error:", error)
			// In production we still want to fail fast; in dev, letting the server run
			// without DB can be helpful. Keep exiting to avoid silent failures.
			process.exit(1)
		}
	}

	module.exports = connectDB
}
