import { getStorage, ref , uploadBytes  } from "firebase/storage";
import { app , auth } from "./AccountsManagemnt";
function ChangeProfilePicture(Picture , setUploadStatus){
    const storage = getStorage(app);
    const picRef = ref(storage, 'usersPics/' + auth.currentUser.uid + '.png');
    uploadBytes(picRef, Picture).then(() => {
        setUploadStatus('')
      }).catch((error) => {
        setUploadStatus("Error while uploading the picture to the server");
      });
}

export default ChangeProfilePicture;