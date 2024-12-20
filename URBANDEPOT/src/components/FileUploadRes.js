import React, { useState } from "react";
import "./FileUploadRes.css";

const uploadIcon = './drag-and-drop.png';

const FileUploadRes = ({ onFileChange, label, required, id }) => {
  const [files, setFiles] = useState([]);

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    console.log("Dropped files:", droppedFiles);
    setFiles(droppedFiles);
    if (droppedFiles.length > 0) {
      handleFileChange(droppedFiles[0], id);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleFileChange = (file, id) => {
    if (file) {
      console.log(`File received in ${id}:`, file);
      setFiles([file]);
      onFileChange(file, id);
    } else {
      console.error("No file was passed to handleFileChange.");
    }
  };

  const renderFilePreview = (file) => {
    if (file.type.startsWith("image/")) {
      return <img src={URL.createObjectURL(file)} alt={file.name} className="preview-img1" />;
    } else if (file.type === "application/pdf") {
      return (
        <div className="pdf-preview1">
          <i className="fa fa-file-pdf-o" aria-hidden="true"></i> {/* PDF icon */}
          <a href={URL.createObjectURL(file)} target="_blank" rel="noopener noreferrer" className="file-name1">
            {file.name}
          </a>
        </div>
      );
    } else {
      return <span className="file-name1">{file.name}</span>; // Changed from file-name to file-name1
    }
  };

  return (
    <div className="file-upload1"> {/* Updated class name */}
      {required && <span className="required-asterisk1">*</span>} {/* Separate span for the asterisk */}
      <div
        className="drop-box1"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => document.getElementById(`fileInput_${id}`).click()}
      >
        {files.length === 0 ? (
          <div className="upload-placeholder1"> {/* Updated class name */}
            <img src={uploadIcon} alt="Upload" className="upload-icon1" /> {/* Updated class name */}
            <span className="upload-text1">Drag and drop here</span> {/* Updated class name */}
          </div>
        ) : (
          <div className="preview-section1"> {/* Updated class name */}
            {files.map((file, index) => (
              <div key={index} className="file-preview1"> {/* Updated class name */}
                {renderFilePreview(file)}
              </div>
            ))}
          </div>
        )}
        <input
          type="file"
          id={`fileInput_${id}`}
          onChange={(e) => handleFileChange(e.target.files[0], id)}
          style={{ display: 'none' }}
        />
      </div>
    </div>
  );
};

export default FileUploadRes;
