import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userLogged: null,
  favorites: null
}

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserLogged: (state, action) => {
      state.userLogged = action.payload
      localStorage.setItem("userLogged", state.userLogged)
      state.favorites = []
    },
    clearUserLogged: (state) => {
      state.favorites = null
      state.userLogged = null
      localStorage.removeItem("accessToken")
      localStorage.removeItem("userLogged")
    },
    setFavorite: (state, action) => {
      state.favorites = [...state.favorites, action.payload]
    },
    isFavorite: (state, action) => {
      return state.favorites && state.favorites.find((item) => action.payload === item.id) ? true : false
    },
    removeFavorite: (state, action) => {
      state.favorites.filter((item) => action.payload !== item.id)
    },
  },
})

// Action creators are generated for each case reducer function
export const { setUserLogged, clearUserLogged, setFavorite, isFavorite, removeFavorite } = UserSlice.actions

export default UserSlice.reducer