import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import appicon from '../Assets/Images/appicon.png';
import facebook from '../Assets/Images/facebook.png';
import google from '../Assets/Images/google.png';
import '../Assets/Styles/SignUp.css';
import '../Assets/Styles/SignPages.css';
import useInput from '../Helper/useInput';
import  {WithGoogle , WithFacebook , SignUpWithEmail, auth}  from '../Helper/AccountsManagemnt';
import { unstable_batchedUpdates } from 'react-dom';
import { onAuthStateChanged } from 'firebase/auth';
function SignUp() {
  const navigate = useNavigate();
  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
        unstable_batchedUpdates(() => {
          if (user) {
            navigate('/')
          } else {
              navigate('/SignUp');
          }
        })
      });
  }, [navigate])

  const noNumbers = (e) => {
    const keyPressed = e.which;
    if (keyPressed > 47 && keyPressed < 58) {
      e.preventDefault();
  }
}

  const [username , usernameInput] = useInput({type: 'text' ,placeholder: 'Username' , className: 'SignUpDataInput'});
  const [firstName , firstNameInput] = useInput({type: 'text' ,placeholder: 'First Name' , className: 'SignUpDataInput', onKeyDown:noNumbers});
  const [middleName , middleNameInput] = useInput({type: 'text' ,placeholder: 'Middle Name (optional)' , className: 'SignUpDataInput', onKeyDown:noNumbers});
  const [lastName , lastNameInput] = useInput({type: 'text' ,placeholder: 'Last Name' , className: 'SignUpDataInput', onKeyDown:noNumbers});
  const [birthDate , birthDateInput] = useInput({type: 'date'  , className: 'SignUpDataInput'});
  const [email , emailInput] = useInput({type: 'email' ,placeholder: 'Email' , className: 'SignUpDataInput'});
  const [password , passwordInput] = useInput({type: 'password' ,placeholder: 'Password' , className: 'SignUpDataInput'});
  const [signUpError, setSignUpError] = useState('');
  const [emailMatching, setEmailMatching] = useState(false);
  const [passwordMatching, setPasswordMatching] = useState(false);
  const [gender, setGender] = useState('none');
  const [registerLoading, setRegisterLoading] = useState(false)
  const getAge = birthDate => Math.floor((new Date() - new Date(birthDate).getTime()) / 3.15576e+10)

  function checkData(){
    setRegisterLoading(true);
    const validEmailRegex =  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(email === '' || firstName === '' || lastName === '' || birthDate === '' || email === '' || password === '' || gender === 'none'){
      setSignUpError('Dont leave any required field empty!');
      setRegisterLoading(false);
      return;
    }
    if(!emailMatching){
      setSignUpError('Email and re-enter email is not matching!');
      setRegisterLoading(false);
      return;
    }
    if(!passwordMatching){
      setSignUpError('Password and re-enter password is not matching!');
      setRegisterLoading(false);
      return;
    }
    if(!email.match(validEmailRegex)){
      setSignUpError('Email is not valid');
      setRegisterLoading(false);
      return;
    }
    if(getAge(birthDate) < 13){
      setSignUpError('You must be older than 13!');
      setRegisterLoading(false);
      return;
    }
    SignUpWithEmail(email , password , username , firstName + " " + middleName + " " + lastName , birthDate , gender, setSignUpError, setRegisterLoading);
  }

  onkeyup = (e) => {
    if(e.which === 13){
        checkData();
    }
  }



  return (
    <div>
        <div className="wrapper">
          <div className="elementContener signupContener">
            <div className="app">
              <img 
               src={appicon}
               alt='app icon' />
              <p>App Name</p>
            </div>
            <div className="title">
              <p>Sign Up</p>
              <p className="signIn">Alreadly have an account? <a onClick={() => navigate('/')} style= {{cursor:'pointer'}}>Sign in</a></p>
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
                  <input type="email" className="SignUpDataInput" placeholder="Re-enter E-mail" onBlur={e => {if(e.target.value === email) setEmailMatching(true) ; else setEmailMatching(false)}} />
                </div>
                <div className="signUpElemnets">
                  {passwordInput}
                </div>
                <div className="signUpElemnets">
                  <input type="password" className="SignUpDataInput" placeholder="Re-enter Password" onBlur={e => {if(e.target.value === password) setPasswordMatching(true) ; else setPasswordMatching(false)}}/>
                </div>
                <div className="sex signUpElemnets">
                  <p>Sex</p>
                  <input type="radio" className="SignUpDataInput" id="female" name="sexoptions" onChange={() => setGender("Female")} />Female
                  <input type="radio" className="SignUpDataInput" id="male" name="sexoptions" onChange={() => setGender("Male")}/>Male
                  
                </div>
              </div>
            </div>
            <div className="SignupBtns signUpElemnets">
              <p className='signupError'>{signUpError}</p>
              <button className="SignUpBtn" onClick={checkData} disabled={registerLoading}>Sign Up</button>
            </div>
            <div className="outsideSignUp">
              <div className="line" />
              <div className="outsideSignUpBtns">
                <p className="signUpTitle">Sign Up with</p>
                <button className="googleBtn" onClick={WithGoogle}><img className="siteIcon" src={google} alt='sign up with google' /><span className="siteName">Google</span></button>
                <button className="fbBtn" onClick={WithFacebook}><img className="siteIcon" src={facebook} alt='sign up with facebook' /><span className="siteName">Facebook</span></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  export default SignUp;
