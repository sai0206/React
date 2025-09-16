import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loadingCount: 0,
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    incrementLoading(state) {
      state.loadingCount += 1
    },
    decrementLoading(state) {
      state.loadingCount = Math.max(0, state.loadingCount - 1)
    },
  },
})

export const { incrementLoading, decrementLoading } = uiSlice.actions
export default uiSlice.reducer

