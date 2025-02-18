import { useScreens } from "../contexts/ScreensContext";
import { SCREEN_NAMES } from "../constants/screenNames";
import { useBoys } from "../contexts/BoysContext";
import { useTeams } from "../contexts/TeamsContext";

export const Standings = () => {
  const { setScreen } = useScreens();
  const { resetBoys } = useBoys();
  const { resetTeams } = useTeams();

  const resetGameState = ({ shouldResetTeams }) => {
    resetBoys();
    shouldResetTeams && resetTeams();
    setScreen(SCREEN_NAMES.TITLE);
  };

  return (
    <div>
      <h1>Standings</h1>
      <p>Insert standings here</p>
      <button
        onClick={() => {
          resetGameState({ shouldResetTeams: false });
        }}
      >
        Play again (same teams)
      </button>
      <button
        onClick={() => {
          resetGameState({ shouldResetTeams: true });
        }}
      >
        Play again (new teams)
      </button>
    </div>
  );
};
