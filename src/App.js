import { useState } from "react";
import "./App.scss";
import MainPage from "./pages/MainPage";
import { Context } from "./context/index";

function App() {
  const [tooltipText, setTooltipText] = useState(
    "Прежде чем действовать, надо понять"
  );

  return (
    <Context.Provider value={{ tooltipText, setTooltipText }}>
      <div>
        <MainPage />
      </div>
    </Context.Provider>
  );
}

export default App;
