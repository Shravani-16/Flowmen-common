const jwt = require('jsonwebtoken');
const { ApiError } = require('../utils/ApiError.js');
const asyncHandler = require('../utils/asyncHandler.js'); // ✅ FIXED
const { User } = require('../models/User.model.js');

const verifyJWT = asyncHandler(async (req, _, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            throw new ApiError(401, "Unauthorized request");
        }

        let decodedToken;
        try {
            decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        } catch (error) {
            throw new ApiError(401, "Invalid or expired access token");
        }

        const user = await User.findById(decodedToken?.id || decodedToken?._id).select("-password -refreshToken");

        if (!user) {
            throw new ApiError(401, "User not found or token invalid");
        }

        req.user = user;
        next();
    } catch (error) {
        throw new ApiError(401, error?.message || "Unauthorized access");
    }
});

module.exports = { verifyJWT };
