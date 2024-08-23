import React from "react";
import "./Playlist.css";
import { GoSearch, GoX } from "react-icons/go";
import SongCard from "../SongCard/SongCard";
import { useSelector, useDispatch } from "react-redux";
import { setSearchTerm, clearSearch } from "../../store/SongSlice/SongSlice";

const Playlist = () => {
  const dispatch = useDispatch();
  const { filteredSongs, searchTerm } = useSelector((state) => state.song);

  const handleSearch = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

  const handleClearSearch = () => {
    dispatch(clearSearch());
  };

  return (
    <div className="playlist-container">
      <div className="middle-input">
        <input 
          type="text" 
          placeholder="Search Song, Artist" 
          value={searchTerm}
          onChange={handleSearch}
        />
        {searchTerm ? (
          <GoX className="clear-icon" onClick={handleClearSearch} />
        ) :(<GoSearch className="search-icon" />)}
      </div>

      <div className="song-list">
        {filteredSongs.length > 0 ? (
          filteredSongs.map((song, index) => (
            <SongCard key={song.id} song={song} index={index} />
          ))
        ) : (
          <p>No songs found</p>
        )}
      </div>
    </div>
  );
};

export default Playlist;