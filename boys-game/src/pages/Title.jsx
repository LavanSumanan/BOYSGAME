import { useScreens } from "../contexts/ScreensContext";
import { SCREEN_NAMES } from "../constants/screenNames";

export const Title = () => {
  const { setScreen } = useScreens();

  return (
    <div>
      <h1>Title Screen</h1>
      <button
        onClick={() => {
          setScreen(SCREEN_NAMES.MAKE_TEAMS);
        }}
      >
        Make Teams
      </button>
    </div>
  );
};
