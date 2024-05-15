import TimeAgo from 'timeago-react'

const RoomItems = ({room}) => {

    const{createAt,name} = room;
  return (
    <div>
        <div className='d-flex justify-content-between align-item-center'>
            <h3 className='text-disappear'>{name}</h3>
            <TimeAgo 
            datetime = {new Date(createAt)}
          className='text-normal text-black-40'  />
        </div>

        <div>
            <p className='d-flex align-item-center text-black-70'> No message yet...</p>
        </div>
    </div>
  )
}

export default RoomItems;