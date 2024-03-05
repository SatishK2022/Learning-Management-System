import { User } from "../models/user.model.js"
import ApiError from "../utils/apiError.js"

const cookieOptions = {
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: true,
}

async function register(req, res, next) {
    const { fullName, email, password } = req.body;

    try {
        if (!fullName || !email || !password) {
            return next(new ApiError(400, "All Fields are required"))
        }

        const userExists = await User.findOne({ email });

        if (userExists) {
            return next(new ApiError(400, "Email already exists"))
        }

        const user = await User.create({
            fullName,
            email,
            password,
            avatar: {
                public_id: email,
                secure_url: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            }
        });

        if (!user) {
            return next(new ApiError(400, "User registration failed, Please try again!"))
        }

        // TODO: Upload avatar image

        await user.save();

        // set jwt token in cookie
        const token = user.generateJWTToken();

        user.password = undefined;
        res.cookie("token", token, cookieOptions)

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: user,
        })
    } catch (error) {
        return next(new ApiError(500, error.message))
    }
}

async function login(req, res) {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return next(new ApiError(400, "All Fields are required"));
        }

        const user = await User.findOne({ email }).select("+password");

        if (!user || !user.comparePassword(password)) {
            return next(new ApiError(400, "Invalid credentials"));
        }

        const token = user.generateJWTToken();

        user.password = undefined;
        res.cookie("token", token, cookieOptions)

        return res.status(200).json({
            success: true,
            message: "User logged in successfully",
            data: user,
        })
    } catch (error) {
        return next(new ApiError(500, error.message))
    }
}

function logout(req, res) {
    try {
        res.cookie("token", null, {
            maxAge: 0,
            httpOnly: true,
            secure: true
        })
    
        return res.status(200).json({
            success: true,
            message: "User logged out successfully"
        })
    } catch (error) {
        return next(new ApiError(500, error.message))
    }
}

async function getProfile(req, res) {
    const {id} = req.user;

    try {
        const user = await User.findById(id);

        return res.status(200).json({
            success: true,
            message: "User profile fetched successfully",
            data: user
        })
    } catch (error) {
        return next(new ApiError(500, error.message))
    }
}

export {
    register,
    login,
    logout,
    getProfile
}