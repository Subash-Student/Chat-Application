import React from 'react';
import TimeAgo from 'timeago-react'
import ProfileAvatar from '../../dashboard/ProfileAvatar';

const MessageItem = ({message}) => {

    const {author,createAt,text} = message;
     
  return (
    <li className='padded mb-1'>

     <div className='d-flex align-items-center font-bolder mb-1'>

        <ProfileAvatar src={author.avatar} name={author.name} size='xs' className='ml-1'/>

        <span className='ml-2'>{author.name}</span>
        <TimeAgo 
            datetime = {createAt}
          className='font-normal text-black-40 ml-2'  />

     </div>

<div><span className='word-break-all'>{text}</span></div>

    </li>
)
}

export default MessageItem;