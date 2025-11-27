const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models/User.model.js'); // Adjust the path as needed
const { Member } = require('../models/members.model.js'); // Adjust the path as needed
const asyncHandler = require('../utils/asyncHandler.js'); // Ensure correct import
const ApiError = require('../utils/ApiError.js');
const ApiResponse = require('../utils/ApiResponse.js'); // Remove destructuring


// Generate Access and Refresh Tokens
const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId);
        if (!user) throw new ApiError(404, "User not found");

        const accessToken = user.generateAccessToken();
        if (!accessToken) throw new ApiError(500, "Failed to generate access token");

        const refreshToken = user.generateRefreshToken();
        if (!refreshToken) throw new ApiError(500, "Failed to generate refresh token");

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        console.error("Error in generateAccessAndRefreshTokens:", error);
        throw new ApiError(500, "Something went wrong while generating tokens");
    }
};

// Register Controller
const register = asyncHandler(async (req, res) => {
    const { firstname, lastname, username, email, password, role, teamMembers, adminId, companyName } = req.body;

    if ([firstname, lastname, username, email, password, role].some((field) => !field || field.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) throw new ApiError(409, "User with email or username already exists");

    const hashedPassword = password;
    const user = new User({
        firstname,
        lastname,
        username,
        email: email.toLowerCase(),
        password: hashedPassword,
        role,
        companyName
    });

    await user.save();
    const createdUser = await User.findById(user._id).select("-password -refreshToken");
    if (!createdUser) throw new ApiError(500, "Something went wrong while registering the user");

    if (role === 'Manager') {
        const managerMember = new Member({
            name: `${firstname} ${lastname}`,
            email,
            role,
            workingUnder: adminId
        });
        await managerMember.save();
    }

    if (role === 'Manager' || role === 'Supervisor') {
        if (!Array.isArray(teamMembers) || teamMembers.length === 0) {
            return res.status(201).json(new ApiResponse(201, createdUser, "User registered successfully"));
        }

        const teamMemberIds = await Promise.all(
            teamMembers.map(async (member) => {
                const memberDoc = new Member({
                    name: member.name,
                    email: member.email,
                    role: member.role,
                    workingUnder: user._id
                });
                await memberDoc.save();
                return memberDoc._id;
            })
        );

        user.teamMembers = teamMemberIds;
        await user.save();
    }

    return res.status(201).json(new ApiResponse(201, createdUser, "User registered successfully"));
});

// Login Controller
const login = asyncHandler(async (req, res) => {
    const { username, password, email } = req.body;
    
    if (!(username || email)) {
        throw new ApiError(400, 'Email or username is required');
    }
    const user = await User.findOne({ $or: [{ username }, { email }] });
    if (!user) throw new ApiError(404, "No such user exists");

    const passwordMatch = await user.isPasswordCorrect(password);
    if (!passwordMatch) throw new ApiError(401, "Invalid password");

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    const options = { httpOnly: true, secure: false };

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(new ApiResponse(200, { user: loggedInUser, accessToken, refreshToken }, "User logged in successfully"));
});

// Logout Controller
const logout = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(req.user._id, { $unset: { refreshToken: 1 } }, { new: true });

    const options = { httpOnly: true, secure: false };
    return res.status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User logged out successfully"));
});

// Refresh Token Controller
const refreshToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

    if (!incomingRefreshToken) throw new ApiError(401, "Unauthorized request");

    try {
        const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
        const user = await User.findById(decodedToken?._id);

        if (!user || incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh Token is expired or invalid");
        }

        const options = { httpOnly: true, secure: true };
        const { accessToken, refreshToken: newRefreshToken } = await generateAccessAndRefreshTokens(user._id);

        return res.status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", newRefreshToken, options)
            .json(new ApiResponse(200, { accessToken, refreshToken: newRefreshToken }, "Access Token Refreshed"));
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh Token");
    }
});

module.exports = { register, login, logout, refreshToken };
