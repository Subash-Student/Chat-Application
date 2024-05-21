import {Button,Modal} from 'rsuite';
import useModel from '../../../misc/custom-hook';
import ProfileAvatar from '../../dashboard/ProfileAvatar';




const ProfileBtnInfo = ({profile ,children, ...btnProps}) => {

    const shortName = profile.name.split(' ')[0];
    const{isOpen,open,close} = useModel();
    const memberSince = new Date(profile.createAt).toLocaleDateString()

  return (
    <div>
        <Button {...btnProps} onClick={open} >
            {shortName}
        </Button>
        <Modal show={isOpen} onHide={close}>
            <Modal.Header>
                     <Modal.Title>{shortName} Profile</Modal.Title>
            </Modal.Header>
            <Modal.Body className='text-center'>
            <ProfileAvatar 
            src={profile.avatar} 
            name={profile.name}
             className='height-200 width-200 img-fullsize font-huge'
             />

             <h4 className='mt-2'>{profile.name}</h4>

             <p className='mt-1'>Member Since {memberSince}</p>

            </Modal.Body>
            <Modal.Footer>
                    {children}
                  <Button block  onClick={close}> 
                     Close
                  </Button>
            </Modal.Footer>
        </Modal>

        </div>
  )
}

export default ProfileBtnInfo