import { useEffect, useState } from 'react'
import Wrapper from '../../components/Wrapper'
import { getPublicImages } from '../../actions/imageAction'
import ImageGallery from '../../components/ImageGallery'
import HomeText from '../../components/HomeText'

const HomePage = () => {
  const [userImages, setUserImages] = useState([])
  const [refresh, setRefresh] = useState(false)

  const handleRefresh = () => {
    setRefresh(!refresh)
  }
  useEffect(() => {
    const fetchImage = async () => {
      const images = await getPublicImages(5)
      if (images) setUserImages(images.data)
    }
    fetchImage()
  }, [refresh])

  return (
    <Wrapper>
      <HomeText />

      <h2 className="mb-5 mt-5">5 dernières images !</h2>
      <ImageGallery images={userImages} refresh={handleRefresh} />
      <div className="mb-5" />
    </Wrapper>
  )
}

export default HomePage
