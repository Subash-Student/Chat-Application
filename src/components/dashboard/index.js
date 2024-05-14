import {Drawer,Button,Divider} from 'rsuite';
import { useProfile } from '../../context/profile.context';
import EditableDashBoard from '../EditableDashBoard';
import ProviderBlock from './ProviderBlock';
import AvatarUpload from './AvatarUpload';


 const DashBoard = ({onSignOut}) => {

    const {profile} = useProfile();
  
    const onSave =(newData)=>{
        console.log(newData);
    }

  return (
    <>
        <Drawer.Header>
             <Drawer.Title>DashBoard</Drawer.Title>
        </Drawer.Header>

        <Drawer.Body>
     <h2>Hey, {profile.name}</h2>
     <ProviderBlock />
     <Divider />
     <EditableDashBoard 
     name ="nick name"
     initialValue ={profile.name}
     onSave = {onSave}
     label={<h6 className='mb-2'>Nick Name</h6>}
     />   

     <AvatarUpload /> 
        </Drawer.Body>

        <Drawer.Footer>
               <Button block color='red' onClick={onSignOut}>
                Sign Out
              </Button> 
              
        </Drawer.Footer>
    </>
  )
}

export default DashBoard;
