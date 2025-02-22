import { useState, useEffect } from "react";
import { useScreens } from "../contexts/ScreensContext";
import { SCREEN_NAMES } from "../constants/screenNames";

const TEXT_TO_DISPLAY = ["5", "4", "1", "START"];

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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <h3 style={{ fontSize: "60px" }}>ready?</h3>
      <h3 style={{ fontSize: "30px" }}>u have no choice lol</h3>
      <h3
        style={
          index == TEXT_TO_DISPLAY.length - 1
            ? {
                position: "relative",
                marginTop: "20px",
                fontSize: "100px",
                left: "150px",
              }
            : {
                marginTop: "20px",
                fontSize: "100px",
              }
        }
      >
        {TEXT_TO_DISPLAY[index]}
      </h3>
    </div>
  );
};
