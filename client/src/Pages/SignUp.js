import React from 'react';
import { useNavigate } from 'react-router-dom';
import appicon from '../Assets/Images/appicon.png';
import facebook from '../Assets/Images/facebook.png';
import google from '../Assets/Images/google.png';
import '../Assets/Styles/SignUp.css';
import '../Assets/Styles/SignPages.css';
import useInput from '../Helper/useInput';

function SignUp() {
  const navigate = useNavigate()
  const [username , usernameInput] = useInput({type: 'text' ,placeholder: 'Username' , className: 'SignUpDataInput'});
  const [firstName , firstNameInput] = useInput({type: 'text' ,placeholder: 'First Name' , className: 'SignUpDataInput'});
  const [middleName , middleNameInput] = useInput({type: 'text' ,placeholder: 'Middle Name (optional)' , className: 'SignUpDataInput'});
  const [lastName , lastNameInput] = useInput({type: 'text' ,placeholder: 'Last Name' , className: 'SignUpDataInput'});
  const [birthDate , birthDateInput] = useInput({type: 'date'  , className: 'SignUpDataInput'});
  const [email , emailInput] = useInput({type: 'text' ,placeholder: 'Email' , className: 'SignUpDataInput'});
  const [password , passwordInput] = useInput({type: 'password' ,placeholder: 'Password' , className: 'SignUpDataInput'});
  let emailMatching = false;
  let passwordMatching = false;
  let Gender = "none"
  return (
    <div>
        <div className="wrapper">
          <div className="elementContener">
            <div className="app">
              <img src={appicon} />
              <p>App Name</p>
            </div>
            <div className="title">
              <p>Sign Up</p>
              <p className="signIn">Alreadly have an account? <a onClick={() => navigate('/SignIn')} style= {{cursor:'pointer'}}>Sign in</a></p>
            </div>
            <div className="signUpdata">
              <div className="Sections">
                <div className="signUpElemnets">
                  {usernameInput}
                </div>
                <div className="signUpElemnets">
                  {firstNameInput}
                </div>
                <div className="signUpElemnets">
                  {middleNameInput}
                </div> 
                <div className="signUpElemnets">
                  {lastNameInput}
                </div>
                <div className="signUpElemnets">
                  {birthDateInput}
                </div>
              </div>
              <div className="Sections">
                <div className="signUpElemnets">
                  {emailInput}
                </div>
                <div className="signUpElemnets">
                  <input type="email" className="SignUpDataInput" placeholder="Re-enter E-mail" onBlur={e => {if(e.target.value == email) emailMatching = true ; else emailMatching = false}} />
                </div>
                <div className="signUpElemnets">
                  {passwordInput}
                </div>
                <div className="signUpElemnets">
                  <input type="password" className="SignUpDataInput" placeholder="Re-enter Password" onBlur={e => {if(e.target.value == password) passwordMatching = true ; else passwordMatching = false}}/>
                </div>
                <div className="sex signUpElemnets">
                  <p>Sex</p>
                  <input type="radio" className="SignUpDataInput" id="female" name="sexoptions" onChange={() => Gender = "Female"} />Female
                  <input type="radio" className="SignUpDataInput" id="male" name="sexoptions" onChange={() => Gender = "Male" }/>Male
                  
                </div>
              </div>
            </div>
            <div className="SignupBtns signUpElemnets">
              <button className="SignUpBtn">Sign Up</button>
            </div>
            <div className="outsideSignUp">
              <div className="line" />
              <div className="outsideSignUpBtns">
                <p className="signUpTitle">Sign Up with</p>
                <button className="googleBtn"><img className="siteIcon" src={google} /><span className="siteName">Google</span></button>
                <button className="fbBtn"><img className="siteIcon" src={facebook} /><span className="siteName">Facebook</span></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

export default SignUp;
