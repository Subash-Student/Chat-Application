import {Drawer,Button} from 'rsuite';
import { useProfile } from '../../context/profile.context';

 const DashBoard = ({onSignOut}) => {

    const {profile} = useProfile()
  return (
    <>
        <Drawer.Header>
             <Drawer.Title>DashBoard</Drawer.Title>
        </Drawer.Header>

        <Drawer.Body>
     <h2>{profile.name}</h2>
             
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
