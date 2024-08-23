import React, { useEffect, useState } from "react";
import "./SongCard.css";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentSongIndex } from "../../store/SongSlice/SongSlice";

const SongCard = ({ song, index }) => {
  const [duration, setDuration] = useState("");

  const dispatch = useDispatch();
  const currIndex = useSelector((state) => state.song.currSongIndex);

  useEffect(() => {
    const audio = new Audio(song.url);

    audio.addEventListener("loadedmetadata", () => {
      const seconds = audio.duration;

      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = Math.floor(seconds % 60);
      const formattedDuration = `${minutes
        .toString()
        .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
      setDuration(formattedDuration);
    });

    return () => {
      audio.removeEventListener("loadedmetadata", () => {});
    };
  }, [song]);

  return (
    <div
      className={`song-card-container ${
        index === currIndex ? "active-song-card" : ""
      }`}
      onClick={() => dispatch(setCurrentSongIndex(index))}
    >
      <img
        src={`https://cms.samespace.com/assets/${song.cover}`}
        alt={song.name}
        className="song-img"
      />
      <div className="song-info">
        <div className="song-name-art">
          <h3>{song.name}</h3>
          <p>{song.artist}</p>
        </div>
        <p className="song-duration">{duration}</p>
      </div>
    </div>
  );
};

export default SongCard;
