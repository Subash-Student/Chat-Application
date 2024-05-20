import{Whisper,Tooltip,Badge} from 'rsuite'
import { usePresence } from '../misc/custom-hook'


const PresenceDot = ({uid}) => {

    const presence = usePresence(uid);
    const getColor =(presence)=>{
   
        if(!presence){
            return 'gray';
        }

        switch(presence.state){
            case 'online' :
                return 'green';
            case 'offline':
                return 'red';
            default :
                return 'gray'
        }
    }

const getText =(presence)=>{
    if(!presence){
        return 'unkonwn Presence';
    }
 
    return presence.state === 'online' ? 'Online' : `Last Online ${new Date(presence.last_changed)}`
}


  return (
    <Whisper 
    placement="top" 
    controlId="control-id-hover" 
    trigger="hover"
     speaker={
        <Tooltip>
          {getText(presence)}
        </Tooltip>
      }>
      <Badge className='cursor-pointer ' style={{backgroundColor : getColor(presence)}}/>
    </Whisper>
  )
}

export default PresenceDot