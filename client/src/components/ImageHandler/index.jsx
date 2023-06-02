import React, { useMemo, useState } from 'react'
import { Button, Form, Image, Modal } from 'react-bootstrap'
import { AuthState } from '../../context/AuthProvider'
import { setUserImagePrivacy } from '../../actions/imageAction'
import { Notify } from '../../utils'

const Imagehandler = ({ image, refresh, allowOptionForm = false }) => {
  const { auth } = AuthState()
  const [showModal, setShowModal] = useState(false)
  const [isPrivate, setIsPrivate] = useState(image.isPrivate)
  const [hasChange, setHasChange] = useState(false)
  const [profilePic, setProfilePic] = useState(
    auth.profilePic.path === image.path,
  )

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

  const handleCheckboxProfilePicChange = (event) => {
    setProfilePic(event.target.checked)
    setHasChange(true)
  }

  const handleCheckboxChange = (event) => {
    setIsPrivate(event.target.checked)
    setHasChange(true)
  }

  const handleSubmit = (event) => {
    try {
      event.preventDefault()
      setHasChange(false)
      const dataToSubmit = {
        isPrivate: isPrivate,
        profilePic: profilePic,
      }
      setUserImagePrivacy(auth._id, image._id, dataToSubmit).then((res) => {
        if (res.success) {
          const auth = JSON.parse(localStorage.getItem('auth'))
          if (auth && profilePic) {
            auth.profilePic = image
            const modifiedAuth = JSON.stringify(auth)
            localStorage.setItem('auth', modifiedAuth)
          }
          setShowModal(false)
          refresh()
          return Notify('Modification enregistray', 'success')
        }
      })
    } catch (error) {
      return Notify(error, 'warn')
    }
  }

  return (
    <>
      <Image
        src={image.path}
        alt={image.name}
        loading="lazy"
        onClick={handleImageClick}
        style={{
          width: '100%',
          height: '100%',
          minWidth: '250px',
          minHeight: '250px',
          maxWidth: '250px',
          maxHeight: '250px',
          objectFit: 'contain',
          background: 'rgba(0,0,0,.2)',
          borderRadius: '6px',
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
        {canModify && allowOptionForm && (
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="isPrivateCheckbox">
              <Form.Check
                type="checkbox"
                className="ms-3 mb-3"
                label="Fichier privé"
                checked={isPrivate}
                onChange={handleCheckboxChange}
                disabled={auth.profilePic.path === image.path}
              />
              {auth.profilePic.path === image.path && (
                <p className="ps-3">
                  La photo de profile ne peut pas être privée
                </p>
              )}
            </Form.Group>
            <Form.Group controlId="setProfilPicCheckbox">
              <Form.Check
                type="checkbox"
                className="ms-3 mb-3"
                label="Définir comme image de profil"
                name="setProfilPic"
                checked={profilePic}
                onChange={handleCheckboxProfilePicChange}
              />
            </Form.Group>
            <Button disabled={!hasChange} className="ms-3 mb-3" type="submit">
              Sauvegarder les modifications
            </Button>
          </Form>
        )}
      </Modal>
    </>
  )
}

export default Imagehandler
