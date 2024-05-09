import {Button,Icon,Drawer,Alert} from 'rsuite';
import useModel, { useMediaQuery } from '../../misc/custom-hook';
import DashBoard from '.';
import { auth } from '../../misc/firebase';

const DashBoardToggle = () => {

const onSignOut = ()=>{

    auth.signOut();

    Alert.info("Sign Out");
    close();

    
}

const{isOpen,open,close} = useModel();
const isMobile = useMediaQuery('(max-width: 992px)');

  return (
    <div>
        <Button block color ="blue" onClick={open}>
         <Icon icon="dashboard"/> DashBoard
        </Button>
        <Drawer full={isMobile} show={isOpen} onHide={close} placement='left'>
            <DashBoard onSignOut={onSignOut}/>
        </Drawer>
    </div>
  )
}

export default DashBoardToggle