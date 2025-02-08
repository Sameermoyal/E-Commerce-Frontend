import {configureStore } from '@reduxjs/toolkit'
import sellerProductReducer from "../features/sellerFetchProductSlice"
import productReducer from "../features/productSlice"

export default configureStore({
 reducer:{
    product:productReducer,
    sellerProduct:sellerProductReducer,
   
 },  
})