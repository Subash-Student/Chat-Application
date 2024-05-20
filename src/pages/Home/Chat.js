import { useParams } from "react-router"
import{Loader} from 'rsuite'
import Bottom from "../../components/chat-window/bottom"
import Message from "../../components/chat-window/middle"
import Top from "../../components/chat-window/top"
import { useRooms } from "../../context/rooms.contex"
import { CurrentRoomProvider } from '../../context/current.room.context';
import { transformToArr } from "../../misc/helper"
import { auth } from "../../misc/firebase"

const Chat = () => {

const {chatId} = useParams();
const rooms =useRooms();

if(!rooms){
  <Loader center vertical speed="slow" content="loading" size='md'/>
}

const currentRoom = rooms.find(room => room.id === chatId)

if(!currentRoom){
  return <h6 className="text-center mt-page">Chat {chatId} not Found</h6>
}

const{name,description}= currentRoom;

const admins = transformToArr(currentRoom.admins);

const isAdmin = admins.includes(auth.currentUser.uid);

const currentRoomData = {
  name,
  description,
  admins,
  isAdmin
}


  return (
    <CurrentRoomProvider data={currentRoomData}>
        <div className="chat-top">
          <Top/>
        </div>
        <div className="chat-middle">
          <Message/>
        </div>
        <div className="chat-bottom">
          <Bottom/>
        </div>
    </CurrentRoomProvider>
  )
}

export default Chat