import React from 'react';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import IsSignedIn from './Helper/IsSignedIn'
import { Routes, Route } from 'react-router-dom';
import PageNotFound from './Pages/PageNotFound';
import { useState , useEffect } from 'react';

function App(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3001/CheckLoggedIn")
      .then((res) => res.json())
      .then((data) => setIsLoggedIn(data.iLoggedIn));
  }, []);
  return(
    <>
    <Routes>
      <Route path="/" element={<IsSignedIn/>} />
      <Route path="SignUp" element={<SignUp />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
    </>
  )
}

export default App;
