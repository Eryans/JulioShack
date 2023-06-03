import React, { useState } from 'react'
import { Button, Image, Modal } from 'react-bootstrap'
import { deleteUserImage } from '../../actions/imageAction'
import { Notify } from '../../utils'

const DeleteImageButton = ({ imageId, refresh }) => {
  const [showModal, setShowModal] = useState(false)

  const handleDeleteImage = () => {
    deleteUserImage(imageId)
      .then(() => {
        setShowModal(false)
        refresh()
        return Notify('Image supprimay :<', 'success')
      })
      .catch((error) => {
        // Gestion des erreurs
        console.error(error)
        return Notify(`Shit happend ! ${error}`, 'warn')
      })
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  return (
    <>
      <Button variant="danger" onClick={() => setShowModal(true)}>
        Supprimer l'image
      </Button>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation de suppression</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Image
            src="https://media.tenor.com/rGrmSnyBPlMAAAAC/peepo-sad.gif"
            className="w-100"
          />
          Êtes-vous sûr de vouloir supprimer cette image ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Annuler
          </Button>
          <Button variant="danger" onClick={handleDeleteImage}>
            Supprimer
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default DeleteImageButton
