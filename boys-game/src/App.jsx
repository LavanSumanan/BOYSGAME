import { useState } from "react";
import { TeamsProvider } from "./contexts/TeamsContext.jsx";
import { MakeTeams } from "./pages/MakeTeams.jsx";

function App() {
  return (
    <TeamsProvider>
      <h1>BOYS UP CLOSE</h1>
      {/* <MakeTeams /> */}
      
    </TeamsProvider>
  );
}

export default App;
