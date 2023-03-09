import { getStorage, ref , uploadBytes  } from "firebase/storage";
import { app , auth } from "./AccountsManagemnt";
function ChangeProfilePicture(Picture){
    const storage = getStorage(app);
    const picRef = ref(storage, 'usersPics/' + auth.currentUser.uid + '.png');
    uploadBytes(picRef, Picture).then((snapshot) => {
        alert('img uploaded!');
      }).catch((error) => {
        alert(error)
      });
}

export default ChangeProfilePicture;