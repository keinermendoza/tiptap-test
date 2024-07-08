import React from "react";
import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";


const fileTypes = ["JPEG", "PNG", "GIF"];

export default function Drop() {
  const [file, setFile] = useState(null);
  const handleChange = (file) => {
    setFile(file);
  };
  return (
    <div className="App">
      <h1>Hello To Drag & Drop Files</h1>
      <FileUploader
        multiple={true}
        handleChange={handleChange}
        name="file"
        types={fileTypes}
      />
      <p>{file ? `File name: ${file[0].name}` : "no files uploaded yet"}</p>
    </div>
  );
}
