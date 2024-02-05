import { configureStore } from '@reduxjs/toolkit'
import { modalSlice } from './slices/modal.slice.ts'
import createSagaMiddleware from 'redux-saga'
import rootSongSaga from './sagas/song.saga.ts'
import { songSlice } from './slices/song.slice.ts'

const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
  reducer: {
    modal: modalSlice.reducer,
    song: songSlice.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware)
})

sagaMiddleware.run(rootSongSaga)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
