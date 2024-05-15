import {Nav} from 'rsuite'
import RoomItems from './RoomItems'

const ChatRoomList = ({height}) => {

  return (
    <Nav 
    appearance='subtle'
    vertical
    reversed
    className='overflow-y-scroll custom-scroll'
    style={{
        height:`calc(100% - ${height}px)`
    }}
    >

        <Nav.Item>
            <RoomItems />
        </Nav.Item>
    </Nav>
  )
}

export default ChatRoomList;