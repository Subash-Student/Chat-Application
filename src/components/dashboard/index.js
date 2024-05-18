import {Drawer,Button,Divider,Alert} from 'rsuite';
import { database } from '../../misc/firebase';
import { useProfile } from '../../context/profile.context';
import EditableDashBoard from '../EditableDashBoard';
import ProviderBlock from './ProviderBlock';
import AvatarUpload from './AvatarUpload';
import { getUserUpdates } from '../../misc/helper';




 const DashBoard = ({onSignOut}) => {

    const {profile} = useProfile();
    
 
  
    const onSave = async(newData)=>{
        console.log(newData);
        try {
         
           const updates = await getUserUpdates(profile.uid,'name',newData,database);
           await database.ref().update(updates);
          
          Alert.success("Nickname Updated Succesfully");

        } catch (error) {
          Alert.error(error.message,4000)
        }
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
