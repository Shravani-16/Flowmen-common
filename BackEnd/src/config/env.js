import dotenv from 'dotenv';

dotenv.config({
  path: './.env'
});

export const env = {
  PORT: process.env.PORT || 8000,
  MONGODB_URI: process.env.MONGODB_URI,
  CORS_ORIGIN: process.env.CORS_ORIGIN,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRY: process.env.ACCESS_TOKEN_EXPIRY || '7d',
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRY: process.env.REFRESH_TOKEN_EXPIRY || '30d',
  // Generic JWT key if some legacy code expects it; falls back to ACCESS_TOKEN_SECRET
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || process.env.ACCESS_TOKEN_SECRET,
  // Golain integration
  GOLAIN_API_KEY: process.env.GOLAIN_API_KEY,
  GOLAIN_ORG_ID: process.env.GOLAIN_ORG_ID,
  GOLAIN_API_BASE_URL: process.env.GOLAIN_API_BASE_URL,
};
