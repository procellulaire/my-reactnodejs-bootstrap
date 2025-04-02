// client/src/App.js
import React, { useState } from 'react';
import axios from 'axios';
import { ProgressBar, Alert, Form, Button, Container } from 'react-bootstrap';
import { BeatLoader } from 'react-spinners';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [file, setFile] = useState(null);
  const [uploadResult, setUploadResult] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setError(null);
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file.');
      return;
    }

    setLoading(true);
    setUploadProgress(0);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(percentCompleted);
        },
      });
      setUploadResult(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Upload error:', err);
      setError(err.response?.data || 'Upload failed.');
      setLoading(false);
      setUploadProgress(0);
    }
  };

  return (
    <Container className="mt-5">
      <Form>
        <Form.Group>
          <Form.Label>Upload File</Form.Label>
          <Form.Control type="file" onChange={handleFileChange} />
        </Form.Group>
        <Button variant="primary" onClick={handleUpload} disabled={loading}>
          Upload
        </Button>
      </Form>

      {loading && (
        <div className="text-center mt-3">
          <BeatLoader color="#36D7B7" />
          <ProgressBar now={uploadProgress} className="mt-2" />
        </div>
      )}

      {error && <Alert variant="danger" className="mt-3">{error}</Alert>}

      {uploadResult && (
        <div className="mt-3">
          <Alert variant="success">
            <p>{uploadResult.message}</p>
            <p>Filename: {uploadResult.filename}</p>
            <p>File Type: {uploadResult.fileType}</p>
            <p>MIME Type: {uploadResult.mimeType}</p>
          </Alert>
        </div>
      )}
    </Container>
  );
}

export default App;
  
