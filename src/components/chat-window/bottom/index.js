import { useCallback, useState } from 'react';
import {InputGroup,Input,Icon,Alert} from 'rsuite';
import firebase from'firebase'
import { useProfile } from '../../../context/profile.context';
import { useParams } from 'react-router';
import { database } from '../../../misc/firebase';

function assembleMsg(profile,chatId){
  return {
    roomId :chatId,
    author:{
      name:profile.name,
      uid:profile.uid,
      createAt:profile.createAt,
      ...(profile.avatar?{ avatar:profile.avatar} : {})
    },
    createAt:firebase.database.ServerValue.TIMESTAMP,
  };
};

const Bottom = () => {

  const[input,setInput] =useState('');
  const {profile} =useProfile();
  const {chatId}=useParams();
  const [isLoading,setIsLoading] = useState(false);

  const onInputChange=useCallback((value)=>{

    setInput(value);
  },[])

  const onSendClick = async()=>{

    if(input.trim() === ''){
      return;
    }

     const msgData = assembleMsg(profile,chatId);
     msgData.text = input;
    

    const updates ={};

    const messageId = database.ref('message').push().key;

    updates[`/messages/${messageId}`] = msgData;
    updates[`rooms/${chatId}/lastMessage`]={
      ...msgData,
      msgId:messageId,
    };

    setIsLoading(true);
    try {
      await database.ref().update(updates);
      setInput('');
      setIsLoading(false);
    } catch (error) {
       Alert.error(error.message,9000)
       setIsLoading(false);
    }

  }
  const onkey=(ev)=>{
        if(ev.keyCode == 13){
          ev.preventDefault();
          onSendClick();
        }

    

  }

  return (
    <div>
         <InputGroup>
         <Input placeholder='Write A New Message Hear...' value={input} onChange={onInputChange}/>
         <InputGroup.Button color='blue' onKeyDown={onkey} onClick={onSendClick}  disabled={isLoading}  >
         <Icon icon='send' />
         </InputGroup.Button>
         </InputGroup>
    </div>
  )
}

export default Bottom;