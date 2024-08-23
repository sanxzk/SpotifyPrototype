import { configureStore } from "@reduxjs/toolkit";
import SongSlice from "./SongSlice/SongSlice";

const store = configureStore({
    reducer:{
       song: SongSlice,
    }
});

export default store;