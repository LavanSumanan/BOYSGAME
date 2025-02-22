import { useEffect, useState } from "react";
import { useTeams } from "../contexts/TeamsContext";
import { useScreens } from "../contexts/ScreensContext";
import { SCREEN_NAMES } from "../constants/screenNames";
import { TEAM_ICONS } from "../constants/iconNames";
import makeTeamsBg from "../assets/maketeamsbg.png";

import gleepSound from "../assets/sounds/kwethangleep.mp3";
import meowSound from "../assets/sounds/kevinmeow.m4a";
import jerrySound from "../assets/sounds/jerryahhh.mp3";
import trevorSound from "../assets/sounds/trevorrr.mp3";

const playMeowSound = () => {
  const audio = new Audio(meowSound);
  audio.play();
};

const playGleepSound = () => {
  const audio = new Audio(gleepSound);
  audio.play();
};

const playJerrySound = () => {
  const audio = new Audio(jerrySound);
  audio.play();
};

export const MakeTeams = () => {
  useEffect(() => {
    const audio = new Audio(trevorSound);
    audio.play();
  }, []);

  const { setScreen } = useScreens();
  const { teams, addTeams } = useTeams();

  /* teamFormState
  id: string
  name: string
  icon: string
  enabled: boolean
  */

  const [teamFormState, setTeamFormState] = useState(
    teams.map((team) => ({
      id: team.id,
      name: team.name,
      icon: team.icon,
      enabled: false,
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
      { id: generateId(), name: "", icon: availableIcons[0], enabled: true },
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
    console.log("updating team", id, "icon to", icon);
    updateField(id, "icon", icon);
  };

  // const updateTeamFormEnabled = (id, enabled) => {
  //   updateField(id, "enabled", enabled);
  // };

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
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundImage: `url(${makeTeamsBg})`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h1 className="title" style={{ marginTop: "20px" }}>
        make your teams!!!
      </h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          padding: "24px",
        }}
      >
        {teamFormState.map((team) => (
          <div
            key={team.id}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "16px",
              overflow: "scroll",
            }}
          >
            <div
              style={{
                width: "400px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <input
                style={{
                  background: "#0004FF",
                  color: "#B8C3CF",
                  border: "none",
                  font: "inherit",
                  padding: "10px 15px",
                  fontSize: "40px",
                }}
                autoFocus
                placeholder="Team Name"
                required
                type="text"
                id={`teamName${team.id}`}
                value={team.name}
                disabled={!team.enabled}
                onChange={(e) => updateTeamName(team.id, e.target.value)}
              />
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "50% 50%",
                  gridRow: "auto auto",
                }}
              >
                {icons.map((icon) => (
                  <div key={icon} style={{ width: "100%", height: "100%" }}>
                    <label>
                      <input
                        style={{
                          position: "absolute",
                          opacity: 0,
                          width: 0,
                          height: 0,
                        }}
                        type="radio"
                        name="icon"
                        value={icon}
                        disabled={
                          !team.enabled || !availableIcons.includes(icon)
                        }
                        onClick={() => {
                          updateTeamIcon(team.id, icon);
                          playMeowSound();
                        }}
                      />
                      <img
                        style={{
                          filter: availableIcons.includes(icon)
                            ? "brightness(100%)"
                            : team.icon === icon
                            ? "invert(100%)"
                            : "brightness(70%)",
                        }}
                        width="100%"
                        height="100%"
                        src={icon}
                      />
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ width: "100%" }}>
              <button
                className="score"
                style={{ width: "50%" }}
                onClick={() => removeTeamForm(team.id)}
              >
                Delete ❌
              </button>
            </div>
          </div>
        ))}
      </div>
      <button
        className="score"
        style={{
          color: "white",
          background: "#0004FF",
          width: "50px",
          height: "50px",
          fontSize: "50px",
        }}
        onClick={() => {
          createTeamForm();
          playJerrySound();
        }}
        disabled={teamFormState.length > 3}
      >
        +
      </button>
      <button
        className="nav"
        style={{
          opacity: teamFormState.length > 1 ? "100%" : "0%",
          position: "relative",
          left: "40%",
          background: "#00FF33",
          color: "black",
          marginBottom: "20px",
        }}
        disabled={teamFormState.length < 2}
        onClick={() => {
          submitTeams();
          playGleepSound();
        }}
      >
        {"start ->"}
      </button>
    </div>
  );
};
