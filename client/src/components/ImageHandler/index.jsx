import React, { useMemo, useState } from 'react'
import { Button, Form, Image, Modal } from 'react-bootstrap'
import { AuthState } from '../../context/AuthProvider'
import { setUserImagePrivacy } from '../../actions/imageAction'

const Imagehandler = ({ image }) => {
  const [showModal, setShowModal] = useState(false)
  const [isPrivate, setIsPrivate] = useState(image.isPrivate)
  const [hasChange,setHasChange] = useState(false)
  const { auth } = AuthState()

  const canModify = useMemo(() => image.user === auth._id, [
    auth._id,
    image.user,
  ])

  const handleCloseModal = () => {
    setShowModal(false)
  }

  const handleImageClick = () => {
    setShowModal(true)
  }

  const handleCheckboxChange = (event) => {
    setIsPrivate(event.target.checked)
    setHasChange(true)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setHasChange(false)
    const dataToSubmit = {
      isPrivate: isPrivate,
    }
    setUserImagePrivacy(auth._id, image._id, dataToSubmit)
  }
  return (
    <>
      <Image
        src={image.path}
        alt={image.name}
        onClick={handleImageClick}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          cursor: 'pointer',
        }}
      />

      <Modal
        className="d-flex flex-column"
        show={showModal}
        onHide={handleCloseModal}
        centered
      >
        <span
          className="close pe-3 align-self-end justify-self-end"
          onClick={handleCloseModal}
          style={{
            fontSize: '2em',
            cursor: 'pointer',
          }}
        >
          &times;
        </span>
        <Modal.Body className="pt-0">
          <Image
            src={image.path}
            alt={image.name}
            className="modal-image"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              maxWidth: '75vw',
              maxHeight: '75vh',
            }}
          />
        </Modal.Body>
        {canModify && (
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="isPrivateCheckbox">
              <Form.Check
                type="checkbox"
                className='ms-3 mb-3'
                label="Fichier privé"
                checked={isPrivate}
                onChange={handleCheckboxChange}
                disabled={auth.profilePic.path === image.path}
              />
            {auth.profilePic.path === image.path && <p className='ps-3'>La photo de profile ne peut pas être privée</p>}
            </Form.Group>
            <Button disabled={!hasChange} className='ms-3 mb-3' type="submit">Sauvegarder la modification de visibilité</Button>
          </Form>
        )}
      </Modal>
    </>
  )
}

export default Imagehandler
