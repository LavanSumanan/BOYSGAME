import { useTeams } from "../contexts/TeamsContext";
import { useState } from "react";

export const MakeTeams = () => {
  const { teams, addTeam, removeTeam, updateScore } = useTeams();

  const [scoreInput, setScoreInput] = useState(0);
  const [idInput, setIdInput] = useState(teams[0]?.id);
  const x = teams.length + 1;

  console.log(idInput);

  return (
    <>
      <h1>Make Teams</h1>
      <button
        onClick={() => {
          addTeam(`Team ${x}`, `icon${x}`);
        }}
      >
        Add Team
      </button>
      <button onClick={() => removeTeam(teams[0].id)}>Remove Team</button>
      <label htmlFor="teams">Team to update:</label>
      <select
        name="teams"
        id="teams"
        onChange={(e) => setIdInput(e.target.value)}
      >
        {teams.map((team) => (
          <option key={team.id} value={team.id}>
            {team.name}
          </option>
        ))}
      </select>
      <label htmlFor="name">Score update:</label>
      <input
        name="score"
        type="number"
        value={scoreInput}
        onChange={(e) => setScoreInput(e.target.value)}
      />
      <button onClick={() => updateScore(idInput, scoreInput)}>
        Update Score
      </button>
      {teams.map((team) => (
        <div key={team.id}>
          <p>Name: {team.name}</p>
          <p>Id: {team.id}</p>
          <p>Score: {team.score}</p>
        </div>
      ))}
    </>
  );
};
