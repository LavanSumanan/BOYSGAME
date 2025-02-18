import { useScreens } from "../contexts/ScreensContext";
import { SCREEN_NAMES } from "../constants/screenNames";
import { useBoys } from "../contexts/BoysContext";
import { useState, useEffect } from "react";

export const AllOrNothing = () => {
  const { setScreen } = useScreens();
  const { currentBoy } = useBoys();

  const SECONDS_TO_GUESS = 5;
  const [timeLeft, setTimeLeft] = useState(SECONDS_TO_GUESS);
  const displayText = timeLeft < 1 ? "Time's up!" : `Guess now! ${timeLeft}`;

  useEffect(() => {
    if (timeLeft >= 0) {
      const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setScreen(SCREEN_NAMES.DRUMROLL);
    }
  }, [timeLeft, setScreen]);

  return (
    <div>
      <h1>All Or Nothing</h1>
      <p>{displayText}</p>
      {Object.entries(currentBoy).map(([key, value]) => (
        <p key={key}>
          {key}: {value}
        </p>
      ))}
    </div>
  );
};
