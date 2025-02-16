import { SCREEN_NAMES } from "../constants/screenNames";
import { useScreens } from "../contexts/ScreensContext";

import { useState } from "react";

export const Screen = () => {
  const { currentScreen, setScreen } = useScreens();

  const [screenId, setScreenId] = useState(SCREEN_NAMES.TITLE);

  return (
    <div>
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
      <h1>{currentScreen.id}</h1>
      {currentScreen.component && <currentScreen.component />}
    </div>
  );
};
