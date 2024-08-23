import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSongs = createAsyncThunk("songs/fetchSongs", async () => {
  const response = await axios.get("https://cms.samespace.com/items/songs");
  return response.data.data;
});

const initialState = {
  songs: [
    {
      id: 1,
      status: "published",
      sort: null,
      user_created: "2085be13-8079-40a6-8a39-c3b9180f9a0a",
      date_created: "2023-08-10T06:10:57.746Z",
      user_updated: "2085be13-8079-40a6-8a39-c3b9180f9a0a",
      date_updated: "2023-08-10T07:19:48.547Z",
      name: "Colors",
      artist: "William King",
      accent: "#331E00",
      cover: "4f718272-6b0e-42ee-92d0-805b783cb471",
      top_track: true,
      url: "https://pub-172b4845a7e24a16956308706aaf24c2.r2.dev/august-145937.mp3",
    },
  ],
  filteredSongs: [],
  currSongIndex: 0,
  status: "idle",
  error: null,
  searchTerm: "",
};

const SongSlice = createSlice({
  name: "songs",
  initialState,
  reducers: {
    nextSong: (state) => {
      state.currSongIndex = (state.currSongIndex + 1) % state.songs.length;
      localStorage.setItem("currSongIndex", state.currSongIndex);
    },
    previousSong: (state) => {
      state.currSongIndex =
        (state.currSongIndex - 1 + state.songs.length) % state.songs.length;
      localStorage.setItem("currSongIndex", state.currSongIndex);
    },
    setCurrentSongIndex: (state, action) => {
      state.currSongIndex = action.payload;
      localStorage.setItem("currSongIndex", state.currSongIndex);
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      state.filteredSongs = state.songs.filter(song => 
        song.name.toLowerCase().includes(action.payload.toLowerCase()) ||
        song.artist.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
    clearSearch: (state) => {
      state.searchTerm = "";
      state.filteredSongs = state.songs;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchSongs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSongs.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.songs = action.payload;
        state.filteredSongs = action.payload;
      })
      .addCase(fetchSongs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { nextSong, previousSong, setCurrentSongIndex, setSearchTerm, clearSearch } = SongSlice.actions;
export default SongSlice.reducer;