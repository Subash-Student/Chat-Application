import TimeAgo from 'timeago-react'
import { Button} from 'rsuite'
import ProfileAvatar from '../../dashboard/ProfileAvatar';
import ProfileBtnInfo from './ProfileBtnInfo';
import PresenceDot from '../../PresenceDot';
import { useCurrentRoom } from '../../../context/current.room.context';
import { memo } from 'react';
import { auth } from '../../../misc/firebase';
import { useHover ,useMediaQuery} from '@uidotdev/usehooks';
import IconBtnControl from './IconBtnControl';



const MessageItem = ({message,handleAdmin,handleLike,handleDelete}) => {

    const {author,createAt,text,likes,likeCount} = message;
    const [ref, hovering] = useHover();
    
    const isMobile = useMediaQuery(
      "only screen and (min-width : 769px) and (max-width : 992px)"
    );
    const canShow = isMobile || hovering ;

    const isAdmin = useCurrentRoom(v => v.isAdmin);
    const admins = useCurrentRoom(v => v.admins);
  
    const isMsgAuthorAdmin = admins.includes(author.uid);
    const isAuthor = auth.currentUser.uid === author.uid;
    const canGrantAdmin = isAdmin && !isAuthor;

    const isLiked = likes && Object.keys(likes).includes(auth.currentUser.uid);
     
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

           <IconBtnControl
           {...(isLiked ? { color: 'red' } : {})}
           isVisible ={canShow}
           iconName = 'heart'
           tooltip = 'Like'
           onClick={()=> handleLike(message.id)}
           badgeContent ={likeCount}
           />
           {isAuthor && 
           <IconBtnControl
           isVisible ={canShow}
           iconName = 'close'
           tooltip = 'Delete'
           onClick={()=> handleDelete(message.id)}
          
           />

           }
               
     </div>

<div><span className='word-break-all'>{text}</span></div>
    </li>
)
}

export default memo(MessageItem) ;