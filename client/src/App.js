import React, { useEffect } from 'react';
import SignUp from './Pages/SignUp';
import IsSignedIn from './Helper/IsSignedIn'
import { Routes, Route } from 'react-router-dom';
import PageNotFound from './Pages/PageNotFound';

function App() {
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
