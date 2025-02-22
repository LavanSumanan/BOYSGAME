import { useScreens } from "../contexts/ScreensContext";
import { SCREEN_NAMES } from "../constants/screenNames";
import { useEffect } from "react";
import allOrNothingBg from "../assets/allornothingbg.png";

export const AllOrNothingInfo = () => {
  const { setScreen } = useScreens();

  useEffect(() => {
    const timer = setTimeout(() => {
      setScreen(SCREEN_NAMES.ALL_OR_NOTHING);
    }, 2000);
    return () => clearTimeout(timer);
  }, [setScreen]);

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
      }}
    >
      <img className="all-or-nothing tweak" src={allOrNothingBg} />
    </div>
  );
};
