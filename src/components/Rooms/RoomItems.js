import TimeAgo from 'timeago-react'
import ProfileAvatar from '../dashboard/ProfileAvatar';

const RoomItems = ({room}) => {

    const{createAt,name,lastMessage} = room;
  return (
    <div>
        <div className='d-flex justify-content-between align-item-center'>
            <h3 className='text-disappear'>{name}</h3>
            <TimeAgo 
            datetime = {lastMessage? new Date(lastMessage.createAt) :new Date(createAt)}
          className='font-normal text-black-40'  />
        </div>

        <div className='d-flex align-item-center text-black-70'>
            {lastMessage ?
            <>
            <div className='d-flex align-items-center'>
              <ProfileAvatar
              src={lastMessage.author.avatar}
              name={lastMessage.author.name}
              size='sm'/>
            </div>
  
            <div className='text-disappear ml-2'>
              <div className='italic'>{lastMessage.author.name}</div>
              <span>{lastMessage.text ? lastMessage.text : lastMessage.file.name}</span>
            </div>

            </>
            :
            <>
             <span>No message yet....</span>
            </>

            }
        </div>
    </div>
    
  )
}

export default RoomItems;