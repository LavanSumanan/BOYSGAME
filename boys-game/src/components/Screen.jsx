import { useState } from "react";
import { useScreens } from "../contexts/ScreensContext";
import { SCREEN_NAMES } from "../constants/screenNames";
import { TeamScoresFooter } from "./TeamScoresFooter";

export const Screen = () => {
  const { currentScreen, setScreen } = useScreens();

  const [screenId, setScreenId] = useState(SCREEN_NAMES.TITLE);

  const TestSwitcher = () => {
    return (
      <>
        <label htmlFor="screenId">Screen to switch to:</label>
        <select
          name="screenId"
          id="screenId"
          onChange={(e) => setScreenId(e.target.value)}
        >
          {Object.entries(SCREEN_NAMES).map(([key, value]) => (
            <option key={key} value={value}>
              {value}
            </option>
          ))}
        </select>
        <button
          onClick={() => {
            setScreen(screenId);
          }}
        >
          Select Screen
        </button>
        <label>Selected screen: {currentScreen.id}</label>
      </>
    );
  };

  return (
    <div className="screen">
      {/* <TestSwitcher /> */}
      {currentScreen.component && <currentScreen.component />}
      {currentScreen.hasFooter && <TeamScoresFooter />}
    </div>
  );
};
