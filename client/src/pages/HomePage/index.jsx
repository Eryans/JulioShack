import { useEffect, useState } from 'react'
import Wrapper from '../../components/Wrapper'
import { getPublicImages } from '../../actions/imageAction'
import ImageGallery from '../../components/ImageGallery'
import HomeText from '../../components/HomeText'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import './HomePage.css'
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
      <div id="hometextblock">
        <HomeText />
        <div>
          <Link to="/user-images"><Button>Mes images</Button></Link>
        </div>
      </div>
      <h2 className="mb-5 mt-5">5 dernières images !</h2>
      <ImageGallery images={userImages} refresh={handleRefresh} sortByDate={false} />
      <div className="mb-5" />
    </Wrapper>
  )
}

export default HomePage
