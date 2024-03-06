import express from "express";
import { getAllCourses } from "../controllers/course.controller.js";
import { isLoggedIn } from "../middleware/auth.middleware.js";
const courseRouter = express.Router();

courseRouter
    .route("/")
    .get(getAllCourses);

courseRouter
    .route("/:courseId")
    .get(isLoggedIn ,getLecturesByCourseId);
export default courseRouter;