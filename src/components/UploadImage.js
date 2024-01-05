import React, { useRef, useState } from 'react';

function UploadImage({ setImage, image, setFileName, fileName }) {
  const inputRef = useRef();

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    handleImage(file);
  };

  const handleFileChange = ({ target: { files } }) => {
    if (files.length > 0) {
      setFileName(files[0].name);
      setImage(files[0]); // Store the file itself, not a blob URL
    }
  };

  const handleImage = (file) => {
    if (file) {
      setFileName(file.name);
      setImage(file);
    }
  };

  return (
    <>
      <h5 style={{ fontWeight: 'bold' }} className="mb-2">
        ატვირთეთ ფოტო
      </h5>
      <div
        style={{
          border: '2px dashed #85858D',
          height: '220px',
        }}
      >
        <div
          className="d-flex flex-column justify-content-center align-items-center  border p-4 rounded-4 h-100 "
          style={{
            background: '#F4F3FF',
          }}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            hidden
            accept="image/*"
            ref={inputRef}
          />
          <button
            onClick={() => inputRef.current.click()}
            style={{
              border: 'none',
              background: '#F4F3FF',
            }}
          >
            {image ? (
              <img src={image} width={60} height={60} alt={fileName} />
            ) : (
              <img src="/assets/upload.png" alt="upload" />
            )}
          </button>

          {image ? (
            <span>
              {fileName}
              <img
                src="/assets/close.png"
                className="m-2 bg-secondary"
                alt="close"
                onClick={() => {
                  setFileName('No selected file');
                  setImage(null);
                }}
              />
            </span>
          ) : (
            <h5 className="mt-4">
              ჩააგდეთ ფაილი აქ ან{' '}
              <span
                style={{
                  fontWeight: 'bold',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                }}
                onClick={() => inputRef.current.click()}
              >
                აირჩიეთ ფაილი
              </span>{' '}
            </h5>
          )}
        </div>
      </div>
    </>
  );
}

export default UploadImage;
