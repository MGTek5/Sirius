import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import themeContext from "./context/themeContext";
import userContext from "./context/userContext";
import "./index.css";
import Router from "./Router";
import { app } from "./utils/appwrite";

function App() {
  const [user, setUser] = useState();
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    app.account.get().then((data) => {
      setUser(data)
    }).catch(() => {
      setUser(null)
    })
  }, []);

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
          logout: () => {
            app.account.deleteSessions()
            setUser(null)
            toast.success("Succesfully logged out")
            },
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
          <Toaster />
          <Header />
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
