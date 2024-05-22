import {InputGroup,Input,Icon,Alert,Modal,Button,Uploader} from 'rsuite';
import useModel from '../../../misc/custom-hook';
import { useParams } from 'react-router';
import { useState } from 'react';
import { storage } from '../../../misc/firebase';


const MAX_FILE_SIZE = 1000 * 1024 * 5 ;

const AttachFiles = ({afterUpload}) => {
  
  const{isOpen,open,close} = useModel()
  const[fileList,setFileList] = useState([]);
  const[isLoading,setIsLoading] = useState(false);
  const {chatId} = useParams()

const onChange =(fileArr)=>{

    const filtered = fileArr.filter(file =>file.blobFile.size <= MAX_FILE_SIZE ).slice(0,5);

    setFileList(filtered);

}

const onUpload = async()=>{
    try {
        const uploadPromise = fileList.map(f =>{
            return storage.ref(`/chat/${chatId}`).child(Date.now() + f.name).put(f.blobFile,{
                cacheControl : `public, max-age=${3600 * 24 * 3}`,
            })
        })

      const uploadSnap = await Promise.all(uploadPromise);

      const shapePromise = uploadSnap.map(async snap =>{
          
        return {
            contentType : snap.metadata.contentType,
            name : snap.metadata.name,
            url : await snap.ref.getDownloadURL(),
        }
      })

      const data = await Promise.all(shapePromise);

      await afterUpload(data);

      setIsLoading(false)
      close();


    } catch (error) {
        Alert.error(error.message)
        setIsLoading(false)
    }

}


  return (
    <>
        <InputGroup.Button onClick={open}>
        <Icon icon='attachment' />
        </InputGroup.Button>
        
        <Modal show={isOpen} onHide={close}>
            <Modal.Header>
                <Modal.Title>
                   Upload Files
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
             <Uploader 
             autoUpload={false}
             action=''
             onChange={onChange}
             fileList={fileList}
             multiple
             listType='picture-text'
             disabled={isLoading}
             />
            </Modal.Body>
            <Modal.Footer>
            <Button  block color='blue' disabled={isLoading} onClick={onUpload}>
                      Send To Chat
            </Button>
            <div className='text-right mt-2'>
                <small>* only Files Less Then 5 Mb Are Allowed</small>
            </div>
            </Modal.Footer>
        </Modal>
        
    </>
  )
}

export default AttachFiles