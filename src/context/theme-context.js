import React, { useState } from "react";

const ThemeContext = React.createContext({
  isDarkTheme: false,
  toggleDarkTheme: () => {},
  lang: "en",
  switchLanguage: () => {},
});

const ThemeContextProvider = (props) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [lang, SetLang] = useState("en");

  const toggleDarkTheme = () => {
    setIsDarkTheme((prevState) => !prevState);
  };

  const switchLanguage = () => {
    lang === "en" ? SetLang("bg") : SetLang("en");
  };

  return (
    <ThemeContext.Provider
      value={{ isDarkTheme, toggleDarkTheme, lang, switchLanguage }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
};

export { ThemeContextProvider };
export default ThemeContext;
