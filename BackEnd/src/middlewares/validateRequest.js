import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

// A generic middleware for validating request bodies against a Joi schema
const validateRequest = (schema) => asyncHandler(async (req, res, next) => {
  try {
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    throw new ApiError(400, error.details[0].message || 'Validation Error');
  }
});

export { validateRequest };
