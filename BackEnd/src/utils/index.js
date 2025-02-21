import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from '../routes/authRoutes.js';
import connectDB from '../db/index.js';
import cors from 'cors'
import calculationRoutes from '../routes/calculationRoutes.js' 
import finalDataRoutes from '../routes/finalDataRoutes.js';
import memberRoutes from '../routes/memberRoutes.js'
import {postAllData} from '../api/endData.js'
import dotenv from 'dotenv';
const app = express();
const PORT = process.env.PORT || 4000;

dotenv.config();  // Load environment variables from .env file
// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin: ['http://localhost:5173', 'https://flowmen-common.vercel.app'], // Allow frontend origin
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization'
}));
// Connect to MongoDB
connectDB();

// Routes
app.use('/auth', authRoutes);
app.use('/calculation',calculationRoutes)
app.use('/data', finalDataRoutes)
app.use('/member', memberRoutes)
// app.use(postAllData)

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
