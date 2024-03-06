import { Course } from "../models/course.model.js";
import ApiError from "../utils/apiError.js"

async function getAllCourses(req, res, next) {
    try {
        const courses = await Course.find({}).select('-lectures');

        return res.status(200).json({
            success: true,
            message: "All courses",
            courses
        })
    } catch (error) {
        return next(new ApiError(500, error.message))
    }
}

async function getLecturesByCourseId(req, res, next) {
    try {
        const {courseId} = req.params;
        const course = await Course.findById(courseId);

        if (!course) {
            return next(new ApiError(404, "Course not found"));
        }

        return res.status(200).json({
            success: true,
            message: "Course Lectures fetched Successfully",
            lectures: course.lectures
        })
    } catch (error) {
        return next(new ApiError(500, error.message))
    }
}

export {
    getAllCourses,
    getLecturesByCourseId,
}