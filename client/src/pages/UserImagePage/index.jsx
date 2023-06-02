import {  useEffect, useState } from 'react'
import getUserImage from '../../actions/imageAction'
import Wrapper from '../../components/Wrapper'
import { AuthState } from '../../context/AuthProvider'

const UserImagepage = () => {
  const [userImages, setUserImages] = useState([])
  const auth = AuthState()
  useEffect(() => {
    const fetchImage = async () => {
      const images = await getUserImage(auth.auth._id)
      if (images) setUserImages(images)
    }
    fetchImage()
  }, [auth])

  return (
    <Wrapper>
      <h1>Hello World</h1>
    </Wrapper>
  )
}

export default UserImagepage
