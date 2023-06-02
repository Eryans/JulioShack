import React, { useState } from 'react'
import { Image, Modal } from 'react-bootstrap'

const Imagehandler = ({ image }) => {
  const [showModal, setShowModal] = useState(false)

  const handleCloseModal = () => {
    setShowModal(false)
  }

  const handleImageClick = () => {
    setShowModal(true)
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
            fontSize:'2em',
            cursor: 'pointer',
          }}
        >
          &times;
        </span>
        <Modal.Body className='pt-0'>
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
      </Modal>
    </>
  )
}

export default Imagehandler
