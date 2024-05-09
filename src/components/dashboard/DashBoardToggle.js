import {Button,Icon,Drawer} from 'rsuite';
import useModel from '../../misc/custom-hook';
import DashBoard from '.';

const DashBoardToggle = () => {

const{isOpen,open,close} = useModel();

  return (
    <div>
        <Button block color ="blue" onClick={open}>
         <Icon icon="dashboard"/> DashBoard
        </Button>
        <Drawer show={isOpen} onHide={close} placement='left'>
            <DashBoard/>
        </Drawer>
    </div>
  )
}

export default DashBoardToggle