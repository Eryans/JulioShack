import { useContext, useState, useEffect } from 'react'
import { createContext } from 'react'
import axios from 'axios'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(
    localStorage.getItem('auth') !== null &&
      new Date() < new Date(JSON.parse(localStorage.getItem('auth')).expires_at)
      ? JSON.parse(localStorage.getItem('auth'))
      : null,
  )

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === 'auth') {
        const newAuth = JSON.parse(event.newValue)
        setAuth(newAuth)
      }
    }

    if (auth) {

      const token = auth.token
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }
    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [auth])

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const AuthState = () => {
  return useContext(AuthContext)
}

export default AuthProvider
