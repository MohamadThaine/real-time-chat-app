import React, { useEffect } from 'react';
import SignIn from '../Pages/SignIn';
import ChatPage from '../Pages/ChatPage';
import {auth}  from './AccountsManagemnt';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from "firebase/auth";
function IsSignedIn(){
  const navigate = useNavigate();
  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
        if (user) {
          navigate('/')
        } else {
          navigate('/')
        }
      });
     
  }, [])
  if(auth.currentUser == null){
      return <SignIn />
    }
    else{
      return <ChatPage />
    }
}

export default IsSignedIn;