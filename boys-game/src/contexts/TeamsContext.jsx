import { createContext, useState, useContext } from "react";

/* Team
id: string
iconId: string
name: string
score: int
*/

const TeamsContext = createContext();

const generateId = () => {
  return Math.random().toString(36).substring(7);
};

export const TeamsProvider = ({ children }) => {
  const [teams, setTeams] = useState([]);

  const addTeam = (name, iconId) => {
    setTeams([...teams, { id: generateId(), iconId, name, score: 0 }]);
  };

  const removeTeam = (id) => {
    setTeams([...teams.filter((team) => team.id !== id)]);
  };

  const updateScore = (teamId, scoreUpdate) => {
    console.log(teamId, scoreUpdate);
    setTeams([
      ...teams.map((team) => {
        if (team.id === teamId) {
          return { ...team, score: Number(team.score) + Number(scoreUpdate) };
        }
        return team;
      }),
    ]);
  };

  return (
    <TeamsContext.Provider value={{ teams, addTeam, removeTeam, updateScore }}>
      {children}
    </TeamsContext.Provider>
  );
};

export const useTeams = () => {
  return useContext(TeamsContext);
};
