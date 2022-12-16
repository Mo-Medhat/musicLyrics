import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "abc63a0e1bmsh0416feda14ffb0dp1fd675jsn7c85745e2108",
    "X-RapidAPI-Host": "shazam-core.p.rapidapi.com",
  },
};

export const getWorldChart = createAsyncThunk(
  "users/fetchByIdStatus",
  async () => {
    const response = await fetch(
      `https://shazam-core.p.rapidapi.com/v1/charts/world`,
      options
    );
    const data = await response.json();
    return data;
  }
);

const initialState = {
  currentSongs: [],
  currentIndex: 0,
  isActive: false,
  isPlaying: false,
  activeSong: false,
  genreListId: '',

  loading: false,
  data: [],
  error: null,
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setActiveSong: (state, action) => {
        state.activeSong = action.payload.song

        if (action.payload?.data?.tracks?.hits) {
          state.currentSongs = action.payload.data.tracks.hits;
        } else if (action.payload?.data?.properties) {
          state.currentSongs = action.payload?.data?.tracks;
        } else {
          state.currentSongs = action.payload.data;
        }

        state.currentIndex = action.payload.idx;
        state.isActive = true;
    },

    playPause: (state, action) => {
      state.isPlaying = action.payload
    },

    selectGenreListId: (state, action) => {
      state.genreListId = action.payload;
    },
  },

  extraReducers: {
    [getWorldChart.pending]: (state, action) => {
      state.loading = true;
    },
    [getWorldChart.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    [getWorldChart.rejected]: (state, action) => {
      state.loading = false;
      state.error = "error";
    },
  },
});

export const {setActiveSong, playPause, selectGenreListId } = playerSlice.actions;
export default playerSlice.reducer;
