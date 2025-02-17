import { createContext, useState, useContext } from "react";

import { SCREEN_NAMES } from "../constants/screenNames";

import { MakeTeams } from "../pages/MakeTeams";
import { BoyPhoto } from "../pages/BoyPhoto";
import { Title } from "../pages/Title";

/* Screen
id: string
component: React.Component
*/

const ScreensContext = createContext();

const screens = [
  { id: SCREEN_NAMES.TITLE, component: Title, hasFooter: false },
  { id: SCREEN_NAMES.MAKE_TEAMS, component: MakeTeams, hasFooter: false },
  { id: SCREEN_NAMES.READY, component: null, hasFooter: false },
  { id: SCREEN_NAMES.BOY_PHOTO, component: BoyPhoto, hasFooter: true },
  { id: SCREEN_NAMES.ALL_OR_NOTHING_INFO, component: null, hasFooter: false },
  { id: SCREEN_NAMES.ALL_OR_NOTHING, component: null, hasFooter: true },
  { id: SCREEN_NAMES.DRUMROLL, component: null, hasFooter: true },
  { id: SCREEN_NAMES.STANDINGS, component: null, hasFooter: false },
  { id: SCREEN_NAMES.ERROR, component: null, hasFooter: false },
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
