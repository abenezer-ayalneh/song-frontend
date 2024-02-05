import { all, call, put, takeEvery } from 'redux-saga/effects'
import { fetchSongList, fetchStat } from '../../_requests.ts'
import { Song, Stat } from '../../types.ts'
import {
  SONG_LIST_FETCH_FAILED,
  SONG_LIST_FETCH_REQUESTED,
  SONG_STATS_FETCH_FAILED,
  SONG_STATS_FETCH_REQUESTED,
} from '../actions.ts'
import { addSongs, setStats } from '../slices/song.slice.ts'

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

export default function* rootSongSaga() {
  yield all([fetchSongListSaga(), fetchStatsSaga()])
}
