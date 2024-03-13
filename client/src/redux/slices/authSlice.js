import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast"
import axiosInstance from "../../config/axiosInstance.js"

const initialState = {
    isLoggedIn: localStorage.getItem('isLoggedIn') || false,
    role: localStorage.getItem('role') || 'USER',
    data: localStorage.getItem('data') || {},
}

export const createAccount = createAsyncThunk('auth/signup', async (data) => {
    try {
        const response = axiosInstance.post("/user/register", data)
        toast.promise(response, {
            loading: 'Creating account...',
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to create your account"
        })

        return await response;
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})

export const login = createAsyncThunk('auth/login', async (data) => {
    try {
        const response = axiosInstance.post("/user/login", data)
        toast.promise(response, {
            loading: 'Authenticating account...',
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to authenticate your account"
        })

        return await response;
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            localStorage.setItem("user", JSON.stringify(action?.payload?.data?.data));
            localStorage.setItem("isLoggedIn", true);
            localStorage.setItem("role", action?.payload?.data?.data?.role);
            state.isLoggedIn = true;
            state.role = action?.payload?.data?.data?.role;
            state.data = action?.payload?.data?.data;
        })
    }
})

export default authSlice.reducer;