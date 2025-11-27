import { ApiError } from '../utils/ApiError.js';
import { appLogger } from '../config/logger.js';

const errorMiddleware = (err, req, res, next) => {
  if (err instanceof ApiError) {
    appLogger.error(`API Error: ${err.statusCode} - ${err.message}`);
    return res.status(err.statusCode).json({
      success: err.success,
      message: err.message,
      errors: err.errors,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    });
  } else {
    appLogger.error(`Unhandled Error: ${err.message}`, err);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    });
  }
};

export { errorMiddleware };
