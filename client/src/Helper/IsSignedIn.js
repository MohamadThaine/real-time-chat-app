import React from 'react';
import SignIn from '../Pages/SignIn';
import ChatPage from '../Pages/ChatPage';

function IsSignedIn(props){
    const isLogedIn = props.isLogedIn;
    if(!isLogedIn){
        return <SignIn />
      }
      else{
        return <ChatPage />
      }
}

export default IsSignedIn;