import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import userContext from "./context/userContext";
import "./index.css";
import Router from "./Router";
import { app } from "./utils/appwrite";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

function App() {
  const [user, setUser] = useState();
  const [worker, setWorker] = useState();
  const [newVersionAvailable, setNewVersionAvailable] = useState(false);

  const createNotificationSubscription = async () => {
    const serviceWorker = await navigator.serviceWorker.ready;
    try {
      const data = await serviceWorker.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: process.env.REACT_APP_PUBLIC_VAPID,
      });
      app.functions.createExecution("61812d0e7688e", JSON.stringify(data));
      console.log(data);
    } catch (e) {
      toast.error("Could not enable push notifications");
      console.error(e);
    }
  };

  const onServiceWorkerUpdate = (registration) => {
    setWorker(registration && registration.waiting);
    setNewVersionAvailable(true);
  };

  const updateServiceWorker = () => {
    worker && worker.postMessage({ type: "SKIP_WAITING" });
    setNewVersionAvailable(false);
    window.location.reload();
  };

  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      serviceWorkerRegistration.register({ onUpdate: onServiceWorkerUpdate });
    }
  });

  useEffect(() => {
    app.account
      .get()
      .then((data) => {
        setUser(data);
      })
      .catch(() => {
        setUser(null);
      });
  }, []);

  useEffect(() => {
    if (user && user["$id"] && process.env.NODE_ENV === "production") {
      createNotificationSubscription();
    }
  }, [user]);

  return (
    <div className={`h-screen w-screen flex flex-col`}>
      <userContext.Provider
        value={{
          user,
          setUser: (u) => setUser(u),
          logout: () => {
            app.account.deleteSessions();
            setUser(null);
            toast.success("Succesfully logged out");
          },
        }}
      >
        <Toaster />
        <BrowserRouter>
          <Header />
          {newVersionAvailable && (
            <div className="alert alert-info">
              <div className="flex-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="w-6 h-6 mx-2 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <label>A new version of this application is available.</label>
              </div>
              <button className="btn btn-primary" onClick={updateServiceWorker}>
                Reload
              </button>
            </div>
          )}
          <Router />
          <Footer />
        </BrowserRouter>
      </userContext.Provider>
    </div>
  );
}

export default App;
