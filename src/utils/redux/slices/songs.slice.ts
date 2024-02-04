import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../store'

// Define a type for the slice state
interface ModalState {
  isOpen: boolean
}

// Define the initial state using that type
const initialState: ModalState = {
  isOpen: false,
}

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    open: (state) => {
      state.isOpen = true
    },
    close: (state) => {
      state.isOpen = false
    },
  },
})

export const { open, close } = modalSlice.actions

export const selectModal = (state: RootState) => state.modal.isOpen

export default modalSlice.reducer
