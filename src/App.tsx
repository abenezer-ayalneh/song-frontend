import { useMutation, useQueries } from '@tanstack/react-query'
import { Song, Stat } from './utils/types.ts'
import { useEffect } from 'react'
import { Modal } from './components/modal.component.tsx'
import { useAppDispatch, useAppSelector } from './utils/redux/hooks.ts'
import { open, setSongToEdit } from './utils/redux/slices/songs.slice.ts'
import { Box, Button, Text } from 'rebass'

const API_URL = import.meta.env.VITE_API_URL

function App() {
  const isModalOpen = useAppSelector((state) => state.modal.isOpen)
  const songToEdit = useAppSelector((state) => state.modal.songToEdit)
  const dispatch = useAppDispatch()
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
    dispatch(setSongToEdit(song))
  }

  useEffect(() => {
    // setShowModal(Boolean(songToEdit))
    if (songToEdit) {
      dispatch(open())
    }
  }, [songToEdit])

  return (
    <Box width="100vw" height="100vh" display="flex" padding="2rem" style={{position: 'relative'}}>
      <Box width="70%" display="flex" flexDirection="column" padding='0 2rem'>
        <Box display="flex" justifyContent="space-between" alignItems='center'>
          <Text fontSize='3rem' fontWeight='bold'>Song List</Text>
          <Button style={{cursor: 'pointer'}} color='#FFFFEE' backgroundColor='#3D88F7' height='3rem' onClick={() => dispatch(open())}>Create</Button>
        </Box>
        <table style={{ borderCollapse: 'separate', borderSpacing: '0 10px' }}>
          <thead style={{backgroundColor: '#F9FAFB', height: '3rem'}}>
            <tr>
              <th style={{ fontSize: '1rem', fontWeight: 'normal', color: 'black' }}>Song</th>
              <th style={{ fontSize: '1rem', fontWeight: 'normal', color: 'black' }}>Artist</th>
              <th style={{ fontSize: '1rem', fontWeight: 'normal', color: 'black' }}>Album</th>
              <th style={{ fontSize: '1rem', fontWeight: 'normal', color: 'black' }}>Genre</th>
              <th style={{ fontSize: '1rem', fontWeight: 'normal', color: 'black' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {queries[0].data?.map((row: Song) => (
              <tr key={row._id}>
                <td align="center">{row.title}</td>
                <td align="center">{row.artist}</td>
                <td align="center">{row.album}</td>
                <td align="center">{row.genre}</td>
                <td style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem' }}>
                  <Button
                    style={{ cursor: 'pointer' }}
                    color="#FFFFEE"
                    backgroundColor="#3D88F7"
                    onClick={() => handleEditSong(row)}
                  >
                    Edit
                  </Button>
                  <Button
                    style={{ cursor: 'pointer' }}
                    color="#FFFFEE"
                    backgroundColor="#3D88F7"
                    onClick={() => handleDeleteSong.mutate(row._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Box>
      <Box width="30%" backgroundColor="#494953" padding="1rem 2rem" style={{ borderRadius: '1rem' }}>
        <Text fontSize="3rem" fontWeight="bold">
          Stats
        </Text>
        {queries[1].data && (
          <Box display="flex" flexDirection="column">
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
            <br />
            <table>
              <thead>
                <tr>
                  <th align="left">Album</th>
                  <th align="left">Number of Songs</th>
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
            <br/>
            <table>
              <thead>
                <tr>
                  <th align='left'>Artist</th>
                  <th align='left'>Number of Songs</th>
                  <th align='left'>Number of Albums</th>
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
            <br/>
            <table>
              <thead>
                <tr>
                  <th align='left'>Genre</th>
                  <th align='left'>Number of Songs</th>
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
          </Box>
        )}
      </Box>
      {isModalOpen && (
        <Box
          width="100%"
          height="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
          backgroundColor="#00000070"
          style={{
            position: 'fixed',
            zIndex: '2',
          }}
        >
          <Modal />
        </Box>
      )}
    </Box>
  )
}

export default App
