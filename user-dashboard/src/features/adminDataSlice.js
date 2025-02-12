import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"

export const fetchAdminData = createAsyncThunk(
    'fetchAdminData',
    async (_, { rejectWithValue }) => {
        try {
            const api = `${import.meta.env.VITE_API_URL}/admin`;
            const token = localStorage.getItem('token');

            if (!token) {
                throw new Error('Unauthorized: Token is missing.');
            }

            const res = await axios.get(`${api}/getData`, {
                headers: { authorization: `Bearer ${token}` },
            });

            console.log("API Response in admin slice:", res.data);
           
            return  res.data.allUserData|| [];
        } catch (error) {
            console.error("Error in fetchAdminData:", error);
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);



export const adminDataSlice=createSlice({
    name:"adminData",
    initialState:{
        isLoading: false,
        data: [],
        isError: false,
    },
      extraReducers: (builder) => {
             builder
                 .addCase(fetchAdminData.pending, (state) => {
                     state.isLoading = true;
                    
                 })
                 .addCase(fetchAdminData.fulfilled, (state, action) => {
                     state.isLoading = false;
                     state.data = action.payload;
                     
                 })
                 .addCase(fetchAdminData.rejected, (state, action) => {
                     console.error("Error", action.error.message);
                     state.isError = true;
                     state.isLoading = false;
                 });
         }

})



export default adminDataSlice.reducer