import { getStorage, ref , uploadBytes  } from "firebase/storage";
import { app , auth } from "./AccountsManagemnt";
function ChangeProfilePicture(Picture){
    const storage = getStorage(app);
    const imgExtenstion = Picture.name.substr(Picture.name.length - 4);
    const picRef = ref(storage, 'usersPics/' + auth.currentUser.uid + imgExtenstion);
    uploadBytes(picRef, Picture).then((snapshot) => {
        alert('img uploaded!');
      }).catch((error) => {
        alert(error)
      });
}

export default ChangeProfilePicture;