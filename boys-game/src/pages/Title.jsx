import { useScreens } from "../contexts/ScreensContext";
import { SCREEN_NAMES } from "../constants/screenNames";
import titleBgImage from "../assets/titlebgimage.png";
import titleText from "../assets/titleText.png";
import { useEffect } from "react";

import julesSound from "../assets/sounds/jules.mp3";

export const Title = () => {
  useEffect(() => {
    const audio = new Audio(julesSound);
    audio.play();
  }, []);

  const { setScreen } = useScreens();

  return (
    <div>
      <h1
        style={{
          marginTop: "0px",
          marginBottom: "0px",
          fontWeight: 400,
          fontSize: "80px",
          color: "#4F7AD7",
        }}
      >
        {"who's that"}
      </h1>
      <div style={{ marginTop: "20px", marginBottom: "20px" }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img
            className="faded"
            style={{ position: "absolute" }}
            height="70%"
            src={titleText}
          />
        </div>
        <img width="100%" src={titleBgImage} />
      </div>
      <button
        className="nav"
        onClick={() => {
          setScreen(SCREEN_NAMES.MAKE_TEAMS);
        }}
      >
        start
      </button>
    </div>
  );
};
