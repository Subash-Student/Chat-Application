import {Modal , Button, Alert} from 'rsuite';
import useModel from '../../misc/custom-hook';
import AvatarEditor from 'react-avatar-editor'
import { useState ,useRef} from 'react';
import { database, storage } from '../../misc/firebase';
import { useProfile } from '../../context/profile.context';
import ProfileAvatar from './ProfileAvatar';
import { getUserUpdates } from '../../misc/helper';

const AvatarAcceeptType = '.png, .jpeg, .jpg' ;
const acceptedFileType=['image/png','image/jpeg','image/pjpeg'];
const validFile = (file)=> acceptedFileType.includes(file.type);

const getBlop = (canvas)=>{
    return new Promise((resolve,reject)=>{
           canvas.toBlob(blob =>{
            if(blob){
                resolve(blob);
            }
            else{
                reject(new Error("Fail To Process The File"));
            }
           })

    })
};


const AvatarUpload = () => {

const AvatarRef = useRef()
const[img,setImg]=useState(null);
const {isOpen,open,close} =useModel();
const{profile}=useProfile();
const[isLoading,setIsLoading] = useState(false);

const onFileInputChange=(ev)=>{

    const currFile = ev.target.files;

    const file = currFile[0];

    if(validFile(file)){

       setImg(file);
        open();
    }else{
         Alert.warning("Invalid File Type");
    }


}

const onUploadAvatar =async()=>{
    const canvas = AvatarRef.current.getImageScaledToCanvas();

    setIsLoading(true);
    try {
       const  blob = await getBlop(canvas);

       const avatarFileRef = storage.ref(`/profile/${profile.uid}`).child('avatar');

       const uploadAvatarResult = await avatarFileRef.put(blob,{cacheControl:`public, max-age=${3600*24*3}`});

       const downloadUrl = await uploadAvatarResult.ref.getDownloadURL();
        
       const updates = await getUserUpdates(profile.uid,'avatar',downloadUrl,database);

           await database.ref().update(updates);

       Alert.success("Avatar Succesfully Updated");
        setIsLoading(false);
    } catch (error) {
        
        Alert.error(error.message);
        setIsLoading(false);
    }
}




  return (
    <div className="mt-3 text-center">

    <ProfileAvatar src={profile.avatar} name={profile.name} className='height-200 width-200 img-fullsize font-huge'/>
       
<div>
    <label htmlFor="Avatar" className="d-block cursor-pointer padded">
        Select An Avatar
        <input
        id="Avatar" 
        type="file" 
        className="d-none"
        accept={AvatarAcceeptType}
        onChange={onFileInputChange}
        />
    </label>
</div>

<Modal show={isOpen} onHide={close} >

    <Modal.Header>
         <Modal.Title>
            Adjust And Upload An New Avatar
         </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <div className='d-flex justify-content-center allign-itms-center h-100'>{
        img &&
         <AvatarEditor
         ref={AvatarRef}
         image={img}
         width={200}
         height={200}
         border={10}
         borderRadius={100}
         scale={1.2}
         rotate={0}
       />
        }
     
      </div>
    </Modal.Body>
    <Modal.Footer>
    <Button block appearance='ghost' onClick={onUploadAvatar} disabled={isLoading}>
        Upload Your New Avatar
    </Button>
    </Modal.Footer>
</Modal>
    </div>

  ) 
}

export default AvatarUpload