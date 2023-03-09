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
        const username = auth.currentUser.email.substring(0, auth.currentUser.email.lastIndexOf("@"))
        addUserToDB(auth.currentUser.uid, auth.currentUser.email, username,auth.currentUser.displayName, "" , "");
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
    if(moreInfo.isNewUser){
      const username = auth.currentUser.email.substring(0, auth.currentUser.email.lastIndexOf("@"))
      addUserToDB( auth.currentUser.uid , auth.currentUser.email , username,
                  auth.currentUser.displayName , moreInfo.profile.birthday,moreInfo.profile.gender)
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
    sendEmailVerification(auth.currentUser);
    alert('Please verify your email to add other users!')
    addUserToDB(auth.currentUser.uid , email, username, fullName, birthDate, gender);
  })
  .catch((error) => {
    console.log(error)
    return;
  });
  
}

export async function SignInWithEmail(username, password){
  const getEmail = query(collection(db , 'users'), where('Username' , '==' , username));
  const exucuteQuery = await getDocs(getEmail);
  const email = exucuteQuery.docs[0].data().Email
  signInWithEmailAndPassword(auth, email, password)
  .then((result) => {
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
}

async function addUserToDB(UID,email , username , fullName , birthDate , gender){
  setDoc(doc(db, "users", UID), {
    Email: email,
    Username: username,
    Name: fullName,
    BirthDate: birthDate,
    Gender: gender
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