import { useState } from 'react'
import {
  Container,
  Dropdown,
  DropdownButton,
  Image,
  Nav,
  Navbar,
} from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'

import IMAGES from '../../assets' // Importing images from single "IMAGES" object
import { AuthState } from '../../context/AuthProvider'
import ProfileModal from '../ProfileModal/ProfileModal'

import './NavigationBar.css'

const NavigationBar = () => {
  const [modalShow, setModalShow] = useState(false)
  const allLink = [
    { link: '/user-images', name: 'Mes images' },
    { link: '/public-images', name: 'Galerie' },
  ]
  const navigate = useNavigate()
  const { auth, setAuth } = AuthState()

  const logoutHandler = () => {
    localStorage.removeItem('auth')
    setAuth(null)
    return navigate('/login')
  }

  return (
    <Navbar collapseOnSelect expand="md" variant="dark" id="nav">
      <Container>
        <Navbar.Brand
          as={Link}
          to="/"
          className="d-flex justify-content-center align-items-center"
        >
          <img
            alt="Julio Shack"
            src={IMAGES.julio}
            width="60"
            height="60"
            className="d-inline-block align-top"
          />
          &nbsp;Julio Shack
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <span className='d-flex gap-3'>
          {allLink.map((obj) => (
            <Link to={obj.link} style={{color:'white'}}>{obj.name}</Link>
          ))}
        </span>
        <Navbar.Collapse className="justify-content-end">
          {auth ? (
            <DropdownButton
              variant=""
              align="end"
              title={
                <Image
                  id="profileDropdownIcon"
                  style={{ objectFit: 'cover' }}
                  src={auth.profilePic ? auth.profilePic.path : IMAGES.user}
                  alt="Navbar profile image"
                  roundedCircle
                />
              }
            >
              <Dropdown.Item as="button" onClick={() => setModalShow(true)}>
                Profile
              </Dropdown.Item>
              <ProfileModal
                show={modalShow}
                onHide={() => setModalShow(false)}
              />

              <Dropdown.Divider />

              <Dropdown.Item as="button" onClick={logoutHandler}>
                Log out
              </Dropdown.Item>
            </DropdownButton>
          ) : (
            <Nav.Item>
              <button
                className="nav-button me-2"
                onClick={() => navigate('/login')}
              >
                Log in
              </button>
              <button
                className="nav-button"
                onClick={() => navigate('/register')}
              >
                Register
              </button>
            </Nav.Item>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavigationBar
