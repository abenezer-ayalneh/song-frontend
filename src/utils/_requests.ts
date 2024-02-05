import { Song, Stat } from './types.ts'

const API_URL = import.meta.env.VITE_API_URL

export const fetchSongList = async () => {
  try {
    const res = await fetch(`${API_URL}/list`)
    return (await res.json()) as Promise<Song[]>
  } catch (e) {
    return console.error(e)
  }
}

export const fetchStat = async () => {
  try {
    const res = await fetch(`${API_URL}/stat`)
    return (await res.json()) as Promise<Stat[]>
  } catch (e) {
    return console.error(e)
  }
}
