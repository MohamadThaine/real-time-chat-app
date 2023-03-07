import { initializeApp } from 'firebase/app';
import { getAuth, 
        signInWithPopup, 
        GoogleAuthProvider, 
        FacebookAuthProvider, 
        createUserWithEmailAndPassword, 
        sendEmailVerification,
        signInWithEmailAndPassword,
        onAuthStateChanged,
        getAdditionalUserInfo } from 'firebase/auth';
import {  getFirestore,
          query,
          getDocs,
          collection,
          where,
          setDoc,
          doc} from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import SignIn from '../Pages/SignIn';
import ChatPage from '../Pages/ChatPage';
import { useEffect } from 'react';

const firebaseConfig = {
    apiKey: process.env.React_APP_Firebase_API_KEY,
    authDomain: process.env.React_APP_Firebase_AuthDomain,
    projectId: process.env.React_APP_Firebase_ProjectId,
    storageBucket: process.env.React_APP_Firebase_StorageBucket,
    messagingSenderId: process.env.React_APP_Firebase_MessagingSenderId,
    appId: process.env.React_APP_Firebase_AppId,
    measurementId: process.env.React_APP_Firebase_MeasurementId
  };

export const app = initializeApp(firebaseConfig);
const googleProvider = new GoogleAuthProvider();
const FacebookProvider = new FacebookAuthProvider();
const db = getFirestore(app)
export const auth = getAuth(app);



export async function WithGoogle(){
    await signInWithPopup(auth, googleProvider)
    .then((result) => {
      const moreInfo = getAdditionalUserInfo(result);
      if(moreInfo.isNewUser){
        setDoc(doc(db, "users", auth.currentUser.uid), {
          Email: auth.currentUser.email,
          Username: auth.currentUser.email.substring(0, auth.currentUser.email.lastIndexOf("@")),
          Name: auth.currentUser.displayName,
          BirthDate: "",//Will do a function later to read them or add them
          Gender: ""
        });
      }
    }).catch((error) => {
      console.log(error)
    });
}

export async function WithFacebook(){
  FacebookProvider.addScope('user_birthday')
  FacebookProvider.addScope('user_gender')
  await signInWithPopup(auth, FacebookProvider)
  .then((result) => {
    const moreInfo = getAdditionalUserInfo(result)
    console.log(moreInfo)
    if(moreInfo.isNewUser){
      setDoc(doc(db, "users", auth.currentUser.uid), {
        Email: auth.currentUser.email,
        Username: auth.currentUser.email.substring(0, auth.currentUser.email.lastIndexOf("@")),
        Name: auth.currentUser.displayName,
        BirthDate: moreInfo.profile.birthday,
        Gender: moreInfo.profile.gender
      });
  }
  else{
    //Do fetch chat fucntion (not working on it yet)
  }
  })
  .catch((error) => {
    console.log(error)
  });
}

export async function SignUpWithEmail(email , password, username , fullName , birthDate , gender){
  await createUserWithEmailAndPassword(auth, email, password)
  .then(() => {
    sendEmailVerification(auth.currentUser)
    setDoc(doc(db, "users", auth.currentUser.uid), {
      Email: email,
      Username: username,
      Name: fullName,
      BirthDate: birthDate,
      Gender: gender
    });
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    return;
  });
  
}

export async function SignInWithEmail(email, password, username){
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
}

export async function SignOut(){
  auth.signOut();
}

export function CheckAuth(path){
  const navigate = useNavigate();
  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
        if (user) {
          navigate('/')
        } else {
          navigate(path)
        }
      });
     
  }, [])
}

export default null