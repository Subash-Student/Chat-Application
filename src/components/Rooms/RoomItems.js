import TimeAgo from 'timeago-react'

const RoomItems = () => {
  return (
    <div>
        <div className='d-flex justify-content-between align-item-center'>
            <h3 className='text-disappear'>Room Name</h3>
            <TimeAgo 
            datetime = {new Date()}
          className='text-normal text-black-40'  />
        </div>

        <div>
            <p className='d-flex align-item-center text-black-70'> No message yet...</p>
        </div>
    </div>
  )
}

export default RoomItems