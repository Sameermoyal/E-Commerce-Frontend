import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"

export const fetchData=createAsyncThunk('sellerProduct/fetchData',async()=>{
    const api = `${import.meta.env.VITE_API_URL}/seller`;
   
    const token = localStorage.getItem('token');
    const res = await axios.get(`${api}/getSellerProduct`, { headers: { authorization: `Bearer ${token}` } });
    
    console.log("API Response:", res.data);

    return res.data.productList || [];
})
export const sellerProductSlice=createSlice({
    name:"sellerProduct",
    initialState:{
        isLoading: false,
        data: [],
        isError: false,
    },
      extraReducers: (builder) => {
             builder
                 .addCase(fetchData.pending, (state) => {
                     state.isLoading = true;
                    
                 })
                 .addCase(fetchData.fulfilled, (state, action) => {
                     state.isLoading = false;
                     state.data = action.payload;
                     
                 })
                 .addCase(fetchData.rejected, (state, action) => {
                     console.error("Error", action.error.message);
                     state.isError = true;
                     state.isLoading = false;
                 });
         }

})



export default sellerProductSlice.reducer