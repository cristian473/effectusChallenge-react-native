import { configureStore } from '@reduxjs/toolkit'
import movies from './reducers'

export const store = configureStore({
  reducer: {
    movies
  }
})