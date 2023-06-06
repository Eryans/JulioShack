import React, { useCallback, useMemo, useState } from 'react'
import { Button, Form, Image, Modal } from 'react-bootstrap'
import { AuthState } from '../../context/AuthProvider'
import { setUserImagePrivacy } from '../../actions/imageAction'
import { Notify } from '../../utils'
import DeleteImageButton from '../DeleteImageButton'
import IMAGES from '../../assets'

const Imagehandler = ({ image, refresh, allowOptionForm = false }) => {
  const { auth } = AuthState()
  const [showModal, setShowModal] = useState(false)
  const [isPrivate, setIsPrivate] = useState(image.isPrivate)
  const [hasChange, setHasChange] = useState(false)
  const [profilePic, setProfilePic] = useState(
    auth?.profilePic?.path === image.path,
  )

  const canModify = useMemo(() => (auth ? image.user === auth._id : false), [
    auth,
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

  const handleImgError = useCallback((img) => {
    img.target.src = IMAGES.notfound
  }, [])

  return (
    <>
      <Image
        src={image.path}
        alt={image.name}
        loading="lazy"
        onClick={handleImageClick}
        onError={handleImgError}
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
            onError={handleImgError}
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
        {canModify && allowOptionForm && auth && (
          <Modal.Footer>
            <Form onSubmit={handleSubmit} className="w-100">
              <Form.Group controlId="isPrivateCheckbox">
                <Form.Check
                  type="checkbox"
                  label="Fichier privé"
                  checked={isPrivate}
                  onChange={handleCheckboxChange}
                  disabled={auth?.profilePic?.path === image.path || profilePic}
                />
                {auth?.profilePic?.path === image.path && (
                  <p>La photo de profile ne peut pas être privée</p>
                )}
              </Form.Group>
              <Form.Group controlId="setProfilPicCheckbox">
                <Form.Check
                  type="checkbox"
                  className="mb-3"
                  label="Définir comme image de profil"
                  name="setProfilPic"
                  checked={profilePic}
                  onChange={handleCheckboxProfilePicChange}
                  disabled={isPrivate}
                />
              </Form.Group>
              <span className="d-flex justify-content-start align-items-start gap-2">
                <Button disabled={!hasChange} className="mb-3" type="submit">
                  Sauvegarder les modifications
                </Button>
                <DeleteImageButton imageId={image._id} refresh={refresh} handleCloseModalOrigin={handleCloseModal}/>
              </span>
            </Form>
          </Modal.Footer>
        )}
      </Modal>
    </>
  )
}

export default Imagehandler
