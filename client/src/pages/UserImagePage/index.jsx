import { useEffect, useState } from 'react'
import { getUserImage } from '../../actions/imageAction'
import Wrapper from '../../components/Wrapper'
import { AuthState } from '../../context/AuthProvider'
import ImageGallery from '../../components/ImageGallery'
import MulterInput from '../../components/MulterInput'

const UserImagepage = () => {
  const [userImages, setUserImages] = useState([])
  const [refresh, setRefresh] = useState(false)

  const handleRefresh = () => {
    setRefresh(!refresh)
  }
  const { auth } = AuthState()
  useEffect(() => {
    const fetchImage = async () => {
      const images = await getUserImage(auth._id)
      if (images) setUserImages(images.data)
    }
    fetchImage()
  }, [auth, refresh])

  return (
    <Wrapper>
      <div className="d-flex flex-column gap-5 align-items-center mb-5">
        <h1 className="text-center">
          Le Carrousel Épique de votre Imaginarium Visuel
        </h1>
        <MulterInput refresh={handleRefresh} />
        <ImageGallery images={userImages} refresh={handleRefresh} allowOptionForm={true} />
      </div>
    </Wrapper>
  )
}

export default UserImagepage
