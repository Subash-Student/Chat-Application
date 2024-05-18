import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { database } from '../../../misc/firebase';
import { transformToArrayWithId } from '../../../misc/helper';
import MessageItem from './MessageItem';

const Message = () => {

const {chatId} = useParams();
const[message,setMessage] = useState(null);

const isMsgEmpty = message && message.length === 0 ;
const showMessage = message && message.length > 0 ;

useEffect(()=>{

  const messageRef = database.ref('messages');

 messageRef.orderByChild(`roomId`).equalTo(chatId).on('value',(snap)=>{

  const data = transformToArrayWithId(snap.val());
  
  setMessage(data)

  return ()=>{
    messageRef.off()
  }

 })

},[chatId])

  return (
    <>
    <ul className='msg-list custom-scroll'>

    {isMsgEmpty &&
    <li>No Messages Yet...</li>
    }

{showMessage &&   
message.map(message => <MessageItem key={message.id} message ={message}/>)
  }
    </ul>
   
    </>
  )
}

export default Message