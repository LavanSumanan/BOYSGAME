import { TeamsProvider } from "./contexts/TeamsContext.jsx";
import { ScreenProvider } from "./contexts/ScreensContext.jsx";
import { Screen } from "./components/Screen.jsx";
import { BoysProvider } from "./contexts/BoysContext.jsx";

function App() {
  return (
    <ScreenProvider>
      <TeamsProvider>
        <BoysProvider>
          <h1>BOYS UP CLOSE</h1> {/* TODO: remove */}
          <Screen />
        </BoysProvider>
      </TeamsProvider>
    </ScreenProvider>
  );
}

export default App;
