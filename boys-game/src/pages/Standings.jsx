import { useScreens } from "../contexts/ScreensContext";
import { SCREEN_NAMES } from "../constants/screenNames";
import { useBoys } from "../contexts/BoysContext";
import { useTeams } from "../contexts/TeamsContext";
import standingsBg from "../assets/kahoot.jpg";
import { useEffect } from "react";
import standingSound from "../assets/sounds/standings.mp3";

const lefts = ["860px", "580px", "1140px", "1420px"];
const tops = ["270px", "340px", "420px", "490px"];

export const Standings = () => {
  const { setScreen } = useScreens();
  const { resetBoys } = useBoys();
  const { teams, resetTeams } = useTeams();

  useEffect(() => {
    const audio = new Audio(standingSound);
    audio.play();
  }, []);

  const resetGameState = ({ shouldResetTeams }) => {
    resetBoys();
    shouldResetTeams && resetTeams();
    setScreen(SCREEN_NAMES.TITLE);
  };

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <img
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          opacity: "90%",
          zIndex: -1,
        }}
        src={standingsBg}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
        }}
      >
        <div>
          <h1
            style={{
              fontSize: "100px",
              fontWeight: 20,
              color: "#4F7AD7",
              backgroundColor: "white",
            }}
          >
            Standings
          </h1>
          <div style={{ height: "70%" }}>
            {teams
              .sort((a, b) => {
                return b.score - a.score;
              })
              .map((team, index) => {
                return (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      position: "absolute",
                      height: "100px",
                      left: lefts[index],
                      top: tops[index],
                    }}
                    key={team.name}
                  >
                    <img src={team.icon} height="50px" />
                    <p
                      style={{
                        fontSize: "40px",
                        fontWeight: 10,
                        color: "black",
                        backgroundColor: "white",
                        margin: 0,
                      }}
                    >
                      {team.name}
                    </p>
                    <p
                      style={{
                        fontSize: "40px",
                        fontWeight: 20,
                        color: "black",
                        backgroundColor: "white",
                        margin: 0,
                      }}
                    >
                      {team.score}
                    </p>
                  </div>
                );
              })}
          </div>
        </div>
        <div>
          <button
            className="score"
            style={{
              backgroundColor: "#48FF00",
              color: "black",
              padding: "30px",
            }}
            onClick={() => {
              resetGameState({ shouldResetTeams: false });
            }}
          >
            Play again (same teams)
          </button>
          <button
            className="score"
            style={{
              backgroundColor: "#0004FF",
              color: "white",
              padding: "30px",
            }}
            onClick={() => {
              resetGameState({ shouldResetTeams: true });
            }}
          >
            Play again (new teams)
          </button>
        </div>
      </div>
    </div>
  );
};
