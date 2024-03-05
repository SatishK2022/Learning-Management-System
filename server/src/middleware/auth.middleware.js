import ApiError from "../utils/apiError.js";
import JWT from 'jsonwebtoken';

const isLoggedIn = (req, res, next) => {
    const {token} = req.cookies;

    if(!token) {
        return next(new ApiError(401, "Unauthenticated!! Please Login"))
    }

    const tokenDetails = JWT.verify(token, process.env.JWT_SECRET);

    if (!tokenDetails) {
        return next(new ApiError(401, "Unauthenticated!! Please Login"))
    }

    req.user = tokenDetails;
    next();
}

export {
    isLoggedIn
};