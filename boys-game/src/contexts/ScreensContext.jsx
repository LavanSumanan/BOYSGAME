import { createContext, useState, useContext } from "react";

import { SCREEN_NAMES } from "../constants/screenNames";

import { MakeTeams } from "../pages/MakeTeams";

/* Screen
id: string
component: React.Component
*/

const ScreensContext = createContext();

const screens = [
  { id: SCREEN_NAMES.TITLE, component: null },
  { id: SCREEN_NAMES.MAKE_TEAMS, component: MakeTeams },
  { id: SCREEN_NAMES.READY, component: null },
  { id: SCREEN_NAMES.BOY_PHOTO, component: null },
  { id: SCREEN_NAMES.ALL_OR_NOTHING_INFO, component: null },
  { id: SCREEN_NAMES.ALL_OR_NOTHING, component: null },
  { id: SCREEN_NAMES.DRUMROLL, component: null },
  { id: SCREEN_NAMES.STANDINGS, component: null },
];

export const ScreenProvider = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState(screens[0]);

  const setScreen = (screenId) => {
    setCurrentScreen(screens.find((screen) => screen.id === screenId));
  };

  return (
    <ScreensContext.Provider value={{ currentScreen, setScreen }}>
      {children}
    </ScreensContext.Provider>
  );
};

export const useScreens = () => {
  return useContext(ScreensContext);
};
