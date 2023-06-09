import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Button, Spinner, Image } from 'react-bootstrap'

import { AuthState } from '../../context/AuthProvider'
import { Notify } from '../../utils'
import IMAGES from '../../assets'

const RegisterPage = () => {
  const [credentials, setCredentials] = useState({
    name: '',
    password: '',
    confirmPassword: '',
    profilePic: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [imagePreview, setimagePreview] = useState(IMAGES.user) // Default image for preview

  const navigate = useNavigate()
  const { setAuth } = AuthState()

  const handleCredentials = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  const handleProfilePic = async (e) => {
    setIsLoading(true)
    const profilePic = e.target.files[0] // Get the file

    // Check file type
    if (
      profilePic.type !== 'image/jpeg' &&
      profilePic.type !== 'image/jpg' &&
      profilePic.type !== 'image/png'
    ) {
      e.target.value = null // Clear upload field
      setimagePreview(IMAGES.user)
      setIsLoading(false)
      return Notify('Only .jpeg, .jpg and .png supported', 'warn')
    }

    // Check file size
    if (profilePic.size > 1 * 1024 * 1024) {
      e.target.value = null // Clear upload field
      setimagePreview(IMAGES.user)
      setIsLoading(false)
      return Notify('Please upload image under 1 MB', 'warn')
    }

    try {
      setCredentials({
        ...credentials,
        profilePic: profilePic, // Store the actual file
      })
      setimagePreview(URL.createObjectURL(profilePic)) // Use object URL for preview
      setIsLoading(false)
      return Notify('Profile picture uploaded', 'success')
    } catch (error) {
      e.target.value = null // Clear upload field
      setimagePreview(IMAGES.user)
      setIsLoading(false)
      return Notify('Internal server error', 'error')
    }
  }

  const registerHandler = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    // If any field is missing
    if (
      !credentials.name ||
      !credentials.password ||
      !credentials.confirmPassword
    ) {
      setIsLoading(false)
      return Notify('Please Fill all the Feilds', 'warn')
    }

    // If password and confirm password doesn't match
    if (credentials.password !== credentials.confirmPassword) {
      setIsLoading(false)
      return Notify('Passwords Do Not Match', 'warn')
    }

    // If password is less than 8 characters
    if (credentials.password.length < 8) {
      setIsLoading(false)
      return Notify('Password must be at least 8 characters', 'warn')
    }

    try {
      // Register user
      const formData = new FormData()
      formData.append('profilePic', credentials.profilePic)
      formData.append('name', credentials.name)
      formData.append('password', credentials.password)
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        body: formData,
      })
      const data = await response.json()

      if (data.success) {
        localStorage.setItem('auth', JSON.stringify(data)) // Save auth details in local storage
        setAuth(data)
        setIsLoading(false)
        navigate('/') // Go to home page
        return Notify('Your account has been successfully created', 'success')
      } else {
        setIsLoading(false)
        return Notify(data.error, 'error')
      }
    } catch (error) {
      setIsLoading(false)
      return Notify('Internal server error', 'error')
    }
  }

  return (
    <Form className="auth__form" onSubmit={registerHandler}  encType="multipart/form-data">
      <h2 className="text-center mb-5">Create new account</h2>

      <Form.Group className="mb-3 d-flex justify-content-center">
        <Image
          id="profilePicUpload"
          src={imagePreview}
          alt="Profile image"
          draggable="false"
          style={{ objectFit: 'cover' }}
          roundedCircle
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="name">
        <Form.Label>Userame</Form.Label>
        <Form.Control
          type="text"
          name="name"
          tabIndex="1"
          placeholder="Full name"
          value={credentials.name}
          onChange={(e) => handleCredentials(e)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          tabIndex="3"
          placeholder="Password"
          value={credentials.password}
          onChange={(e) => handleCredentials(e)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="confirmPassword">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          type="password"
          name="confirmPassword"
          tabIndex="4"
          placeholder="Confirm password"
          value={credentials.confirmPassword}
          onChange={(e) => handleCredentials(e)}
        />
      </Form.Group>

      <Form.Group controlId="profilePic" className="mb-3">
        <Form.Label>Upload profile picture</Form.Label>
        <Form.Control
          type="file"
          accept="image/jpeg, image/jpg, image/png"
          name="profilePic"
          tabIndex="5"
          size="sm"
          onChange={(e) => handleProfilePic(e)}
        />
      </Form.Group>

      <Button
        tabIndex="6"
        variant="success"
        type="submit"
        className="mb-3"
        disabled={isLoading}
      >
        {isLoading ? (
          <Spinner animation="border" role="status" size="sm" />
        ) : (
          'Create Account'
        )}
      </Button>

      <Form.Group className="mb-3 text-center" controlId="register">
        <span>
          Already have an account?&nbsp;
          <Link to="/login" tabIndex="6" className="text-decoration-none">
            Log in
          </Link>
        </span>
      </Form.Group>
    </Form>
  )
}

export default RegisterPage
