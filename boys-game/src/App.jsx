import { TeamsProvider } from "./contexts/TeamsContext.jsx";
import { ScreenProvider } from "./contexts/ScreensContext.jsx";
import { Screen } from "./components/Screen.jsx";
import { BoysProvider } from "./contexts/BoysContext.jsx";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = "Are you sure you want to leave?"; // Standard for modern browsers
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

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
