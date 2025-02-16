import { TeamsProvider } from "./contexts/TeamsContext.jsx";
import { ScreenProvider } from "./contexts/ScreensContext.jsx";
import { Screen } from "./components/Screen.jsx";

function App() {
  return (
    <TeamsProvider>
      <ScreenProvider>
        <h1>BOYS UP CLOSE</h1> {/* TODO: remove */}
        <Screen />
      </ScreenProvider>
    </TeamsProvider>
  );
}

export default App;
