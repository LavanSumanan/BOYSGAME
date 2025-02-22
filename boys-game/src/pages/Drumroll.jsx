import { useScreens } from "../contexts/ScreensContext";
import { SCREEN_NAMES } from "../constants/screenNames";
import drumrollBg from "../assets/drumroll.png";

import harryBass from "../assets/sounds/harrybass.m4a";

const playHarrySound = () => {
  const audio = new Audio(harryBass);
  audio.play();
};

export const Drumroll = () => {
  const { setScreen } = useScreens();

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <img
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "100vh",
          width: "100vw",
        }}
        src={drumrollBg}
      />
      <button
        className="nav fade-in"
        style={{
          position: "relative",
          left: "40%",
          background: "#00FF33",
          color: "black",
          marginRight: "40px",
        }}
        onClick={() => {
          setScreen(SCREEN_NAMES.STANDINGS);
          playHarrySound();
        }}
      >
        {"who won?? ->"}
      </button>
    </div>
  );
};
