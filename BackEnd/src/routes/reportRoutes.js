const express = require("express")
const storage = require("node-persist")

const router = express.Router()

// Initialize storage defensively
;(async () => {
	try {
		await storage.init()
	} catch (err) {
		console.warn("reportRoutes: storage.init failed", err && err.message)
	}
})()

// GET /reports/plant -> returns cached previousplantData wrapped in { data: [...] }
router.get("/plant", async (req, res) => {
	try {
		const { start, stop } = req.query
		const item = await storage.getItem("previousplantData")

		// If no cached data, return sample mock data for local development
		if (!item) {
			// Generate mock data with varying dates over the past 30 days
			const mockData = [
				{
					crop: "Wheat",
					farmPlot: "North-A",
					growthStage: "Flowering",
					healthStatus: "Healthy",
					estimatedYield: 5200,
					lastScan: new Date(
						Date.now() - 1 * 24 * 60 * 60 * 1000,
					).toISOString(),
				},
				{
					crop: "Corn",
					farmPlot: "South-B",
					growthStage: "Vegetative",
					healthStatus: "Healthy",
					estimatedYield: 8500,
					lastScan: new Date(
						Date.now() - 2 * 24 * 60 * 60 * 1000,
					).toISOString(),
				},
				{
					crop: "Soybeans",
					farmPlot: "East-C",
					growthStage: "Pod Filling",
					healthStatus: "Early Disease",
					estimatedYield: 3100,
					lastScan: new Date(
						Date.now() - 5 * 24 * 60 * 60 * 1000,
					).toISOString(),
				},
				{
					crop: "Potatoes",
					farmPlot: "West-D",
					growthStage: "Tuberization",
					healthStatus: "Healthy",
					estimatedYield: 12000,
					lastScan: new Date(
						Date.now() - 7 * 24 * 60 * 60 * 1000,
					).toISOString(),
				},
				{
					crop: "Tomatoes",
					farmPlot: "Greenhouse-1",
					growthStage: "Fruiting",
					healthStatus: "Healthy",
					estimatedYield: 7800,
					lastScan: new Date(
						Date.now() - 10 * 24 * 60 * 60 * 1000,
					).toISOString(),
				},
				{
					crop: "Rice",
					farmPlot: "South-A",
					growthStage: "Tillering",
					healthStatus: "Healthy",
					estimatedYield: 6500,
					lastScan: new Date(
						Date.now() - 15 * 24 * 60 * 60 * 1000,
					).toISOString(),
				},
				{
					crop: "Barley",
					farmPlot: "East-B",
					growthStage: "Heading",
					healthStatus: "Healthy",
					estimatedYield: 4200,
					lastScan: new Date(
						Date.now() - 20 * 24 * 60 * 60 * 1000,
					).toISOString(),
				},
				{
					crop: "Cotton",
					farmPlot: "West-C",
					growthStage: "Boll Development",
					healthStatus: "Early Disease",
					estimatedYield: 3800,
					lastScan: new Date(
						Date.now() - 25 * 24 * 60 * 60 * 1000,
					).toISOString(),
				},
				{
					crop: "Sugarcane",
					farmPlot: "North-B",
					growthStage: "Grand Growth",
					healthStatus: "Healthy",
					estimatedYield: 15000,
					lastScan: new Date(
						Date.now() - 28 * 24 * 60 * 60 * 1000,
					).toISOString(),
				},
				{
					crop: "Lettuce",
					farmPlot: "Greenhouse-2",
					growthStage: "Heading",
					healthStatus: "Healthy",
					estimatedYield: 2500,
					lastScan: new Date(
						Date.now() - 3 * 24 * 60 * 60 * 1000,
					).toISOString(),
				},
			]

			// Filter by date range if start and stop are provided
			let filteredData = mockData
			if (start && stop) {
				const startDate = new Date(start)
				const stopDate = new Date(stop)

				filteredData = mockData.filter(row => {
					const scanDate = new Date(row.lastScan)
					return scanDate >= startDate && scanDate <= stopDate
				})
			}

			// Sort by date in ascending order (oldest to newest)
			filteredData.sort((a, b) => new Date(a.lastScan) - new Date(b.lastScan))

			return res.json({ data: filteredData })
		}

		// Return as array for frontend compatibility
		return res.json({ data: [item] })
	} catch (err) {
		console.error("reportRoutes: failed to read previousplantData", err)
		return res.status(500).json({ error: "Failed to read plant data" })
	}
})

module.exports = router
