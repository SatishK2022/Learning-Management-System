import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast"
import axiosInstance from "../../config/axiosInstance.js"

const initialState = {
    courseList: []
}

export const getAllCourses = createAsyncThunk('course/getAllCourses', async (data) => {

    const response = axiosInstance.get("courses", data)
    toast.promise(response, {
        loading: 'Fetching All Courses',
        success: (data) => {
            return data?.data?.message;
        },
        error: "Failed to Load Courses"
    })

    return (await response).data.courses;

})

const courseSlice = createSlice({
    name: 'course',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllCourses.fulfilled, (state, action) => {
            console.log(action.payload)
            if (action?.payload) {
                state.courseList = [...action.payload]
            }
        })
    }
})

export default courseSlice.reducer;