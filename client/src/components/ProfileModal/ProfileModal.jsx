import { Button, Image, Modal } from 'react-bootstrap'

import { AuthState } from '../../context/AuthProvider'
import DeleteProfileButton from '../DeleteProfileButton'
import IMAGES from '../../assets/index'
const ProfileModal = ({ show, onHide }) => {
  const { auth } = AuthState()

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Your profile
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex justify-content-center">
          <Image
            id="profileModal"
            src={auth?.profilePic?.path ?? IMAGES.user}
            alt="Profile image"
            draggable="false"
            roundedCircle
            style={{ objectFit: 'cover' }}
          />
        </div>
        <h4 className="text-center mt-3">{auth.name}</h4>
      </Modal.Body>
      <Modal.Footer>
        <DeleteProfileButton closeOriginalModal={onHide}/>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ProfileModal
