import React from "react";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import Router from "./Router";

function App() {
  return (
    <>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
      <footer>
        <div className="bg-gray-400">footer</div>
      </footer>
    </>
  );
}

export default App;
