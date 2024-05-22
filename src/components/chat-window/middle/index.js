import { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import {Alert} from 'rsuite'
import {auth, database } from '../../../misc/firebase';
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

const handleAdmin = useCallback(async(uid)=>{
    
  const adminRef = database.ref(`/rooms/${chatId}/admins`);

  let alertMsg;

  await adminRef.transaction((admins)=>{

    if(admins){
      if(admins[uid]){
        console.log(admins[uid])
        admins[uid] = null;
        alertMsg = 'Admin Permission Removed'
      }else{
        console.log(admins[uid])
        admins[uid] = true;
        alertMsg = 'Admin Permission Granted'
      } 
    }
    return admins;
    
  })
  Alert.info(alertMsg,4000)
},[chatId])


const handleLike = useCallback(
  async(msgId) => {
   const {uid} = auth.currentUser;
    const messageRef = database.ref(`/messages/${msgId}`);

  let alertMsg;

  await messageRef.transaction((msg)=>{

    if(msg){
      if(msg.likes && msg.likes[uid]){
        msg.likeCount -= 1;
        msg.likes[uid]=null;
        alertMsg = 'like Removed'
      }else{
       msg.likeCount +=1;

       if(!msg.likes){
        msg.likes ={};
       }

       msg.likes[uid] = true;
        alertMsg = 'Like Added'
      } 
    }
    return msg;
    
  })
  Alert.info(alertMsg,4000)
  },
  [],
)
const handleDelete = useCallback(
 async (msgId)=>{
      
    const isLast = message[message.length - 1].id === msgId ;
   
    if (!window.confirm('Delete this message?')) {
      return;
    }
    
    const updates={};

     updates[`/messages/${msgId}`] = null ;

     if(isLast && message.length > 1 ){
      updates[`rooms/${chatId}/lastMessage`] = {
        ...message[message.length - 2],
        msgId : message[message.length -2].id,
      }
     }

     if(isLast && message.length === 1 ){
      updates[`rooms/${chatId}/lastMessage`] = null ;
     }
    
     try {
      
      await database.ref().update(updates);
      Alert.info('Message Deleted',4000);
     } catch (error) {
      Alert.info(error.message,4000);
     }

  },[chatId,message]
)



  return (
    <>
    <ul className='msg-list custom-scroll'>

    {isMsgEmpty &&
    <li>No Messages Yet...</li>
    }

{showMessage &&   
message.map(message =>
   <MessageItem
   key={message.id} 
   message ={message}
    handleAdmin={handleAdmin}
     handleLike={handleLike}
     handleDelete={handleDelete}
     />)
  }
    </ul>
   
    </>
  )
}

export default Message