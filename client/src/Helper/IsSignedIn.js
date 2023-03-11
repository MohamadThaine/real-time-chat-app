import React, { useState } from 'react';
import SignIn from '../Pages/SignIn';
import ChatPage from '../Pages/ChatPage';
import {auth, CheckAuth}  from './AccountsManagemnt';
import Loading from '../Components/Loading';

function IsSignedIn(){
  const [isLoading , setIsLoading] = useState(true);
  const [currentUser , setCurrentUser] = useState(auth.currentUser);
  CheckAuth('/', setCurrentUser , setIsLoading);
  return (
    <div>
        { currentUser && <ChatPage />}
        {!currentUser && <SignIn />}
        { isLoading && <Loading />}
    </div>
  )
}

export default IsSignedIn;