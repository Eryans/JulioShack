import { useEffect, useState } from 'react'
import { getPublicImages } from '../../actions/imageAction'
import Wrapper from '../../components/Wrapper'
import ImageGallery from '../../components/ImageGallery'
import MulterInput from '../../components/MulterInput'

const PublicImagePage = () => {
  const [userImages, setUserImages] = useState([])
  const [refresh, setRefresh] = useState(false)

  const handleRefresh = () => {
    setRefresh(!refresh)
  }
  useEffect(() => {
    const fetchImage = async () => {
      const images = await getPublicImages(50)
      if (images) setUserImages(images.data)
    }
    fetchImage()
  }, [ refresh])

  return (
    <Wrapper>
      <div className="d-flex flex-column gap-5 align-items-center mb-5">
        <h1 className="text-center">
          Le Carrousel Épique de l'Imaginarium Visuel de la communauté
        </h1>
        <div>
          <h2 className='text-center'>Moi aussi je montre au monde ma belle image</h2>
          <MulterInput refresh={handleRefresh} canSetPrivacy={false}/>
        </div>
        <ImageGallery images={userImages} refresh={handleRefresh} allowOptionForm={false} />
      </div>
    </Wrapper>
  )
}

export default PublicImagePage
