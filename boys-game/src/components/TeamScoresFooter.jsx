import { useTeams } from "../contexts/TeamsContext";
import { useBoys } from "../contexts/BoysContext";
import { useState } from "react";

import yippeeSound from "../assets/sounds/yippeeee.mp3";
import wtsSound from "../assets/sounds/whattheshit.m4a";

const playYippeeSound = () => {
  const audio = new Audio(yippeeSound);
  audio.play();
};

const playWTSSound = () => {
  const audio = new Audio(wtsSound);
  audio.play();
};

const TeamMenu = ({ team, updateScore, score, showScores, setShowScores }) => (
  <div
    style={{
      display: "flex",
      height: "50px",
      width: "100%",
      border: "2px solid black",
      backgroundColor: "#8ECDEC",
      marginBottom: "0px",
    }}
  >
    <div style={{ display: "flex", justifyContent: "space-evenly" }}>
      <p
        style={{
          fontSize: "40px",
          margin: 0,
          padding: "0px 4px 0px 4px",
          lineHeight: "45px",
        }}
      >
        {team.name}
      </p>
      <img
        onClick={() => setShowScores((prev) => !prev)}
        src={team.icon}
        alt="icon"
        style={{ margin: "5px" }}
      />
      {showScores && (
        <p
          style={{
            fontSize: "20px",
            margin: 0,
            padding: "0px 4px 0px 4px",
            lineHeight: "45px",
          }}
        >
          {team.score}
        </p>
      )}
    </div>
    <div style={{ display: "flex", justifyContent: "space-evenly" }}>
      <button
        className="score green"
        onClick={() => {
          updateScore(team.id, score);
          playYippeeSound();
        }}
      >
        +
      </button>
      <button
        className="score red"
        onClick={() => {
          updateScore(team.id, score * -1);
          playWTSSound();
        }}
      >
        -
      </button>
    </div>
  </div>
);

export const TeamScoresFooter = () => {
  const { teams, updateScore } = useTeams();
  const { currentBoy } = useBoys();

  const [showScores, setShowScores] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      {teams.map((team) => (
        <TeamMenu
          key={team.id}
          team={team}
          updateScore={updateScore}
          score={currentBoy.pointValue}
          showScores={showScores}
          setShowScores={setShowScores}
        />
      ))}
    </div>
  );
};
