import {Modal} from 'rsuite';
import useModel from '../../../misc/custom-hook';

const ImageBtnModal = ({src,name}) => {

const {isOpen,open,close} = useModel()

  return (
    <>
        <input 
         type='image' 
         src={src} 
         alt={name} 
         onClick={open} 
         className="mw-100 mh-100 w-auto"/>

        <Modal show={isOpen} onHide={close}>
        <Modal.Header>
            <Modal.Title>{name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={src} alt={name} height='100%' width='100%'/>
        </Modal.Body>
        <Modal.Footer>
        <a href={src} target="_blank" rel="noopener noreferrer">
            View original
          </a>
        </Modal.Footer>
    
    </Modal>
    </>
  )
}

export default ImageBtnModal;