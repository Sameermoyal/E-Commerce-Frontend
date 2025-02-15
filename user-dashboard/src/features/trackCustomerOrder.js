import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import axios from 'axios'
import { sellerProductSlice } from "./sellerFetchProductSlice"

export const fetchTrackOrders=createAsyncThunk('trackOrder',async()=>{
    const api=`${import.meta.env.VITE_API_URL}/order`;
    const token=localStorage.getItem('token');

    const res=await axios.get(`${api}/trackCustomerOrder`,{headers:{authorization:`Bearer ${token}`}});
     console.log("res.data.CustomerOrdersList",res.data.CustomerOrdersList)
return res.data.CustomerOrdersList || [];
})


export const trackCustomerOrderSlice=createSlice({
 name:'trackOrders',
 initialState:{
    data:[],
    isLoading:false,
    isError:false
 },
 extraReducers:(builder)=>{
    builder.addCase(fetchTrackOrders.pending,(state)=>{
        state.isLoading=true;
    })
    .addCase(fetchTrackOrders.fulfilled,(state,action)=>{
        state.isLoading=false;
        state.data=action.payload;
    })
    .addCase(fetchTrackOrders.rejected,(state,action)=>{
        console.error("Error to track Order api",action.error.message);
        state.isError=true;
        state.isLoading=false;
    })
 }

})


export default trackCustomerOrderSlice.reducer