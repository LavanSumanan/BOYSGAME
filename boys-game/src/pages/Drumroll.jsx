import { useScreens } from "../contexts/ScreensContext";
import { SCREEN_NAMES } from "../constants/screenNames";

export const Drumroll = () => {
  const { setScreen } = useScreens();

  return (
    <div>
      <h1>Drumroll</h1>
      <button
        onClick={() => {
          setScreen(SCREEN_NAMES.STANDINGS);
        }}
      >
        See Results
      </button>
    </div>
  );
};
