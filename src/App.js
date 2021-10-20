import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import themeContext from "./context/themeContext";
import userContext from "./context/userContext";
import "./index.css";
import Router from "./Router";
import { auth } from "./utils/firebase";

function App() {
  const [user, setUser] = useState();
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    auth.onAuthStateChanged((change) => {
      setUser(change);
    });
  });

  return (
    <div
      className={`dark:text-white h-screen w-screen flex flex-col ${
        theme === "dark" && "dark"
      }`}
    >
      <userContext.Provider
        value={{
          user,
          setUser: (u) => setUser(u),
          logout: () => auth.signOut(),
        }}
      >
        <themeContext.Provider
          value={{
            theme,
            changeTheme: () => {
              setTheme(theme === "dark" ? "light" : "dark");
            },
          }}
        >
          <BrowserRouter>
            <Router />
          </BrowserRouter>
          <footer>
            <div className="bg-gray-400">footer</div>
          </footer>
        </themeContext.Provider>
      </userContext.Provider>
    </div>
  );
}

export default App;
