# my-reactnodejs-bootstrap

This project is a bootstrap for a React and Node.js application that allows users to upload files and analyze their file types.
By. Fernado Cabal  02 April 2025

## Installation

1.  Clone the repository:

    ```bash
    git clone <repository_url>
    cd my-reactnodejs-bootstrap
    ```

2.  Install server dependencies:

    ```bash
    cd server
    npm install
    ```

3.  Install client dependencies:

    ```bash
    cd ../client
    npm install
    ```

4.  Create a `.env` file in the `server` directory and add:

    ```
    PORT=5000
    ```

## Usage

1.  Start the Node.js server:

    ```bash
    cd server
    node server.js
    ```

2.  Start the React development server:

    ```bash
    cd ../client
    npm start
    ```

3.  Open your browser at `http://localhost:3000`.

4.  Select a file using the file input and click "Upload".

5.  The application will display the upload progress, file type, and other relevant information.

## Security Considerations

* File size is limited to 5MB to prevent large uploads.
* `file-type` library is used for reliable file type detection.
* The server only returns the filename and the file type, it does not store the files persistently.

## Enhancements

* Improved file type detection using `file-type`.
* Progress bar during file upload.
* Enhanced UI/UX using React Bootstrap.
* Error handling for upload failures.
* File size limit of 5MB.

## Roadmap

* Add database integration to store file metadata.
* Implement more robust error handling.
* Add unit and integration tests.
* Deployment documentation.
* Add more security features.
* Convert to typescript.

