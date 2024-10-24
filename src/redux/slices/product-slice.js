import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  immutableProducts: [],
  products: [],
};

export const ProductSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload
      state.immutableProducts = action.payload
    },
    addProduct: (state, action) => {
      state.products.push(action.payload)
      state.immutableProducts.push(action.payload)
    },
    removeProduct: (state, action) => {
      const productId =  action.payload // id of product to remove
      state.products  = state.products.filter(product=>product.id !== productId)
      state.immutableProducts  = state.immutableProducts.filter(product=>product.id !== productId)
    },
  },
})

// Action creators are generated for each case reducer function
export const { addProduct,removeProduct,setProducts } = ProductSlice.actions

export default ProductSlice.reducer