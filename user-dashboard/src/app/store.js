import {configureStore } from '@reduxjs/toolkit'
import sellerProductReducer from "../features/sellerFetchProductSlice"
import productReducer from "../features/productSlice"
import adminDataReducer from '../features/adminDataSlice'
import trackOrderReducer from "../features/trackCustomerOrder"

export default configureStore({
 reducer:{
    product:productReducer,
    sellerProduct:sellerProductReducer,
    adminData :adminDataReducer,
    trackOrders:trackOrderReducer
 },  
})