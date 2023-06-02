import React from 'react'
import { Row, Col } from 'react-bootstrap'
import Imagehandler from '../ImageHandler'

const ImageGallery = ({ images, refresh, allowOptionForm = false }) => {
  return (
    <Row className="gap-2 align-items-center justify-content-center">
      {images.map((image, index) => (
        <Col key={index} xs={4} md={4} lg={3}>
          <Imagehandler image={image} refresh={refresh} allowOptionForm={allowOptionForm} />
        </Col>
      ))}
    </Row>
  )
}

export default ImageGallery
