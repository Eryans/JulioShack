import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { uploadUserImage } from '../../actions/imageAction'
import { AuthState } from '../../context/AuthProvider'
import { Notify } from '../../utils'
import { FileUploader } from "react-drag-drop-files";
import './multerinput.css'
const MulterInput = ({ refresh, canSetPrivacy = true , inputLabel="Choissisez ou glisser une image ici.  "}) => {
  const [selectedFile, setSelectedFile] = useState(null)
  const [isPrivate, setIsPrivate] = useState(false)
  const fileTypes = ["JPG", "PNG", "GIF"];
  const { auth } = AuthState()

  const handleFileChange = (file) => {
    setSelectedFile(file)
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
    <Form onSubmit={handleSubmit} className='d-flex flex-column gap-3' style={{maxWidth:'322px'}}>
      <Form.Group controlId="fileUpload">
        <FileUploader classes="uploader" handleChange={handleFileChange} name="file" types={fileTypes} label={inputLabel}/>
        
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
      <Button className="w-50 align-self-end" type="submit">Envoyer</Button>
    </Form>
  )
}

export default MulterInput
