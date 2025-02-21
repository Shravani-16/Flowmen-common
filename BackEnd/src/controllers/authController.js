import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.model.js'; // Adjust the path as needed
import { Member } from '../models/members.model.js'; // Adjust the path as needed
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';

// Generate Access and Refresh Tokens
const generateAccessAndRefreshTokens = async (userId) => {
    try {
        // Find the user by ID
        const user = await User.findById(userId);

        // Check if the user exists
        if (!user) {
            throw new ApiError(404, "User not found");
        }

        // Generate access token
        const accessToken = user.generateAccessToken();
        if (!accessToken) {
            throw new ApiError(500, "Failed to generate access token");
        }

        // Generate refresh token
        const refreshToken = user.generateRefreshToken();
        if (!refreshToken) {
            throw new ApiError(500, "Failed to generate refresh token");
        }

        // Save the refresh token to the user
        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        // Return the tokens
        return { accessToken, refreshToken };
    } catch (error) {
        console.error("Error in generateAccessAndRefreshTokens:", error);
        throw new ApiError(500, "Something went wrong while generating refresh and access token");
    }
};

// Register Controller
const register = asyncHandler(async (req, res) => { 
    const { firstname, lastname, username, email, password, role, teamMembers, adminId, companyName } = req.body;

    try {
        // Check for missing fields
        if ([firstname, lastname, username, email, password, role].some((field) => !field || field.trim() === "")) {
            throw new ApiError(400, "All fields are required");
        }

        // Check for existing user by username or email
        const existingUser = await User.findOne({
            $or: [{ username }, { email }]
        });

        if (existingUser) {
            throw new ApiError(409, "User with email or username already exists");
        }

        // Hash the password
        const hashedPassword = password     

        // Create the new user
        const user = new User({
            firstname,
            lastname,
            username,
            email: email.toLowerCase(),
            password: hashedPassword,
            role,
            companyName
        });

        // Save the new user
        await user.save();

        // Fetch the created user without password and refreshToken
        const createdUser = await User.findById(user._id).select("-password -refreshToken");

        if (!createdUser) {
            throw new ApiError(500, "Something went wrong while registering the user");
        }

        // Handle roles and team members
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
                return res.status(201).json(
                    new ApiResponse(201, createdUser, "User registered successfully"))
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
        return res.status(201).json(
            new ApiResponse(201, createdUser, "User registered successfully")
        );
    } catch (error) {
        console.error(error);
        res.status(error.statusCode || 500).json({ message: error.message || 'Server error' });
    }
});

// Login Controller
const login = asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    const email = (req.body.email);

    try {
        if (!(username || email)) {
            throw new ApiError(400, 'Email or username is required');
        }

        const user = await User.findOne({
            $or: [{ username }, { email }]
        });

        if (!user) {
            throw new ApiError(404, "No such user exists");
        }
        
        
        const passwordMatch = await user.isPasswordCorrect(password);
    
        if (!passwordMatch) {
            
            throw new ApiError(401, `Invalid password `);
        }

        const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);

        const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

        const option = {
            httpOnly: true,
            secure: true
        };

        return res
            .status(200)
            .cookie("accessToken", accessToken, option)
            .cookie("refreshToken", refreshToken, option)
            .json(
                new ApiResponse(
                    200,
                    { user: loggedInUser, accessToken, refreshToken },
                    "User logged in successfully"
                )
            );
    } catch (error) {
        console.error(error);
        res.status(error.statusCode || 500).json({ message: error.message || 'Server error' });
    }
});

const logout = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset:{
                refreshToken:1
            }
        },
        {
            new:true
        }

    )
    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
    .json(new ApiResponse(200,{},"User logged out"))
})

const refreshToken = asyncHandler(async(req, res)=>{
    const incomingRefreshToken  = req.cookies.refreshToken || req.body.refreshToken;

    if(!incomingRefreshToken){
        throw ApiError(401,"unauthorized request");
    }
    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )

        const user = await User.findById(decodedToken?._id)

        if(!user){
            throw ApiError
        }

        if(incomingRefreshToken !== user?.refreshToken){
            throw ApiError(401, "Refreash Token is expired or used");
        }

        const options = {
            httpOnly:true,
            secure :true
        }

        const {accessToken, newrefreshToken} = await generateAccessAndRefreshTokens(user._id)

        return res 
        .status(200)
        .cookie("accessToken",accessToken, options)
        .cookie("refreshToken", newrefreshToken, options)
        .json(
            new ApiResponse(
                200,
                {accessToken, refreshToken:newrefreshToken},
                "Access Token Refreshed"
            )
        )
    } catch (error) {
        throw new ApiError(401,error?.message || "Invalid refresh Token");
    }

})

export { register, login,logout,refreshToken };
