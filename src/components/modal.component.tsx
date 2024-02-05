import { FieldValues, useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { useAppDispatch, useAppSelector } from '../utils/redux/hooks.ts'
import { clearSongToEdit, close } from '../utils/redux/slices/songs.slice.ts'
import { Box, Button } from 'rebass'

const API_URL = import.meta.env.VITE_API_URL

export const Modal = () => {
  const dispatch = useAppDispatch()
  const songToEdit = useAppSelector((state) => state.modal.songToEdit)
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
      }).then(() => {
        dispatch(() => close())
      })
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
    if (songToEdit) {
      updateMutation.mutate(values)
    } else {
      createMutation.mutate(values)
    }
  }
  const handleCancelButtonClick = () => {
    dispatch(close())
    dispatch(clearSongToEdit())
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        padding: '2rem 3rem',
        backgroundColor: '#494953',
        borderRadius: '0.5rem',
        minWidth: '25%',
      }}
    >
      {songToEdit?._id && <input defaultValue={songToEdit?._id} hidden={true} {...register('_id', { required: true })} />}
      <input
        style={{ backgroundColor: '#EEEEFF', height: '2.5rem', padding: '0 0 0 0.4rem', borderRadius: '0.2rem' }}
        defaultValue={songToEdit?.title}
        placeholder="Song Title"
        {...register('title', { required: true })}
      />
      {errors.title && <p style={{ color: 'red' }}>This field is required</p>}

      <input
        style={{ backgroundColor: '#EEEEFF', height: '2.5rem', padding: '0 0 0 0.4rem', borderRadius: '0.2rem' }}
        defaultValue={songToEdit?.artist}
        placeholder="Song Artist"
        {...register('artist', { required: true })}
      />
      {errors.artist && <p style={{ color: 'red' }}>This field is required</p>}

      <input
        style={{ backgroundColor: '#EEEEFF', height: '2.5rem', padding: '0 0 0 0.4rem', borderRadius: '0.2rem' }}
        defaultValue={songToEdit?.album}
        placeholder="Song Album"
        {...register('album', { required: true })}
      />
      {errors.album && <p style={{ color: 'red' }}>This field is required</p>}

      <input
        style={{ backgroundColor: '#EEEEFF', height: '2.5rem', padding: '0 0 0 0.4rem', borderRadius: '0.2rem' }}
        defaultValue={songToEdit?.genre}
        placeholder="Song Genre"
        {...register('genre', { required: true })}
      />
      {errors.genre && <p style={{ color: 'red' }}>This field is required</p>}

      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Button
          style={{ cursor: 'pointer' }}
          color="#FFFFEE"
          backgroundColor="#8888FF"
          type="button"
          onClick={handleCancelButtonClick}
        >
          Cancel
        </Button>
        <Button style={{ cursor: 'pointer' }} color="#FFFFEE" backgroundColor="#3D88F7" type="submit">
          Submit
        </Button>
      </Box>
    </form>
  )
}
