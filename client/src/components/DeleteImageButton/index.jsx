import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { deleteUserImage } from '../../actions/imageAction'

const DeleteImageButton = ({ imageId, refresh }) => {
  const [showModal, setShowModal] = useState(false)

  const handleDeleteImage = () => {
    deleteUserImage(imageId)
      .then(() => {
        setShowModal(false)
        refresh()
      })
      .catch((error) => {
        // Gestion des erreurs
        console.error(error)
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
