import asyncHandler from "../middleware/async.js";
import { response } from "../utils/response.js";
import User from "../models/userModel.js";


const registerUser = asyncHandler(async (req, res) => {
    try {
        const { userName, email, password, role } = req.body;

        const userExist = await User.findOne({ email: email });

        if(userExist) {
            return response(
                res, 400,
                `Already exist`,
                `A user with this email already exist`,
            );
        }

        const user = await User.create({
            userName,
            email,
            password,
            role
        });
        return response(res, 201, `Registration successful`, user)

    } catch (error) {
        return response(res, 500, `Internal server error`, error)
    }
});

const loginUser = asyncHandler(async(req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select('+password');

        if(!user) {
            return response(res, 404, 'Invalid credentials', `User not found`);
        }

        const isMatch = user.matchPassword(password);

        if(!isMatch) {
            return response(res, 400, `Invalid credentials`, `Login credentials are not valid`);
        }

        return sendTokenResponse(user, 200, res);

    } catch (error){
        return response(res, 500, `Internal server error`, error);
    }
});

const sendTokenResponse = (user, statusCode, res) => {
    const token = user.getSignedJwtToken();

    const options = {
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000 * 30),
        httpOnly: true,
    };

    return res
        .status(statusCode)
        .cookie('token', token, options)
        .json({ success: true, token, user });
};

export { registerUser, loginUser };
