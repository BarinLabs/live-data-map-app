import React, { useState } from "react";

const LangContext = React.createContext({
  lang: "en",
  switchLanguage: () => {},
});

const LangContextProvider = (props) => {
  const [lang, SetLang] = useState("en");

  const switchLanguage = () => {
    lang === "en" ? SetLang("bg") : SetLang("en");
  };

  return (
    <LangContext.Provider value={{ lang, switchLanguage }}>
      {props.children}
    </LangContext.Provider>
  );
};

export { LangContextProvider };
export default LangContext;
