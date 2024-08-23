import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  FaPlay,
  FaPause,
  FaForward,
  FaBackward,
  FaBars,
  FaVolumeUp,
} from "react-icons/fa";
import {
  fetchSongs,
  nextSong,
  previousSong,
} from "../../store/SongSlice/SongSlice";
import "./Player.css";
import Playlist from "../Playlist/Playlist";
import { extractColors } from "extract-colors";

const Player = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showSoundBar, setShowSoundBar] = useState(false);
  const [showMiddleComponent, setShowMiddleComponent] = useState(false);
  const dispatch = useDispatch();
  const { songs, currSongIndex } = useSelector((state) => state.song);
  const currentSong = songs[currSongIndex];
  const audioRef = useRef(new Audio(currentSong.url));
  const { status } = useSelector((state) => state.song);
  const coverURL = `https://cms.samespace.com/assets/${currentSong.cover}`;

  useEffect(() => {
    extractColors(coverURL, { crossOrigin: "anonymous" })
      .then((colors) => {
        const alpha = 1;

        const colorValues = colors
          .slice(0, 3)
          .map(
            (color) =>
              `rgba(${color.red}, ${color.green}, ${color.blue}, ${alpha})`
          );

        const background = `linear-gradient(to right, ${colorValues.join(
          ", "
        )})`;

        document.getElementsByTagName("body")[0].style.background = background;
      })
      .catch(console.error);
  }, [coverURL]);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchSongs());
    }
  }, [status, dispatch]);

  useEffect(() => {
    audioRef.current.src = currentSong.url;
    audioRef.current
      .play()
      .then(() => setIsPlaying(true))
      .catch((error) => {
        console.error("Autoplay failed:", error);
        setIsPlaying(false);
      });
  }, [currSongIndex, currentSong.url]);

  useEffect(() => {
    const audio = audioRef.current;
    const setAudioData = () => {
      setDuration(audio.duration);
      setCurrentTime(audio.currentTime);
    };

    const setAudioTime = () => setCurrentTime(audio.currentTime);

    audio.addEventListener("loadeddata", setAudioData);
    audio.addEventListener("timeupdate", setAudioTime);

    if (isPlaying) {
      audio.play().catch((error) => {
        console.error("Playback failed:", error);
        setIsPlaying(false);
      });
    } else {
      audio.pause();
    }

    return () => {
      audio.removeEventListener("loadeddata", setAudioData);
      audio.removeEventListener("timeupdate", setAudioTime);
    };
  }, [isPlaying]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleProgressChange = (e) => {
    const newTime = e.target.value;
    setCurrentTime(newTime);
    audioRef.current.currentTime = newTime;

    e.target.style.setProperty("--value", (newTime / duration) * 100);
  };

  useEffect(() => {
    const progressInput = document.querySelector(".progress input");
    if (progressInput) {
      progressInput.style.setProperty(
        "--value",
        (currentTime / duration) * 100
      );
    }
  }, [currentTime, duration]);

  const toggleSoundBar = () => {
    setShowSoundBar((prev) => !prev);
  };

  const handleVolumeChange = (e) => {
    audioRef.current.volume = e.target.value;
  };

  const toggleMiddleComponent = () => {
    setShowMiddleComponent((prev) => !prev);
  };

  return (
    <div className="player">
      <div className="player-container">
        <div className="player-info">
          <h3>{currentSong.name}</h3>
          <span>{currentSong.artist}</span>
        </div>
        <div className="song-cover">
          <img
            src={`https://cms.samespace.com/assets/${currentSong.cover}`}
            alt={currentSong.name}
          />
        </div>

        <div className="control-progress">
          <div className="progress">
            <input
              type="range"
              value={currentTime}
              min="0"
              max={duration}
              onChange={handleProgressChange}
            />
          </div>
          <div className="controls">
            <button
              className="control-button player-menu"
              onClick={toggleMiddleComponent}
            >
              <FaBars />
            </button>
            <button
              className="control-button"
              onClick={() => dispatch(previousSong())}
            >
              <FaBackward />
            </button>
            <button
              className="control-button play-pause"
              onClick={togglePlayPause}
            >
              {isPlaying ? <FaPause /> : <FaPlay />}
            </button>
            <button
              className="control-button"
              onClick={() => dispatch(nextSong())}
            >
              <FaForward />
            </button>
            <button className="control-button" onClick={toggleSoundBar}>
              <FaVolumeUp />
            </button>
            {showSoundBar && (
              <div className="sound-bar">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  onChange={handleVolumeChange}
                />
              </div>
            )}
          </div>
        </div>

        {showMiddleComponent && (
          <div className="middle-component">
            <Playlist songList={songs} />{" "}
          </div>
        )}
      </div>
    </div>
  );
};

export default Player;
