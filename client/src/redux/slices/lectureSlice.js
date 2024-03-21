import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../config/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
    lectures: []
}

export const getCourseLectures = createAsyncThunk("/course/lecture/get", async (cId) => {
    try {
        const response = axiosInstance.get(`/courses/${cId}`);
        toast.promise(response, {
            loading: "Fetching Course Lectures",
            success: "Course Lectures Fetched",
            error: "Error Fetching Course Lectures"
        })

        return (await response).data;
    } catch (error) {
        console.log("Error Getting Course Lectures", error);
        toast.error(error?.response?.data?.message)
    }
})

export const addCourseLectures = createAsyncThunk("/course/lecture/add", async (data) => {
    try {
        const formData = new FormData();
        formData.append("lecture", data.lecture);
        formData.append("title", data.title);
        formData.append("description", data.description);


        const response = axiosInstance.post(`/courses/${data.id}`, formData);
        toast.promise(response, {
            loading: "Adding Course Lectures",
            success: "Added Lectures Fetched",
            error: "Error Adding Course Lectures"
        })

        return (await response).data;
    } catch (error) {
        console.log("Error Adding Course Lecture", error);
        toast.error(error?.response?.data?.message)
    }
})

export const deleteCourseLectures = createAsyncThunk("/course/lecture/delete", async (cId) => {
    try {
        const response = axiosInstance.delete(`/courses?courseId=${data.courseId}&lectureId=${data.lectureId}`);
        toast.promise(response, {
            loading: "Deleting Course Lectures",
            success: "Lectures Deleted Successfully",
            error: "Error Deleting Lectures"
        })

        return (await response).data;
    } catch (error) {
        console.log("Error Deleting Course Lecture", error);
        toast.error(error?.response?.data?.message)
    }
})

const lectureSlice = createSlice({
    name: "lecture",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getCourseLectures.fulfilled, (state, action) => {
                state.lectures = action?.payload?.lectures;
            })
            .addCase(addCourseLectures.fulfilled, (state, action) => {
                state.lectures = action?.payload?.course?.lectures;
            })
            .addCase(deleteCourseLectures.fulfilled, (state, action) => {
                state.lectures = action?.payload?.course?.lectures;
            })
    }
})

export default lectureSlice.reducer;