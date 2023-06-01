import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { AuthState } from '../../context/AuthProvider'
import { Notify } from '../../utils'
import Wrapper from '../../components/Wrapper'

const HomePage = () => {
  const [privateMessage, setPrivateMessage] = useState('')

  const navigate = useNavigate()
  const { auth } = AuthState()

  const fetchPrivateDate = async () => {
    try {
      const response = await fetch('/api/private', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.token}`,
        },
      })
      const data = await response.json()

      if (data.success) {
        setPrivateMessage(data.data)
        return Notify(data.data, 'success')
      } else {
        navigate('/login')
        return Notify('You are not authorized please login', 'error')
      }
    } catch (error) {
      localStorage.removeItem('auth')
      navigate('/login')
      return Notify('Internal server error', 'error')
    }
  }

  useEffect(() => {
    fetchPrivateDate()
    // eslint-disable-next-line
  }, [])

  return (
    <Wrapper>
      <div>
        Welcome to our wacky world of image hosting madness!
        <br />
        Congratulations on successfully entering our chaotic realm where we
        embrace the art of shitposting with open arms. We're here to provide you
        with the best image app that caters to your wildest and most nonsensical
        needs.
        <br />
        Now that you're logged in, let us guide you through this madness with a
        quick tour of the various navigational wonders that await you:
        <br />
        <br />
        <ul>
        <li>
          1. "See My Images": This magical button will transport you to a realm
          where your personal collection of absurdity resides. Behold the
          masterpiece of your own creations, the treasure trove of memes and
          questionable photos. Explore and rediscover the twisted genius hidden
          within your own image gallery.
        </li>
        <li>
          2. "Browse Public Images": Venture into the vast expanse of public
          images created by fellow adventurers like yourself. Prepare to be
          amazed, bewildered, and possibly scarred for life by the bizarre and
          wonderful creations shared by our eclectic community.
        </li>
        <li>
          3. And right here, right now, on this very page, behold the power of
          "Upload an Image"! Unleash your creative juices and gift the world with
          your unique perspective. Whether it's a picture of a cat with a mustache
          or a mesmerizing kaleidoscope of colors, the choice is yours. Let your
          imagination run wild, and let the world gasp in awe!
        </li>
        </ul>
        So, buckle up and enjoy the rollercoaster ride that is our image hosting
        paradise. Embrace the absurdity, embrace the madness, and never hesitate
        to unleash your inner meme lord. Remember, in this realm, normality is
        nothing but a distant memory.
        <br />
        Happy exploring, fellow adventurer! And always remember, the weirder,
        the better!
        <br />
        P.S. Stay tuned for our upcoming feature that allows you to turn your
        images into GIFs that will make the world question its very existence.
        It's going to be mind-blowing!
      </div>
      <span>{privateMessage}</span>
    </Wrapper>
  )
}

export default HomePage
