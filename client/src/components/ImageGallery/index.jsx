import React from 'react'
import { Row, Col } from 'react-bootstrap'
import Imagehandler from '../ImageHandler'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
const getMonthFromTimestamp = (timestamp) => {
  const date = new Date(timestamp)
  return format(date, 'MMMM', { locale: fr })
}
const groupImagesByMonth = (images) => {
  const groupedImages = {}

  images.forEach((image) => {
    const month = getMonthFromTimestamp(image.createdAt)

    if (!groupedImages[month]) {
      groupedImages[month] = []
    }

    groupedImages[month].push(image)
  })

  return groupedImages
}

const ImageGallery = ({ images, refresh, allowOptionForm = false }) => {
  const groupedImages = groupImagesByMonth(images)

  return (
    <>
      {Object.entries(groupedImages).map(([month, monthImages]) => (
        <div key={month}>
          <h2>{month}</h2>
          <Row className="gap-2 align-items-center justify-content-center">
            {monthImages.map((image, index) => (
              <Col key={index} xs={4} md={4} lg={3}>
                <Imagehandler
                  image={image}
                  refresh={refresh}
                  allowOptionForm={allowOptionForm}
                />
              </Col>
            ))}
          </Row>
        </div>
      ))}
    </>
  )
}

export default ImageGallery
