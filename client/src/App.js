import React from 'react';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import IsSignedIn from './Helper/IsSignedIn'
import { Routes, Route } from 'react-router-dom';
import PageNotFound from './Pages/PageNotFound';

function App(props) {
  return(
    <>
    <Routes>
      <Route path="/" element={<IsSignedIn isLogedIn ={true}  />} />
      <Route path="SignIn" element={<SignIn />} />
      <Route path="SignUp" element={<SignUp />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
    </>
  )
}

export default App;
