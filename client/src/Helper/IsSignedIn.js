import React from 'react';
import SignIn from '../Pages/SignIn';
import ChatPage from '../Pages/ChatPage';
import {auth, CheckAuth}  from './AccountsManagemnt';
function IsSignedIn(){
 CheckAuth('/');
  if(auth.currentUser == null){
      return <SignIn />
    }
    else{
      return <ChatPage />
    }
}

export default IsSignedIn;