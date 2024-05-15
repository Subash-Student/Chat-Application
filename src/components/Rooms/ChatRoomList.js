import {Nav,Loader} from 'rsuite'
import RoomItems from './RoomItems'
import { useRooms } from '../../context/rooms.contex'
import { Link, useLocation } from 'react-router-dom';

const ChatRoomList = ({height}) => {
const Location = useLocation();
const rooms =useRooms();

    return (
    <Nav 
    appearance='subtle'
    vertical
    reversed
    className='overflow-y-scroll custom-scroll'
    style={{
        height:`calc(100% - ${height}px)`
    }}
    activeKey={Location.pathname}
    >

      {!rooms && <Loader center vertical content='Loading' speed='normal' size='md'/>}

      {rooms && rooms.length > 0 && rooms.map(room =>(
        <Nav.Item key={room.id} componentClass={Link} to={`/chat/${room.id}`} eventKey={`/chat/${room.id}`}>
            <RoomItems room={room}/>
        </Nav.Item>
      ))

      }
        
    </Nav>
  )
}

export default ChatRoomList;