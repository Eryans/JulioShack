import React, { useState } from 'react'
import { Button, Image, Modal } from 'react-bootstrap'
import { AuthState } from '../../context/AuthProvider'
import { deleteUser } from '../../actions/userAction'
import { useNavigate } from 'react-router-dom'
const DeleteProfileButton = ({ closeOriginalModal = () => {} }) => {
  const [showModal, setShowModal] = useState(false)
  const { auth, setAuth } = AuthState()
  const navigate = useNavigate()

  const handleConfirmDelete = () => {
    deleteUser(auth._id).then((res) => {
      if (res.success) {
        localStorage.clear()
        setAuth(null)
        closeOriginalModal()
        setShowModal(false)
        navigate('/login')
      }
    })
  }

  return (
    <>
      <Button variant="danger" onClick={() => setShowModal(true)}>
        SUPPRIMER LE PROFIL D:
      </Button>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation de suppression</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Image
            src="https://i.pinimg.com/originals/d1/65/2e/d1652ef490df848efa0c4b1c95436c85.jpg"
            className="w-100"
            height={250}
            style={{ objectFit: 'cover' }}
          />
          Êtes-vous sûr de vouloir supprimer votre profil et quitter notre monde
          merveilleux ? Cette action est irréversible.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Annuler
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Supprimer
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default DeleteProfileButton
