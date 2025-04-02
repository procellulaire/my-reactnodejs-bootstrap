#   CRETAE REACT APP Before
# cd ../client
# npx create-react-app .
# npm install axios
# cd ..
#
CREATE BASIC FOR COMPONENT 
// client/src/App.js
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [file, setFile] = useState(null);
  const [uploadResult, setUploadResult] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setUploadResult(response.data);
    } catch (error) {
      console.error('Upload error:', error);
      setUploadResult({ message: 'Upload failed.' });
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {uploadResult && (
        <div>
          <p>{uploadResult.message}</p>
          {uploadResult.filename && <p>Filename: {uploadResult.filename}</p>}
          {uploadResult.fileType && <p>File Type: {uploadResult.fileType}</p>}
        </div>
      )}
    </div>
  );
}

export default App;
