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

const ImageGallery = ({
  images,
  refresh,
  allowOptionForm = false,
  sortByDate = true,
}) => {
  const groupedImages = groupImagesByMonth(images)

  return (
    <>
      {sortByDate ? (
        Object.entries(groupedImages).map(([month, monthImages]) => (
          <div key={month} className="w-100">
            <h2>{month}</h2>
            <div className="gap-2 d-flex flex-wrap align-items-center justify-content-center">
              {monthImages.map((image, index) => (
                <Imagehandler
                  key={index}
                  image={image}
                  refresh={refresh}
                  allowOptionForm={allowOptionForm}
                />
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className="gap-2 d-flex flex-wrap align-items-center justify-content-center">
          {images.map((image, index) => (
            <Imagehandler
              key={index}
              image={image}
              refresh={refresh}
              allowOptionForm={allowOptionForm}
            />
          ))}
        </div>
      )}
    </>
  )
}

export default ImageGallery
