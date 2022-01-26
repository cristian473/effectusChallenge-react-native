import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  searchResults: [],
}

export const movies = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setSearchResults: (state, action) => {
      state.searchResults = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setSearchResults } = movies.actions

export default movies.reducer
