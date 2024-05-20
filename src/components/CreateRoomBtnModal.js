import {Button,Form,Modal,Icon,FormGroup,ControlLabel,FormControl,Schema,Alert} from 'rsuite'
import useModel from '../misc/custom-hook'
import { useCallback, useRef, useState } from 'react';
import firebase from'firebase';
import { auth, database } from '../misc/firebase';


const INITIAL_FORM= {
    name:'',
    description:''
}
const {StringType}=Schema.Types;

const modal = Schema.Model({
  name:StringType().isRequired('Room name is required'),
  description:StringType().isRequired('Description is required')
})

const CreateRoomBtnModal = () => {

    const{isOpen,open,close} = useModel();
    const[formValue,setFormValue] = useState(INITIAL_FORM);
    const[isLoading,setIsLoading]=useState(false);
    const formRef = useRef();

    const onFormChange=useCallback(value=>{
        setFormValue(value);
    },[])
    
const onSubmit=async()=>{

  if(!formRef.current.check()){

    return;
  }
  setIsLoading(true);

      const newRoomData = {
        ...formValue,
        createAt:firebase.database.ServerValue.TIMESTAMP,
        admins:{
          [auth.currentUser.uid] : true
        }
      }
      try {
        await database.ref('rooms').push(newRoomData);
        Alert.success(`${formValue.name} is Successfully Created`);
        setFormValue(INITIAL_FORM);
        setIsLoading(false);
        close();
      } catch (error) {
        Alert.error(error.message,4000);
        setIsLoading(false);
      }

}




  return (
    <div className='mt-1'>
<Button block color='green' onClick={open}>
    <Icon icon='creative'/> Create Your Own Chat Room
</Button>
       
    <Modal show={isOpen} onHide={close}>
        <Modal.Header>
            <Modal.Title>
               Create The Chat Room
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
               <Form fluid onChange={onFormChange} formValue={formValue} model={modal} ref={formRef}>
                     <FormGroup>
                       <ControlLabel>Room Name</ControlLabel>
                       <FormControl name='name' placeholder='Enter Chat Room Name...' />
                     </FormGroup>
                     <FormGroup>
                       <ControlLabel>Description</ControlLabel>
                       <FormControl componentClass="textarea" rows={5} name='description' placeholder='Enter The Descriptiom For Your Room...' />
                     </FormGroup>
               </Form>

         
        </Modal.Body>
        <Modal.Footer>
             <Button block appearance='primary' onClick={onSubmit} disabled={isLoading}>
                 Create
             </Button>
        </Modal.Footer>
    </Modal>
   
    </div>
  )
}

export default CreateRoomBtnModal