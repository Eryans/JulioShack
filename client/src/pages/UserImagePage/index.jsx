import { useEffect, useState } from 'react'
import { getUserImage } from '../../actions/imageAction'
import Wrapper from '../../components/Wrapper'
import { AuthState } from '../../context/AuthProvider'
import ImageGallery from '../../components/ImageGallery'
import MulterInput from '../../components/MulterInput'

const UserImagepage = () => {
  const [userImages, setUserImages] = useState([])
  const { auth } = AuthState()
  useEffect(() => {
    const fetchImage = async () => {
      const images = await getUserImage(auth._id)
      if (images) setUserImages(images.data)
    }
    fetchImage()
  }, [auth])

  return (
    <Wrapper>
      <div className="d-flex flex-column gap-5 align-items-center">
        <h1 className="text-center">
          Le Carrousel Épique de l'Imaginarium Visuel
        </h1>
        <MulterInput />
        <ImageGallery images={userImages} />
      </div>
    </Wrapper>
  )
}

export default UserImagepage
