import { useScreens } from "../contexts/ScreensContext";
import { SCREEN_NAMES } from "../constants/screenNames";
import { useBoys } from "../contexts/BoysContext";
import { useState, useEffect, useRef } from "react";
import allOrNothingBg from "../assets/allornothingbg.png";

import cocomallfast from "../assets/sounds/cocomallfast.mp3";

const Photo = () => {
  const { currentBoy } = useBoys();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h2
        style={{
          position: "absolute",
          left: "-60px",
          top: "50px",
          margin: 0,
          fontSize: "180px",
          overflow: "hidden",
          whiteSpace: "nowrap",
        }}
      >
        GUESS RIGHT NEOW
      </h2>
      <img
        style={{ marginTop: "300px" }}
        className="media"
        src={currentBoy.photoId}
      />
    </div>
  );
};

const Video = ({ toggleAudio }) => {
  const { currentBoy } = useBoys();
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setShowAnswer(true);
      toggleAudio();
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h2>it was...</h2>
      {showAnswer ? (
        <video
          className="media fade-in"
          autoPlay
          controls
          src={currentBoy.videoId}
        />
      ) : (
        <></>
      )}
      {showAnswer ? (
        <h3 className="fade-in" style={{ fontSize: "100px", margin: 0 }}>
          {currentBoy.id}
        </h3>
      ) : (
        <h3 style={{ fontSize: "100px", margin: 0 }}>🧍‍♂️</h3>
      )}
    </div>
  );
};

const SUBSCREENS = {
  PHOTO: { id: "photo", component: Photo },
  VIDEO: { id: "video", component: Video },
};

export const AllOrNothing = () => {
  const { setScreen } = useScreens();
  const [subscreen, setSubscreen] = useState(SUBSCREENS.PHOTO);
  const audioRef = useRef(new Audio(cocomallfast));
  const [isPlaying, setIsPlaying] = useState(true);

  const toggleAudio = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const audio = audioRef.current;
    audio.play(); // play initially

    // Clean up when unmounting
    return () => {
      audio.pause();
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSubscreen(SUBSCREENS.VIDEO);
      toggleAudio();
    }, 5000);
    return () => clearTimeout(timer);
  }, [setScreen]);

  useEffect(() => {
    // on right arrow key press
    const handleNext = () => {
      if (subscreen.id === SUBSCREENS.VIDEO.id) {
        setScreen(SCREEN_NAMES.DRUMROLL);
      }
    };

    const handleKeyPress = (e) => {
      if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [setScreen, subscreen]);

  const CurrentSubscreen = subscreen.component;

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <img className="all-or-nothing tweak faded" src={allOrNothingBg} />
      <CurrentSubscreen toggleAudio={toggleAudio} />
    </div>
  );
};
