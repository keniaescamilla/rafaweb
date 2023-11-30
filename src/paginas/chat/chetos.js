import React from 'react';
import './UploadModal.css'; // Asume que tienes un archivo CSS con este nombre

const UploadModal = () => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Welcome, Clara!</h2>
        <p>Upload your debut! Your first shot will appear on the <a href="/debuts">Debuts</a> page. If you delete your debut, your next shot won’t appear there. So make it count!</p>
        <div className="upload-instructions">
          Drag an image here or browse for an image to upload. JPG, GIF or PNG.
          Dribbble shots are 400 x 300 pixels or 800 x 600 (for HiDPI displays). If your image is bigger than the sizes above, we’ll help you crop it.
        </div>
        <button className="button-thanks">Thanks!</button>
      </div>
    </div>
  );
};

export default UploadModal;
