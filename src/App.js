import React, {useEffect, useState} from 'react';
import toast, {Toaster} from 'react-hot-toast';
import {BrowserRouter} from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import userContext from './context/userContext';
import './index.css';
import Router from './Router';
import {app} from './utils/appwrite';

function App () {
  const [user, setUser] = useState ();
  useEffect (() => {
    app.account
      .get ()
      .then (data => {
        setUser (data);
      })
      .catch (() => {
        setUser (null);
      });
  }, []);

  return (
    <div className={`h-screen w-screen flex flex-col`}>
      <userContext.Provider
        value={{
          user,
          setUser: u => setUser (u),
          logout: () => {
            app.account.deleteSessions ();
            setUser (null);
            toast.success ('Succesfully logged out');
          },
        }}
      >

          <Toaster />
          <BrowserRouter>
            <Header />
            <Router />
            <Footer />
          </BrowserRouter>
      </userContext.Provider>
    </div>
  );
}

export default App;
