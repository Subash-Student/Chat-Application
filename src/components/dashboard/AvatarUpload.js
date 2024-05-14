import {Modal , Button, Alert} from 'rsuite';
import useModel from '../../misc/custom-hook';
import AvatarEditor from 'react-avatar-editor'
import { useState } from 'react';

const AvatarAcceeptType = '.png, .jpeg, .jpg' ;
const acceptedFileType=['image/png','image/jpeg','image/pjpeg'];
const validFile = (file)=> acceptedFileType.includes(file.type);


const AvatarUpload = () => {


const[img,setImg]=useState(null);

const {isOpen,open,close} =useModel();

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

  return (
    <div className="mt-3 text-center">


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
    <Button block appearance='ghost'>
        Upload Your New Avatar
    </Button>
    </Modal.Footer>
</Modal>
    </div>

  ) 
}

export default AvatarUpload