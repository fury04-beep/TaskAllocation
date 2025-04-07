import React, { useState } from "react";
import { Menu } from "./App";

export default function Teams() {
  const [team, setTeam] = useState("");
  const [manager, setManager] = useState("");
  const [menuVisible, setMenuVisible] = useState(true);

  const teams = ["DBS", "Audible", "ICB"];
  const managers = {
    DBS: ["ChinniKrishnan", "SugaPriya"],
    Audible: ["Saranya"],
    ICB: ["Priyadarshini"],
  };

  function handleTeamChange(e) {
    setTeam(e.target.value);
  }

  function handleManagerChange(e) {
    setManager(e.target.value);
    setMenuVisible(false);
  }

  return (
    <>
      {menuVisible && (
        <div className="select-team">
          <span className="teams">Teams</span>
          <select
            className="team-options"
            value={team}
            onChange={handleTeamChange}
          >
            <option value="">Select a Team</option>
            {teams.map((team, index) =>
              team === "DBS" ? (
                <option key={index} value={team}>
                  {team}
                </option>
              ) : (
                <option key={index} value={team} disabled>
                  {team}
                </option>
              )
            )}
          </select>

          <span className="managers">Managers</span>
          {!team ? (
            <select
              disabled
              className="manager-options"
              value={manager}
              onChange={handleManagerChange}
            >
              <option value="">Select a Manager</option>
            </select>
          ) : (
            <select
              className="manager-options"
              value={manager}
              onChange={handleManagerChange}
            >
              <option value="">Select a Manager</option>
              {managers[team].map((manager, index) =>
                manager === "ChinniKrishnan" ? (
                  <option key={index} value={manager}>
                    {manager}
                  </option>
                ) : (
                  <option key={index} value={manager} disabled>
                    {manager}
                  </option>
                )
              )}
            </select>
          )}
        </div>
      )}
      {menuVisible || (
        <Menu
          setMenuVisible={setMenuVisible}
          setTeam={setTeam}
          setManager={setManager}
        />
      )}
    </>
  );
}
