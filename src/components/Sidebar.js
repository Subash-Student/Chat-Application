import CreateRoomBtnModal from "./CreateRoomBtnModal";
import {Divider} from 'rsuite';
import DashBoardToggle from "./dashboard/DashBoardToggle";
import ChatRoomList from "./Rooms/ChatRoomList";
import { useEffect, useRef, useState } from "react";


const Sidebar = ()=>{
 
    const sideBarRef=useRef();
    const [height,setHeight ]= useState(0);

    useEffect(()=>{
        if(sideBarRef.current){
            setHeight(sideBarRef.current.scrollHeight);
        }       
    },[sideBarRef]);



    return(
<div className="h-100 pt-2">
    <div ref={sideBarRef}>
        <DashBoardToggle />
        <CreateRoomBtnModal />
        <Divider>Join The Conversation</Divider>
    </div>
    <ChatRoomList height={height}/>
</div>
    )
}

export default Sidebar;