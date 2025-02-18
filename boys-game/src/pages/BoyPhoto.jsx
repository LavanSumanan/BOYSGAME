import { useBoys } from "../contexts/BoysContext";
import { useState, useEffect } from "react";
import { useScreens } from "../contexts/ScreensContext";
import { SCREEN_NAMES } from "../constants/screenNames";

const Photo = () => {
  const { currentBoy } = useBoys();
  return (
    <div>
      <h2>Photo</h2>
      <h3>Current boy data:</h3>
      {Object.entries(currentBoy).map(([key, value]) => (
        <p key={key}>
          {key}: {value}
        </p>
      ))}
    </div>
  );
};

const Video = () => {
  return (
    <div>
      <h2>Video</h2>
    </div>
  );
};

const SECONDS_TO_GUESS = 5;
const Timer = () => {
  const [timeLeft, setTimeLeft] = useState(SECONDS_TO_GUESS);
  const displayText = timeLeft === 0 ? "Time's up!" : `Guess now! ${timeLeft}`;

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  return (
    <div>
      <h2>Timer (TODO: remove this text)</h2>
      <h1>{displayText}</h1>
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

  useEffect(() => {
    // on right arrow key press
    const handleNext = () => {
      if (
        subscreen.id === SUBSCREENS.TIMER.id ||
        subscreen.id === SUBSCREENS.PHOTO.id
      ) {
        setSubscreen(SUBSCREENS.VIDEO);
      } else if (subscreen.id === SUBSCREENS.VIDEO.id) {
        // save last boy for ALL OR NOTHING
        if (currentBoyIndex === totalBoys - 1) {
          setScreen(SCREEN_NAMES.ALL_OR_NOTHING_INFO);
        } else {
          setSubscreen(SUBSCREENS.PHOTO);
          setNextBoy();
        }
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
      console.log(e.key);
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
      <h3>Total boys: {totalBoys}</h3>
      <h3>Current boy index: {currentBoyIndex}</h3>
      <CurrentSubscreen />
      <button onClick={setNextBoy}>Next</button>
      <button onClick={setPreviousBoy}>Previous</button>
    </div>
  );
};
