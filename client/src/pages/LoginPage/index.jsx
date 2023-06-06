import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Button, Spinner } from 'react-bootstrap'

import { AuthState } from '../../context/AuthProvider'
import { Notify } from '../../utils'
import IMAGES from '../../assets'

const LoginPage = () => {
  const [credentials, setCredentials] = useState({
    name: '',
    password: '',
  })
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()
  const { setAuth } = AuthState()
  
  useEffect(() => {
    const auth =
      localStorage.getItem('auth') !== null &&
      new Date() < new Date(JSON.parse(localStorage.getItem('auth')).expires_at)
        ? JSON.parse(localStorage.getItem('auth'))
        : null

        if (auth) navigate('/')
  }, [navigate])

  const handleCredentials = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  const loginHandler = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    // If any field is missing
    if (!credentials.name || !credentials.password) {
      setIsLoading(false)
      return Notify('Please Fill all the Feilds', 'warn')
    }

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: credentials.name,
          password: credentials.password,
        }),
      })
      const data = await response.json()

      if (data.success) {
        localStorage.setItem('auth', JSON.stringify(data)) // Save auth details in local storage
        setAuth(data)
        setIsLoading(false)
        navigate('/') // Go to home page
        return Notify('You are successfully logged in', 'success')
      } else {
        setIsLoading(false)
        return Notify(data.error, 'warn')
      }
    } catch (error) {
      setIsLoading(false)
      return Notify('Internal server error', 'error')
    }
  }

  return (
    <Form className="auth__form" onSubmit={loginHandler} style={{
      backgroundColor: "rgba(0,0,0,.4)",
    }}>
      <div className="d-flex flex-column justify-content-center align-items-center">
        <h3 className="text-center mb-5">
          Connexion à votre <br /> compte JulioShack
        </h3>
        <img
          alt="Julio Shack"
          src={IMAGES.julio}
          width="150"
          height="150"
          className="d-inline-block align-top"
        />
        <h2>
          The best image app
          <br /> for shitpost purpose
        </h2>
      </div>
      <Form.Group className="mb-3" controlId="name">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          name="name"
          tabIndex="1"
          placeholder="Enter username"
          value={credentials.name}
          onChange={(e) => handleCredentials(e)}
        />
      </Form.Group>

      <Form.Group controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          tabIndex="2"
          placeholder="Password"
          value={credentials.password}
          onChange={(e) => handleCredentials(e)}
        />
      </Form.Group>

      <Button
        variant="success"
        type="submit"
        tabIndex="3"
        className="mb-3 mt-3"
        disabled={isLoading}
      >
        {isLoading ? (
          <Spinner animation="border" role="status" size="sm" />
        ) : (
          'CONNEXION TAVU'
        )}
      </Button>

      <Form.Group className="mb-3 text-center" controlId="register">
        <span>
          Po de compte mon ptio?&nbsp;
          <Link to="/register" tabIndex="5" className="text-decoration-none">
            S'inscrire
          </Link>
        </span>
      </Form.Group>
    </Form>
  )
}

export default LoginPage
