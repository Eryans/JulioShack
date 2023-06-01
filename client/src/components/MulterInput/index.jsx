import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const FileUploadForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('image', selectedFile);

    // Envoyer formData vers votre API pour gérer l'upload avec Multer
    // Exemple avec fetch :
    fetch('/api/auth/upload', {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        // Faire quelque chose avec la réponse du serveur
      })
      .catch(error => {
        console.error(error);
        // Gérer les erreurs
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="fileUpload">
        <Form.Label>Choisir un fichier</Form.Label>
        <Form.Control type="file" onChange={handleFileChange} />
      </Form.Group>
      <Button type="submit">Envoyer</Button>
    </Form>
  );
};

export default FileUploadForm;
