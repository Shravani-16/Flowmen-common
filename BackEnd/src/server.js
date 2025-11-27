import dotenv from 'dotenv';
import { app } from './app.js';
import connectDB from './config/db.js';
import { appLogger } from './config/logger.js';
import { env } from './config/env.js';

dotenv.config({
  path: './.env'
});

const PORT = env.PORT;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      appLogger.info(`⚙️ Server is running on port: ${PORT}`);
    });
  })
  .catch((err) => {
    appLogger.error("MONGO db connection FAILED !!!", err);
  });
