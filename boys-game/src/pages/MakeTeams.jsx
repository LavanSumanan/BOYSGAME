import { useState } from "react";
import { useTeams } from "../contexts/TeamsContext";
import { useScreens } from "../contexts/ScreensContext";
import { SCREEN_NAMES } from "../constants/screenNames";
import { TEAM_ICONS } from "../constants/iconNames";

export const MakeTeams = () => {
  const { setScreen } = useScreens();
  const { teams, addTeams } = useTeams();

  /* teamFormState
  id: string
  name: string
  icon: string
  */

  const [teamFormState, setTeamFormState] = useState(
    teams.map((team) => ({
      id: team.id,
      name: team.name,
      icon: team.icon,
    }))
  );
  const [currentTeamId, setCurrentTeamId] = useState(teams.length);

  const generateId = () => {
    let newId = "" + currentTeamId;
    setCurrentTeamId((prev) => prev + 1);
    return newId;
  };

  const icons = Object.values(TEAM_ICONS);
  const availableIcons = Object.values(TEAM_ICONS).filter(
    (icon) => !teamFormState.some((team) => team.icon === icon)
  );

  const createTeamForm = () => {
    setTeamFormState([
      ...teamFormState,
      { id: generateId(), name: "", icon: availableIcons[0] },
    ]);
  };

  const removeTeamForm = (id) => {
    setTeamFormState([...teamFormState.filter((team) => team.id !== id)]);
  };

  const updateField = (id, field, value) => {
    setTeamFormState([
      ...teamFormState.map((team) => {
        if (team.id === id) {
          return { ...team, [field]: value };
        } else {
          return team;
        }
      }),
    ]);
  };

  const updateTeamName = (id, name) => {
    updateField(id, "name", name);
  };

  const updateTeamIcon = (id, icon) => {
    updateField(id, "icon", icon);
  };

  const submitTeams = () => {
    try {
      addTeams(teamFormState);
    } catch (error) {
      console.error(error);
      setScreen(SCREEN_NAMES.ERROR);
    }
    setScreen(SCREEN_NAMES.READY);
  };

  return (
    <>
      <h1>Make Teams</h1>
      {teamFormState.map((team) => (
        <div key={team.id}>
          <label htmlFor={`teamName${team.id}`}>Team Name:</label>
          <input
            placeholder="Team Name"
            required
            type="text"
            id={`teamName${team.id}`}
            value={team.name}
            onChange={(e) => updateTeamName(team.id, e.target.value)}
          />
          <label htmlFor={`teamIcon${team.id}`}>Team Icon:</label>
          <select
            id={`teamIcon${team.id}`}
            value={team.icon}
            onChange={(e) => updateTeamIcon(team.id, e.target.value)}
            required
          >
            {icons.map((icon) => (
              <option
                key={icon}
                value={icon}
                disabled={!availableIcons.includes(icon)}
              >
                {icon} {/* TODO: replace with icon component */}
              </option>
            ))}
          </select>
          <button onClick={() => removeTeamForm(team.id)}>❌</button>
        </div>
      ))}
      <button onClick={createTeamForm}>➕</button>
      <button onClick={submitTeams}>Make Teams!</button>
    </>
  );
};
