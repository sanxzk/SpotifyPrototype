import React, { useEffect } from "react";
import "./HomeMiddleBar.css";
import MiddleBarHeader from "../MiddleBarHeader/MiddleBarHeader";
import Playlist from "../Playlist/Playlist";
import { useDispatch, useSelector } from "react-redux";
import { fetchSongs } from "../../store/SongSlice/SongSlice";

const HomeMiddleBar = () => {
  const dispatch = useDispatch();
  
  const {status} = useSelector(state => state.song);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchSongs());
    }
  }, [status, dispatch]);


  const songs = useSelector((state)=>state.song.songs) 
   
  return (
    <div className="middle-first-container">
      <MiddleBarHeader />
      <Playlist songList={songs}/>
      
      {/* <Playlist songList={topTracksData}/> */}
    </div>
  );
};

export default HomeMiddleBar;
