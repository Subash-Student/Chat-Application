import{Icon,ButtonToolbar} from 'rsuite';
import { memo } from 'react';
import { useCurrentRoom } from '../../../context/current.room.context';
import { Link } from 'react-router-dom';
import { useMediaQuery } from '../../../misc/custom-hook';
import RoomInformationModal from './RoomInformationModal';
import EditRoomBtnModal from './EditRoomBtnModal';
import { database } from '../../../misc/firebase';

const Top = () => {


  const name = useCurrentRoom(v => v.name);
  const isAdmin = useCurrentRoom(v=>v.isAdmin);
  const isMobile = useMediaQuery('(max-width : 992px)')


 


  return (
    <div>
      <div className='d-flex justify-content-between align-items-center'>
      <h4 className='text-disappear d-flex align-items-center'>
      <Icon 
     icon='arrow-circle-left'
     componentClass={Link}
     to='/'
     size='2x'
     className={isMobile?'d-inline-block p-0 mr-2 text-black link-unstyled':'d-none'}
     />
        <span className='text-disappear'>{name}</span>
      </h4>

      <ButtonToolbar className='ws-nowrap'>{isAdmin && <EditRoomBtnModal />}</ButtonToolbar>
      </div>
      <div className='d-flex justify-content-between align-items-center'>
        <span>todo</span>
         <RoomInformationModal />
      </div>
    </div>
  ) 
}

export default memo(Top);