import { useBoys } from "../contexts/BoysContext";
import { useState, useEffect, useRef } from "react";
import { useScreens } from "../contexts/ScreensContext";
import { SCREEN_NAMES } from "../constants/screenNames";

import cocomall from "../assets/sounds/cocomall.mp3";
import harperYell from "../assets/sounds/harperyell.m4a";

const playHarperSound = () => {
  const audio = new Audio(harperYell);
  audio.play();
};

const Photo = () => {
  const { currentBoy } = useBoys();
  const [showUnzoom, setShowUnzoom] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h2>who dis</h2>
      <div
        style={{
          position: "absolute",
          top: "100px",
          left: "1400px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <button
          className="score"
          onClick={() => {
            setShowUnzoom(true);
            playHarperSound();
          }}
        >
          🔍-
        </button>
        <button
          className="score"
          onClick={() => {
            setShowUnzoom(false);
            playHarperSound();
          }}
        >
          🔍+
        </button>
      </div>
      {showUnzoom && currentBoy.unzoomId !== undefined ? (
        <img className="media" src={currentBoy.unzoomId} />
      ) : (
        <img className="media" src={currentBoy.photoId} />
      )}
    </div>
  );
};

const Video = () => {
  const { currentBoy } = useBoys();
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setShowAnswer(true);
    }, 3000);
    return () => clearTimeout(timer);
  });

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
        currentBoy.videoId !== undefined ? (
          <video
            className="media fade-in"
            autoPlay
            controls
            src={currentBoy.videoId}
          />
        ) : currentBoy.unzoomId !== undefined ? (
          <img className="media fade-in" src={currentBoy.unzoomId} />
        ) : (
          <></>
        )
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

const SECONDS_TO_GUESS = 5;
const Timer = () => {
  const [timeLeft, setTimeLeft] = useState(SECONDS_TO_GUESS);
  const displayText = timeLeft === 0 ? "Time's up!" : timeLeft;

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  return (
    <div>
      <h3 style={{ fontSize: "70px" }}>guess!!</h3>
      <h3 style={{ marginTop: "60px", fontSize: "100px" }}>{displayText}</h3>
    </div>
  );
};

const SUBSCREENS = {
  PHOTO: { id: "photo", component: Photo },
  VIDEO: { id: "video", component: Video },
  TIMER: { id: "timer", component: Timer },
};

export const BoyPhoto = () => {
  const { setScreen } = useScreens();
  const { currentBoyIndex, setNextBoy, setPreviousBoy, totalBoys } = useBoys();
  const [subscreen, setSubscreen] = useState(SUBSCREENS.PHOTO);

  const audioRef = useRef(new Audio(cocomall));
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
    // on right arrow key press
    const handleNext = () => {
      if (
        subscreen.id === SUBSCREENS.TIMER.id ||
        subscreen.id === SUBSCREENS.PHOTO.id
      ) {
        setSubscreen(SUBSCREENS.VIDEO);
        toggleAudio();
      } else if (subscreen.id === SUBSCREENS.VIDEO.id) {
        // save last boy for ALL OR NOTHING
        if (currentBoyIndex === totalBoys - 2) {
          setScreen(SCREEN_NAMES.ALL_OR_NOTHING_INFO);
        } else {
          setSubscreen(SUBSCREENS.PHOTO);
          toggleAudio();
        }
        setNextBoy();
      }
    };

    // on left arrow key press
    const handlePrevious = () => {
      if (subscreen.id === SUBSCREENS.PHOTO.id) {
        setPreviousBoy();
      }
      setSubscreen(SUBSCREENS.PHOTO);
    };

    // on space bar press
    const toggleTimerScreen = () => {
      if (subscreen.id === SUBSCREENS.TIMER.id) {
        setSubscreen(SUBSCREENS.PHOTO);
      } else {
        setSubscreen(SUBSCREENS.TIMER);
      }
    };
    const handleKeyPress = (e) => {
      if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrevious();
      } else if (e.key === " ") {
        toggleTimerScreen();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [
    currentBoyIndex,
    setScreen,
    totalBoys,
    setNextBoy,
    setPreviousBoy,
    subscreen,
  ]);

  const CurrentSubscreen = subscreen.component;

  return (
    <div>
      <h3 style={{ position: "absolute", left: "1600px", fontSize: "40px" }}>
        {currentBoyIndex + 1}/{totalBoys - 1}
      </h3>
      <CurrentSubscreen />
    </div>
  );
};
