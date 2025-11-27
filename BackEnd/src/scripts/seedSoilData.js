const axios = require("axios")

// Simple seeder that posts generated soil readings to the running backend API.
// Usage: run the backend (npm start) and then `npm run seed` from the BackEnd folder.

const BASE = "http://localhost:4000"
const URL = `${BASE}/soil/data`

function randAround(base, spread = 10) {
	const delta = (Math.random() - 0.5) * 2 * spread
	return Math.round((base + delta) * 10) / 10
}

async function seed(count = 30) {
	console.log(`Posting ${count} sample soil readings to ${URL}`)
	const now = Date.now()
	const dayMs = 24 * 60 * 60 * 1000
	for (let i = count - 1; i >= 0; i--) {
		const ts = new Date(now - i * dayMs).toISOString()

		const payload = {
			timestamp: ts,
			moisture: randAround(50, 15),
			pH: randAround(6.5, 0.6),
			temp: randAround(20, 6),
			phosphorus: randAround(60, 12),
			sulfur: randAround(60, 10),
			zinc: randAround(60, 8),
			iron: randAround(60, 10),
			manganese: randAround(60, 8),
			copper: randAround(60, 6),
			potassium: randAround(60, 8),
			calcium: randAround(60, 18),
			magnesium: randAround(60, 8),
			sodium: randAround(30, 6),
		}

		try {
			const res = await axios.post(URL, payload)
			console.log(`Posted ${ts} -> ${res.status}`)
		} catch (err) {
			console.error("Failed to post", err?.response?.data || err.message || err)
			process.exit(1)
		}
	}
	console.log("Seeding completed.")
}

if (require.main === module) {
	const arg = process.argv[2] ? parseInt(process.argv[2], 10) : 30
	seed(arg)
}
