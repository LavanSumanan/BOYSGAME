import { createContext, useState, useContext } from "react";

import { SCREEN_NAMES } from "../constants/screenNames";

import { Title } from "../pages/Title";
import { MakeTeams } from "../pages/MakeTeams";
import { Ready } from "../pages/Ready";
import { BoyPhoto } from "../pages/BoyPhoto";
import { AllOrNothingInfo } from "../pages/AllOrNothingInfo";
import { AllOrNothing } from "../pages/AllOrNothing";

/* Screen
id: string
component: React.Component
*/

const ScreensContext = createContext();

const screens = [
  { id: SCREEN_NAMES.TITLE, component: Title, hasFooter: false },
  { id: SCREEN_NAMES.MAKE_TEAMS, component: MakeTeams, hasFooter: false },
  { id: SCREEN_NAMES.READY, component: Ready, hasFooter: false },
  { id: SCREEN_NAMES.BOY_PHOTO, component: BoyPhoto, hasFooter: true },
  {
    id: SCREEN_NAMES.ALL_OR_NOTHING_INFO,
    component: AllOrNothingInfo,
    hasFooter: false,
  },
  {
    id: SCREEN_NAMES.ALL_OR_NOTHING,
    component: AllOrNothing,
    hasFooter: true,
  },
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
