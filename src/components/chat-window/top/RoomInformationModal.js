import {Button,Modal} from 'rsuite'
import { useCurrentRoom } from '../../../context/current.room.context'
import useModel from '../../../misc/custom-hook';

const RoomInformationModal = () => {

    const name = useCurrentRoom(v=>v.name);
    const description = useCurrentRoom(v=>v.description);
    const {isOpen , close,open} = useModel()

  return (
    <>
        <Button appearance='link' className='px-0' onClick={open}>
            Room Information
        </Button>
        <Modal show={isOpen} onHide={close}>
            <Modal.Header>
                   <Modal.Title>
                    About {name}
                   </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                  <h6 className='mb-1'>Description</h6>
                  <p>{description}</p>
            </Modal.Body>
            <Modal.Footer>
                 <Button block color='red' onClick={close}> Close</Button>
            </Modal.Footer>
        </Modal>
    </>
  )
}

export default RoomInformationModal