import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { Song, Stat } from '../../types.ts'

// Define a type for the slice state
interface SongState {
  songs: Song[]
  stats: Stat | undefined
}

// Define the initial state using that type
const initialState: SongState = {
  songs: [],
  stats: undefined,
}

export const songSlice = createSlice({
  name: 'song',
  initialState,
  reducers: {
    addSongs: (state, action: PayloadAction<Song[]>) => {
      state.songs = action.payload
    },
    setStats: (state, action: PayloadAction<Stat>) => {
      state.stats = action.payload
    },
  },
})

export const { addSongs, setStats } = songSlice.actions

export const selectSong = (state: RootState) => state.song.songs
export const selectStats = (state: RootState) => state.song.stats

export default songSlice.reducer
