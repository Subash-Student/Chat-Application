import TimeAgo from 'timeago-react'
import ProfileAvatar from '../../dashboard/ProfileAvatar';
import ProfileBtnInfo from './ProfileBtnInfo';
import PresenceDot from '../../PresenceDot';

const MessageItem = ({message}) => {

    const {author,createAt,text} = message;
     
  return (
    <li className='padded mb-1'>

     <div className='d-flex align-items-center font-bolder mb-1'>
        <PresenceDot uid={author.uid}/>
        <ProfileAvatar src={author.avatar} name={author.name} size='xs' className='ml-1'/>

        <ProfileBtnInfo profile={author} appearance='link' className='p-0 ml-1 text-black'/>
        <TimeAgo 
            datetime = {createAt}
          className='font-normal text-black-40 ml-2'  />

     </div>

<div><span className='word-break-all'>{text}</span></div>
    </li>
)
}

export default MessageItem;