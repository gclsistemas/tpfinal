import { configureStore } from '@reduxjs/toolkit'
import userSlice from './slices/user-slice'
import productSlice from './slices/product-slice'

export const store = configureStore({
  reducer: {
    user: userSlice,
    products: productSlice
  },
})