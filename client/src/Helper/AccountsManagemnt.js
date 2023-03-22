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
          doc,
          getDoc} from "firebase/firestore";
import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import { useNavigate   } from 'react-router-dom';
import { useEffect } from 'react';
import { unstable_batchedUpdates } from 'react-dom';
import defultUserPic from "../Assets/Images/user.png"

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
export const db = getFirestore(app)
export const auth = getAuth(app);
const storage = getStorage(app);

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

export async function SignUpWithEmail(email , password, username , fullName , birthDate , gender, setSignUpError, setRegisterLoading){
  const checkExistingUsers = query(collection(db , 'users'), where('Username' , '==' , username));
  const exucuteQuery = await getDocs(checkExistingUsers);
  try{
    const username = exucuteQuery.docs[0].data().Username;
    setSignUpError('Account alreadly exist with this username')
    setRegisterLoading(false);
    return;
  }catch(error){
    //Do nothing as this uername not used before;
  }
  
  await createUserWithEmailAndPassword(auth, email, password)
  .then(() => {
    sendEmailVerification(auth.currentUser);
    addUserToDB(auth.currentUser.uid , email, username, fullName, birthDate, gender);
  })
  .catch(() => {
    setSignUpError('Account alreadly exist with this email!')
    setRegisterLoading(false);
    return;
  });
  
}

export async function SignInWithEmail(username, password , setLoginStatus, setLoginLoading){
  setLoginLoading(true);
  const getEmail = query(collection(db , 'users'), where('Username' , '==' , username));
  const exucuteQuery = await getDocs(getEmail);
  var email;
  try{
    email = exucuteQuery.docs[0].data().Email
  }catch(error){
    setLoginStatus('Wrong Username');
    setLoginLoading(false);
    return;
  }
  
  signInWithEmailAndPassword(auth, email, password)
  .catch(() => {
    setLoginStatus('Wrong Password');
    setLoginLoading(false);
  });
  
}

async function addUserToDB(UID,email , username , fullName , birthDate , gender){
  setDoc(doc(db, "users", UID), {
    Email: email,
    Username: username,
    Name: fullName,
    BirthDate: birthDate,
    Gender: gender,
    UsernameSmallLetters: username.toLowerCase()
  });
}

export async function getCurrentUserInfo(setUsername, setEmail, setFullName, setGender, setBirthDate, setIsLoading){
  const getInfo = await getDoc(doc(db, 'users',auth.currentUser.uid));
  setUsername(getInfo.data().Username);
  setEmail(auth.currentUser.email);
  setFullName(getInfo.data().Name);
  setGender(getInfo.data().Gender);
  setBirthDate(getInfo.data().BirthDate);
  setIsLoading(false);
}

export async function getUserData(uid, setChatList, IsAccepted, setRequestsList, requestid){
  var username = '';
  const getInfo = await getDoc(doc(db, 'users',uid));
  if(getInfo.exists){
    username = getInfo.data().Username;
    const fullName = getInfo.data().Name;
    const picRef = ref(storage, 'usersPics/' + uid + '.png');
    var picture;
    try{
      picture = await getDownloadURL(picRef);
    }catch(error){
      picture = defultUserPic;
    }
    if(IsAccepted){
      setChatList(prevChat => {
        return [...prevChat, {ID: uid, personImg: picture, personName: fullName, lastMessage: 'Hi', time: '8:00PM'}]
    })}
   else{
      setRequestsList(prevRequest => {
        return [...prevRequest, {ID: uid, personImg: picture, username: username, requestID: requestid}]
      })
   }
  }
  return username;
}

export function SignOut(){
  auth.signOut();
} 

export function CheckAuth(path, setCurrentUser, setIsLoading){
  const navigate = useNavigate();
  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
        unstable_batchedUpdates(() => {
          if(setIsLoading != null)
          {
            setIsLoading(false)
          }
          if (user) {
            setCurrentUser(user);
            navigate('/')
          } else {
              setCurrentUser(null)
              navigate(path)
          }
        })
      });
  }, [])
}


export default null