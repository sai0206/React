import { configureStore } from '@reduxjs/toolkit'
import { api } from '../services/jsonPlaceholderApi'
import uiReducer from '../features/ui/uiSlice'

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
})

export default store

