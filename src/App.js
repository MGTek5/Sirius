import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import userContext from "./context/userContext";
import "./index.css";
import Router from "./Router";
import { auth } from "./utils/firebase";

function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    auth.onAuthStateChanged((change) => {
      setUser(change);
    });
  });

  return (
    <>
      <userContext.Provider
        value={{
          user,
          setUser: (u) => setUser(u),
          logout: () => auth.signOut(),
        }}
      >
        <BrowserRouter>
          <Router />
        </BrowserRouter>
        <footer>
          <div className="bg-gray-400">footer</div>
        </footer>
      </userContext.Provider>
    </>
  );
}

export default App;
