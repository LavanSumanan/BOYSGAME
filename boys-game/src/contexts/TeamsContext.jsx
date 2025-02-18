import { createContext, useState, useContext } from "react";

/* Team
id: string
icon: string
name: string
score: int
*/

const TeamsContext = createContext();

export const TeamsProvider = ({ children }) => {
  const [teams, setTeams] = useState([]);

  const addTeams = (teams) => {
    setTeams(teams.map((team) => ({ ...team, score: 0 })));
  };

  const updateScore = (teamId, scoreUpdate) => {
    setTeams([
      ...teams.map((team) => {
        if (team.id === teamId) {
          return { ...team, score: Number(team.score) + Number(scoreUpdate) };
        }
        return team;
      }),
    ]);
  };

  const resetTeams = () => {
    setTeams([]);
  };

  return (
    <TeamsContext.Provider value={{ teams, addTeams, updateScore, resetTeams }}>
      {children}
    </TeamsContext.Provider>
  );
};

export const useTeams = () => {
  return useContext(TeamsContext);
};
