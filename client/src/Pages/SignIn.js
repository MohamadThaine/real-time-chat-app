import React from 'react';
import { useNavigate } from 'react-router-dom';
import appicon from '../Assets/Images/appicon.png';
import facebook from '../Assets/Images/facebook.png';
import google from '../Assets/Images/google.png';
import loginImage from '../Assets/Images/imagelogin.svg';
import '../Assets/Styles/SignIn.css';
import '../Assets/Styles/SignPages.css';
import { CheckAuth, WithFacebook, WithGoogle } from '../Helper/AccountsManagemnt';
import useInput from '../Helper/useInput';

function SignIn() {
  const navigate = useNavigate();
  CheckAuth();
  const [username , usernameInput] = useInput({type: 'text' ,placeholder: 'Username' , className: 'SignInDataInput'});
  const [password , passwordInput] = useInput({type: 'password' ,placeholder: 'Password' , className: 'SignInDataInput'});
  return (
       <div className="wrapper">
            <div className="elementContener">
                <div className="app">
                    <img src={appicon} alt="appIcon" />
                    <p>App Name</p>
                </div>
                <div className="loginData">
                    <p>Sign in</p>
                    <p className="signUp">Dont have an account?<a onClick={() => navigate('/SignUp')} style= {{cursor:'pointer'}}> Sign up now!</a></p>
                    <div className="username loginElemnets">
                        <p>Username</p>
                        {usernameInput}
                        <div className="borderBtm"></div>
                    </div>
                    <div className="password loginElemnets">
                        <p>Password</p>
                        {passwordInput}
                        <div className="borderBtm"></div>
                    </div>
                    <div className="loginBtns loginElemnets">
                        <button className="loginBtn">Sign in</button>
                    </div>
                    <div className="outsidesingin">
                        <p><span>or sign in with</span></p>
                        <div className="outsideSingInBtns">
                            <button className="googleBtn" onClick={WithGoogle}><img  className="siteIcon"src={google} alt="google" /><span className="siteName">Google</span></button>
                            <button className="fbBtn" onClick={WithFacebook}><img className="siteIcon" src={facebook} alt="facebook" /><span className="siteName">Facebook</span></button>
                        </div>
                    </div>
                </div>
                <img src={loginImage} className="loginImg"/>    
             </div>
       </div>
  );
}

export default SignIn;
