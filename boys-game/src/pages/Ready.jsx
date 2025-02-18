import { useState, useEffect } from "react";
import { useScreens } from "../contexts/ScreensContext";
import { SCREEN_NAMES } from "../constants/screenNames";

const TEXT_TO_DISPLAY = ["Ready?", "3", "2", "1"];

export const Ready = () => {
  const { setScreen } = useScreens();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < TEXT_TO_DISPLAY.length) {
      const timer = setTimeout(() => setIndex((prev) => prev + 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setScreen(SCREEN_NAMES.BOY_PHOTO);
    }
  }, [index, setScreen]);

  return (
    <div>
      <h1>{TEXT_TO_DISPLAY[index]}</h1>
    </div>
  );
};
