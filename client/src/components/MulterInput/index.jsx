import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { uploadUserImage } from '../../actions/imageAction'
import { AuthState } from '../../context/AuthProvider'
import { Notify } from '../../utils'

const MulterInput = ({ refresh, canSetPrivacy = true }) => {
  const [selectedFile, setSelectedFile] = useState(null)
  const [isPrivate, setIsPrivate] = useState(false)

  const { auth } = AuthState()

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0])
  }

  const handleCheckboxChange = (event) => {
    setIsPrivate(event.target.checked)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData()
    formData.append('image', selectedFile)
    formData.append('isPrivate', isPrivate)
    // Envoyer formData vers votre API pour gérer l'upload avec Multer
    // Exemple avec fetch :
    uploadUserImage(auth._id, formData)
      .then((data) => {
        formData.delete('image')
        setSelectedFile(null)
        refresh()
        return Notify('Wouhou ! Image uploaday !', 'success')
        // Faire quelque chose avec la réponse du serveur
      })
      .catch((error) => {
        console.error(error)
        return Notify(error, 'warn')
        // Gérer les erreurs
      })
  }

  return (
    <Form onSubmit={handleSubmit} className='d-flex flex-column gap-3'>
      <Form.Group controlId="fileUpload">
        <Form.Label>Choisir un fichier</Form.Label>
        <Form.Control type="file" onChange={handleFileChange} />
      </Form.Group>
      {canSetPrivacy && (
        <Form.Group controlId="isPrivateCheckbox">
          <Form.Check
            type="checkbox"
            label="Fichier privé"
            checked={isPrivate}
            onChange={handleCheckboxChange}
          />
        </Form.Group>
      )}
      <Button type="submit">Envoyer</Button>
    </Form>
  )
}

export default MulterInput
