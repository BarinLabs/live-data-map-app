import React, { useState } from "react";

const ThemeContext = React.createContext({
  isDarkTheme: false,
  toggleDarkTheme: () => {},
});

const ThemeContextProvider = (props) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleDarkTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <ThemeContext.Provider value={{ isDarkTheme, toggleDarkTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export { ThemeContextProvider };
export default ThemeContext;
