export type Song = {
  _id: string
  title: string
  artist: string
  album: string
  genre: string
}

export type Stat = {
  totalSongs: number
  totalArtists: number
  totalAlbums: number
  totalGenres: number
  songsInEveryGenre: SongsInGenre[]
  songsAndAlbumsOfEveryArtist: SongsAndAlbumsOfArtist[]
  numberOfSongsInEachAlbum: SongsInEachAlbum[]
}

type SongsInEachAlbum = {
  _id: string
  songs: number
}

type SongsAndAlbumsOfArtist = {
  _id: string
  songs: number
  albums: number
}

type SongsInGenre = {
  _id: string
  songs: number
}
