import { Song, Stat } from './types.ts'
import { FieldValues } from 'react-hook-form'

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

export const createSong = async (values: FieldValues) => {
  console.log({values})
  try {
    await fetch(`${API_URL}/create`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify(values),
    })
  } catch (e) {
    return console.error(e)
  }
}

export const updateSong = async (values: FieldValues) => {
  try {
    await fetch(`${API_URL}/update/${values._id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify(values),
    })
  } catch (e) {
    return console.error(e)
  }
}
