import { TeamsProvider } from "./contexts/TeamsContext.jsx";
import { ScreenProvider } from "./contexts/ScreensContext.jsx";
import { Screen } from "./components/Screen.jsx";
import { BoysProvider } from "./contexts/BoysContext.jsx";
import { useEffect } from "react";

const ENV = "development";

function App() {
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (ENV === "development") return; // Don't show prompt in development
      event.preventDefault();
      event.returnValue = "Are you sure you want to leave?"; // Standard for modern browsers
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <div style={{ height: "100vh" }}>
      <ScreenProvider>
        <TeamsProvider>
          <BoysProvider>
            <Screen />
          </BoysProvider>
        </TeamsProvider>
      </ScreenProvider>
    </div>
  );
}

export default App;
