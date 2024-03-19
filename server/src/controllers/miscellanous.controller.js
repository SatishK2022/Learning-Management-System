import ApiError from "../utils/apiError.js";
import sendEmail from "../utils/sendEmail.js"

async function contactUs() {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return next(new ApiError(400, "All Fields are required"))
    }

    try {
        const subject = "Contact Us Form";
        const message = `${name} - ${email} <br />${message}`;

        await sendEmail(process.env.CONTACT_US_EMAIL, subject, message)
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, error.message))
    }
}

export {
    contactUs
}