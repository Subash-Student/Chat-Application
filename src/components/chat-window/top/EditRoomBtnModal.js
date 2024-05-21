import {Button,Drawer,Alert} from 'rsuite'
import { useParams } from 'react-router'
import useModel, { useMediaQuery } from '../../../misc/custom-hook'
import EditableDashBoard from '../../EditableDashBoard'
import { database } from '../../../misc/firebase'
import { useCurrentRoom } from '../../../context/current.room.context'
import { memo } from 'react'




const EditRoomBtnModal = () => {

const{isOpen,open,close} = useModel();
const {chatId} = useParams();
const isMobile = useMediaQuery('(max-width: 992px)');
const name = useCurrentRoom(v => v.name);
const description = useCurrentRoom(v=>v.description);

const onUpdateData = (key,value)=>{

    database.ref(`rooms/${chatId}`).child(key).set(value).then(()=>{
        Alert.success("Name Updated",4000)
    }).catch((err)=>{
        Alert.error(err.message,4000)
    })
}

const onNameSave = (newName)=>{
     onUpdateData('name',newName)

}

const onDescriptionSave = (newName)=>{
    onUpdateData('name',newName)

}


  return (
    <div>
         <Button className='br-circle ' size='sm' color='red' onClick={open}>
            A
         </Button>

         <Drawer full={isMobile} show={isOpen} onHide={close}>

            <Drawer.Header>
                <Drawer.Title>Edit Room Details</Drawer.Title>
            </Drawer.Header>

            <Drawer.Body>
                <EditableDashBoard 
                initialValue={name}
                onSave={onNameSave}
                label={<h6 className='mb-2'>Name </h6>}
                emtyMsg='Name Cannot Be Empty'
                />
     
               <EditableDashBoard 
               
               initialValue={description}
               onSave={onDescriptionSave}
               emtyMsg='Description Cannot Be Empty'
               label={<h6 className='mt-2 mb-2'>Description</h6>}
               componentClass = "textarea"
               rows = {5}
               />

            </Drawer.Body>

            <Drawer.Footer>
                <Button block color='gray' onClick={close}>
                    Close
                </Button>
            </Drawer.Footer>
         </Drawer>
    </div>
  )
}

export default memo(EditRoomBtnModal) 