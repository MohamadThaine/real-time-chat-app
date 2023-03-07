import { initializeApp } from 'firebase/app';
import { getAuth, 
        signInWithPopup, 
        GoogleAuthProvider, 
        FacebookAuthProvider, 
        createUserWithEmailAndPassword, 
        sendEmailVerification,
        signInWithEmailAndPassword,
        onAuthStateChanged} from 'firebase/auth';
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
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
    });
}

export async function WithFacebook(){
  await signInWithPopup(auth, FacebookProvider)
  .then((result) => {
    const user = result.user;
    const credential = FacebookAuthProvider.credentialFromResult(result);
    const accessToken = credential.accessToken;
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.customData.email;
    const credential = FacebookAuthProvider.credentialFromError(error);
  });
}

export async function SignUpWithEmail(email , password, username , fullName , birthDate , gender){
  await createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    sendEmailVerification(auth.currentUser)
    setDoc(doc(db, "users", username), {
      Email: email,
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

export default null