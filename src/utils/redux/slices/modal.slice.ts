import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { Song } from '../../types.ts'

// Define a type for the slice state
interface ModalState {
  isOpen: boolean
  songToEdit: Song | undefined
}

// Define the initial state using that type
const initialState: ModalState = {
  isOpen: false,
  songToEdit: undefined,
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
    setSongToEdit: (state, action: PayloadAction<Song>) => {
      state.songToEdit = action.payload
    },
    clearSongToEdit: (state) => {
      state.songToEdit = undefined
    },
  },
})

export const { open, close, setSongToEdit, clearSongToEdit } = modalSlice.actions

export const selectModal = (state: RootState) => state.modal.isOpen

export default modalSlice.reducer
