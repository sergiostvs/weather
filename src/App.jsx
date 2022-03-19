import { useState } from "react";

import { ThemeProvider } from "styled-components";
import usePeristedState from "./utils/usePersistedState";

import { CurrentWeather } from "./components/CurrentWeather";

import { GlobalStyle } from "./styles/global";

import light from "./styles/themes/light";
import dark from "./styles/themes/dark";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [theme, setTheme] = usePeristedState("theme", light);

  const toggleTheme = () => {
    setTheme(theme.title === "light" ? dark : light);
  };

  const switchMode = () => {
    setDarkMode((prevState) => !prevState);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <CurrentWeather toggleTheme={toggleTheme} darkMode={darkMode}/>
        <GlobalStyle />
      </div>
    </ThemeProvider>
  );
}

export default App;
