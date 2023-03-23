import React, { useState } from "react";

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
              <li key={index}>File {index + 1}: {file.name}</li>
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
      </div>
    </div>
  );
}

export default App;
