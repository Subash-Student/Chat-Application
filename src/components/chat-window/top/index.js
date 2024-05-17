import{Icon,ButtonToolbar} from 'rsuite';
import { memo } from 'react';
import { useCurrentRoom } from '../../../context/current.room.context';
import { Link } from 'react-router-dom';
import { useMediaQuery } from '../../../misc/custom-hook';
import RoomInformationModal from './RoomInformationModal';

const Top = () => {


  const name = useCurrentRoom(v => v.name);
const isMobile = useMediaQuery('(max-width : 992px)')

  return (
    <div>
      <div className='d-flex justify-content-between align-item-center'>
      <h4>
      <Icon 
     icon='arrow-circle-left'
     componentClass={Link}
     to='/'
     size='2x'
     className={isMobile?'d-inline-block p-0 mr-2 text-black link-unstyled':'d-none'}
     />
        <span className='text-disappear'>{name}</span>
      </h4>
      {/* <ButtonToolbar className='ws-nowrap'>todo</ButtonToolbar> */}
      <div className='d-flex justify-content-between align-item-center'>
        {/* <span>todo</span> */}
         <RoomInformationModal />
      </div>
      </div>

      
      
    </div>
  ) 
}

export default memo(Top);