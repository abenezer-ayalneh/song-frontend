import { Song } from '../utils/types.ts'
import { FieldValues, useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { useAppDispatch } from '../utils/redux/hooks.ts'
import { close } from '../utils/redux/slices/songs.slice.ts'

const API_URL = import.meta.env.VITE_API_URL
type ModalPropsType = {
  song?: Song
}

export const Modal = ({ song }: ModalPropsType) => {
  const dispatch = useAppDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const createMutation = useMutation({
    mutationFn: async (values: FieldValues) => {
      fetch(`${API_URL}/create`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json;charset=UTF-8',
        },
        body: JSON.stringify(values),
      }).then(() => {dispatch(() => close())})
    },
  })
  const updateMutation = useMutation({
    mutationFn: async (values: FieldValues) => {
      await fetch(`${API_URL}/update/${values._id}`, {
        method: 'PATCH',
        headers: {
          'content-type': 'application/json;charset=UTF-8',
        },
        body: JSON.stringify(values),
      })
    },
  })

  const onSubmit = (values: FieldValues) => {
    if (song) {
      updateMutation.mutate(values)
    } else {
      createMutation.mutate(values)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '2rem 3rem', backgroundColor: 'white',  }}
    >
      {song?._id && <input defaultValue={song?._id} hidden={true} {...register('_id', { required: true })} />}
      <input defaultValue={song?.title} placeholder="Song Title" {...register('title', { required: true })} />
      {errors.title && <p style={{ color: 'red' }}>This field is required</p>}

      <input defaultValue={song?.artist} placeholder="Song Artist" {...register('artist', { required: true })} />
      {errors.artist && <p style={{ color: 'red' }}>This field is required</p>}

      <input defaultValue={song?.album} placeholder="Song Album" {...register('album', { required: true })} />
      {errors.album && <p style={{ color: 'red' }}>This field is required</p>}

      <input defaultValue={song?.genre} placeholder="Song Genre" {...register('genre', { required: true })} />
      {errors.genre && <p style={{ color: 'red' }}>This field is required</p>}

      <button type="submit">Submit</button>
      <button type="button" onClick={() => dispatch(close())}>Close</button>
    </form>
  )
}
