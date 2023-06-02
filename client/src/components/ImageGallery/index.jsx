import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Imagehandler from '../ImageHandler'

const ImageGallery = ({ images }) => {
  return (
    <Container>
      <Row>
        {images.map((image, index) => (
          <Col key={index} xs={6} md={4} lg={3}>
            <Imagehandler image={image} />
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default ImageGallery
