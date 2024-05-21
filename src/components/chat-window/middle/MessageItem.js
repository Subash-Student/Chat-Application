import TimeAgo from 'timeago-react'
import { Button} from 'rsuite'
import ProfileAvatar from '../../dashboard/ProfileAvatar';
import ProfileBtnInfo from './ProfileBtnInfo';
import PresenceDot from '../../PresenceDot';
import { useCurrentRoom } from '../../../context/current.room.context';
import { memo } from 'react';
import { auth } from '../../../misc/firebase';
import { useHover } from '@uidotdev/usehooks';

const MessageItem = ({message,handleAdmin}) => {

    const {author,createAt,text} = message;
    const [ref, hovering] = useHover();
    
    const isAdmin = useCurrentRoom(v => v.isAdmin);
    const admins = useCurrentRoom(v => v.admins);
  
    const isMsgAuthorAdmin = admins.includes(author.uid);
    const isAuthor = auth.currentUser.uid === author.uid;
    const canGrantAdmin = isAdmin && !isAuthor;
     
  return (
    <li className={`padded mb-1 cursor-pointer ${hovering ? 'bg-black-02' :''}`} ref={ref}>

     <div className='d-flex align-items-center font-bolder mb-1'>
        <PresenceDot uid={author.uid}/>
        <ProfileAvatar src={author.avatar} name={author.name} size='xs' className='ml-1'/>
        <ProfileBtnInfo profile={author} appearance='link' className='p-0 ml-1 text-black'>
        {canGrantAdmin && (
            <Button block onClick={() => handleAdmin(author.uid)} color="blue">
              {isMsgAuthorAdmin
                ? 'Remove admin permission'
                : 'Give admin in this room'}
            </Button>
          )}
        </ProfileBtnInfo>
        <TimeAgo 
            datetime = {createAt}
          className='font-normal text-black-40 ml-2'  />

     </div>

<div><span className='word-break-all'>{text}</span></div>
    </li>
)
}

export default memo(MessageItem) ;