import { all, call, put, takeEvery } from 'redux-saga/effects'
import { createSong, fetchSongList, fetchStat, updateSong } from '../../_requests.ts'
import { Song, Stat } from '../../types.ts'
import {
  SONG_CREATE_FAILED, SONG_CREATE_REQUESTED,
  SONG_LIST_FETCH_FAILED,
  SONG_LIST_FETCH_REQUESTED,
  SONG_STATS_FETCH_FAILED,
  SONG_STATS_FETCH_REQUESTED, SONG_UPDATE_FAILED, SONG_UPDATE_REQUESTED,
} from '../actions.ts'
import { addSongs, setStats } from '../slices/song.slice.ts'
import { PayloadAction } from '@reduxjs/toolkit'
import { FieldValues } from 'react-hook-form'
import { close } from '../slices/modal.slice.ts'

function* fetchSongListGenerator() {
  try {
    const songs: Song[] = yield call(fetchSongList)
    yield put(addSongs(songs))
    yield put({ type: SONG_STATS_FETCH_REQUESTED })
  } catch (e) {
    yield put({ type: SONG_LIST_FETCH_FAILED })
  }
}

function* fetchSongListSaga() {
  yield takeEvery(SONG_LIST_FETCH_REQUESTED, fetchSongListGenerator)
}

function* fetchStatsSagaGenerator() {
  try {
    const stats: Stat = yield call(fetchStat)
    yield put(setStats(stats))
  } catch (e) {
    yield put({ type: SONG_STATS_FETCH_FAILED })
  }
}

function* fetchStatsSaga() {
  yield takeEvery(SONG_STATS_FETCH_REQUESTED, fetchStatsSagaGenerator)
}

function* createSongGenerator(action: PayloadAction<FieldValues>) {
  try {
    yield call(createSong, action.payload)
    yield put({ type: SONG_LIST_FETCH_REQUESTED })
    yield put(close())
  } catch (e) {
    yield put({ type: SONG_CREATE_FAILED })
  }
}

function* createSongSaga() {
  yield takeEvery(SONG_CREATE_REQUESTED, createSongGenerator)
}

function* updateSongGenerator(action: PayloadAction<FieldValues>) {
  try {
    yield call(updateSong, action.payload)
    yield put({ type: SONG_LIST_FETCH_REQUESTED })
    yield put(close())
  } catch (e) {
    yield put({ type: SONG_UPDATE_FAILED })
  }
}

function* updateSongSaga() {
  yield takeEvery(SONG_UPDATE_REQUESTED, updateSongGenerator)
}

export default function* rootSongSaga() {
  yield all([fetchSongListSaga(), fetchStatsSaga(), createSongSaga(), updateSongSaga()])
}
