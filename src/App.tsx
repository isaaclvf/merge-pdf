import React, { useState } from "react";
import "./App.css";
import MergeButton from "./MergeButton";

function App() {
  const [files, setFiles] = useState<File[]>([]);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const newFiles = [...files, ...Array.from(e.dataTransfer.files)];
    setFiles(newFiles);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = [...files, ...Array.from(e.target.files || [])];
    setFiles(newFiles);
  };

  const handleRemoveFile = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const newFiles = [...files];
    [newFiles[index - 1], newFiles[index]] = [
      newFiles[index],
      newFiles[index - 1],
    ];
    setFiles(newFiles);
  };

  const handleMoveDown = (index: number) => {
    if (index === files.length - 1) return;
    const newFiles = [...files];
    [newFiles[index], newFiles[index + 1]] = [
      newFiles[index + 1],
      newFiles[index],
    ];
    setFiles(newFiles);
  };

  return (
    <div className="App">
      <div
        className="drop-zone"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        {files.length > 0 ? (
          <ul>
            {files.map((file, index) => (
              <li key={index}>
                File {index + 1}: {file.name}
                <button
                  onClick={() => handleMoveUp(index)}
                  disabled={index === 0}
                >
                  Up
                </button>
                <button
                  onClick={() => handleMoveDown(index)}
                  disabled={index === files.length - 1}
                >
                  Down
                </button>
                <button onClick={() => handleRemoveFile(index)}>Remove</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>Drag and drop PDF files here, or click to select files</p>
        )}
        <input
          type="file"
          accept="application/pdf"
          multiple
          onChange={handleFileChange}
        />
        {files.length > 0 && <MergeButton files={files} />}
      </div>
    </div>
  );
}

export default App;
