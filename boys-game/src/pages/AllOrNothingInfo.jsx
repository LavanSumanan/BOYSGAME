import { useScreens } from "../contexts/ScreensContext";
import { SCREEN_NAMES } from "../constants/screenNames";
import { useBoys } from "../contexts/BoysContext";

export const AllOrNothingInfo = () => {
  const { setScreen } = useScreens();
  const { setNextBoy } = useBoys();

  return (
    <div>
      <h1>All Or Nothing Info</h1>
      <p>Insert explanation</p>
      <button
        onClick={() => {
          setNextBoy();
          setScreen(SCREEN_NAMES.ALL_OR_NOTHING);
        }}
      >
        Start All or Nothing!
      </button>
    </div>
  );
};
