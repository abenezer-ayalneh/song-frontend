import { useMutation, useQueries } from '@tanstack/react-query'
import { Song, Stat } from './utils/types.ts'
import { useEffect, useState } from 'react'
import { Modal } from './components/modal.component.tsx'
import { useAppDispatch, useAppSelector } from './utils/redux/hooks.ts'
import { open } from './utils/redux/slices/songs.slice.ts'

const API_URL = import.meta.env.VITE_API_URL

function App() {
  const isModalOpen = useAppSelector((state) => state.modal.isOpen)
  const dispatch = useAppDispatch()
  // const [showModal, setShowModal] = useState<boolean>(false)
  const [songToEdit, setSongToEdit] = useState<Song | undefined>()
  const queries = useQueries({
    queries: [
      {
        queryKey: ['fetchSongs'],
        queryFn: () => fetch(`${API_URL}/list`).then((res) => res.json() as Promise<Song[]>),
      },
      {
        queryKey: ['fetchStats'],
        queryFn: () => fetch(`${API_URL}/stat`).then((res) => res.json() as Promise<Stat>),
      },
    ],
  })
  const handleDeleteSong = useMutation({
    mutationFn: async (id: string) => {
      await fetch(`${API_URL}/delete/${id}`, { method: 'DELETE' }).then((res) => res.json() as Promise<Stat>)
    },
  })

  const handleEditSong = (song: Song) => {
    setSongToEdit(song)
  }

  useEffect(() => {
    // setShowModal(Boolean(songToEdit))
    if (songToEdit) {
      dispatch(open())
    }
  }, [songToEdit])

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', position: 'relative' }}>
      <div style={{ width: '70%', backgroundColor: 'blue', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h1>Song List</h1>
          <button onClick={() => dispatch(open())}>Create</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Song</th>
              <th>Artist</th>
              <th>Album</th>
              <th>Genre</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {queries[0].data?.map((row: Song) => (
              <tr key={row._id}>
                <td>{row.title}</td>
                <td>{row.artist}</td>
                <td>{row.album}</td>
                <td>{row.genre}</td>
                <td>
                  <button onClick={() => handleEditSong(row)}>Edit</button>
                  <button onClick={() => handleDeleteSong.mutate(row._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ width: '30%', backgroundColor: 'black' }}>
        <h1>Stats</h1>
        {queries[1].data && (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <table>
              <tbody>
                <tr>
                  <td>Total Songs</td>
                  <td>{queries[1].data.totalSongs}</td>
                </tr>
                <tr>
                  <td>Total Artist</td>
                  <td>{queries[1].data.totalArtists}</td>
                </tr>
                <tr>
                  <td>Total Albums</td>
                  <td>{queries[1].data.totalAlbums}</td>
                </tr>
                <tr>
                  <td>Total Genres</td>
                  <td>{queries[1].data.totalGenres}</td>
                </tr>
              </tbody>
            </table>
            <table>
              <thead>
                <tr>
                  <th>Album</th>
                  <th>Number of Songs</th>
                </tr>
              </thead>
              <tbody>
                {queries[1].data?.numberOfSongsInEachAlbum &&
                  queries[1].data?.numberOfSongsInEachAlbum.map((value, index) => (
                    <tr key={index}>
                      <td>{value._id}</td>
                      <td>{value.songs}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <table>
              <thead>
                <tr>
                  <th>Artist</th>
                  <th>Number of Songs</th>
                  <th>Number of Albums</th>
                </tr>
              </thead>
              <tbody>
                {queries[1].data?.songsAndAlbumsOfEveryArtist &&
                  queries[1].data?.songsAndAlbumsOfEveryArtist.map((value, index) => (
                    <tr key={index}>
                      <td>{value._id}</td>
                      <td>{value.songs}</td>
                      <td>{value.albums}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <table>
              <thead>
                <tr>
                  <th>Genre</th>
                  <th>Number of Songs</th>
                </tr>
              </thead>
              <tbody>
                {queries[1].data?.songsInEveryGenre &&
                  queries[1].data?.songsInEveryGenre.map((value, index) => (
                    <tr key={index}>
                      <td>{value._id}</td>
                      <td>{value.songs}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {isModalOpen && (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            zIndex: '2',
            backgroundColor: '#00000070',
          }}
        >
          <Modal song={songToEdit} />
        </div>
      )}
    </div>
  )
}

export default App
