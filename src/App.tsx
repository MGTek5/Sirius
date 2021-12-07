import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import { useBooleanState, usePrevious } from "webrix/hooks";
import Footer from "./components/Footer";
import Header from "./components/Header";
import userContext from "./context/userContext";
import "./index.css";
import Router from "./Router";
import { app } from "./utils/appwrite";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { CREATE_PUSH_FUNCTION } from "./utils/constants";
import { Models } from "appwrite";

interface SyncManager {
  getTags(): Promise<string[]>;
  register(tag: string): Promise<void>;
}

declare global {
  interface ServiceWorkerRegistration {
    readonly sync: SyncManager;
  }

  interface SyncEvent extends ExtendableEvent {
    readonly lastChance: boolean;
    readonly tag: string;
  }

  interface ServiceWorkerGlobalScopeEventMap {
    sync: SyncEvent;
  }
}



function App() {
  const [user, setUser] = useState<Models.User<Models.Preferences>>();
  const [worker, setWorker] = useState<ServiceWorker>();
  const [newVersionAvailable, setNewVersionAvailable] = useState(false);
  const {
    value: online,
    setTrue: setOnline,
    setFalse: setOffline,
  } = useBooleanState(navigator.onLine);
  const oldOnline = usePrevious(online);

  const createNotificationSubscription = async () => {
    if (process.env.NODE_ENV === "development") {
      return;
    }
    const serviceWorker = await navigator.serviceWorker.ready;
    try {
      if (
        Notification.permission === "granted" ||
        Notification.permission === "denied"
      ) {
        return;
      }
      const data = await serviceWorker.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: process.env.REACT_APP_PUBLIC_VAPID,
      });
      app.functions.createExecution(CREATE_PUSH_FUNCTION, JSON.stringify({key: JSON.stringify(data.toJSON())}))
    } catch (e) {
      toast.error("Could not enable push notifications");
      console.error(e);
    }
  };

  const onServiceWorkerUpdate = (registration: ServiceWorkerRegistration) => {
    setWorker((registration && registration.waiting) ?? undefined);
    setNewVersionAvailable(true);
  };

  const updateServiceWorker = () => {
    worker?.postMessage({ type: "SKIP_WAITING" });
    setNewVersionAvailable(false);
    window.location.reload();
  };


  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      serviceWorkerRegistration.register({ onUpdate: onServiceWorkerUpdate });
      navigator.serviceWorker.ready.then((registration) => {
        registration.sync.register("syncUserPositions").then(() => {
          console.info("Background Sync for userPosition is enabled")
        })
      })
    }
  });

  useEffect(() => {
    app.account
      .get()
      .then((data) => {
        setUser(data);
        localStorage.setItem("sirius_user", JSON.stringify(data));
      })
      .catch(() => {
        if (!navigator.onLine && localStorage.getItem("sirius_user")) {
          setUser(JSON.parse(localStorage.getItem("sirius_user") ?? ""));
        } else {
          localStorage.removeItem("sirius_user");
          setUser(undefined);
        }
      });
  }, []);

  useEffect(() => {
    window.addEventListener("online", setOnline);
    window.addEventListener("offline", setOffline);

    return () => {
      window.removeEventListener("offline", setOffline);
      window.removeEventListener("online", setOnline);
    };
  }, [setOffline, setOnline]);

  useEffect(() => {
    if (online !== oldOnline) {
      if (online) {
        toast.success("You're back online! We'll patch you back in");
      } else {
        toast.error(
          "You appear to be offline, some functionalities might not work"
        );
      }
    }
  }, [online, oldOnline]);

  return (
    <div className={`h-screen w-screen flex flex-col`}>
      <userContext.Provider
        value={{
          user,
          setUser: (u) => setUser(u),
          askForPermission: createNotificationSubscription,
          logout: () => {
            app.account.deleteSessions();
            setUser(undefined);
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
          <main>
            <Router />
          </main>
          <Footer />
        </BrowserRouter>
      </userContext.Provider>
    </div>
  );
}

export default App;
