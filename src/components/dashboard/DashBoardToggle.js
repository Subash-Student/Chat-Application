import {Button,Icon,Drawer,Alert} from 'rsuite';
import useModel, { useMediaQuery } from '../../misc/custom-hook';
import DashBoard from '.';
import { auth, database } from '../../misc/firebase';
import { useCallback } from 'react';
import { isOfflineForDatabase } from '../../context/profile.context';

const DashBoardToggle = () => {

  const{isOpen,open,close} = useModel();
const onSignOut = useCallback(()=>{

  database.ref(`/status/${auth.currentUser.uid}`).set(isOfflineForDatabase).then(()=>{
    auth.signOut()
    Alert.info("Sign Out",4000);
    close();
  }).catch(err =>{
    Alert.error(err.message);
  });
    
},[close])


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