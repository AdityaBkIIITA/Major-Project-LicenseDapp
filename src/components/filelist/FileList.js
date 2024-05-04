// FileList.js

import React, { useState, useEffect } from 'react';
import { getFileList } from '../../utils/web3';
import { getFileFromIPFS } from '../../utils/ipfs';
import './FileList.css';

const FileList = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const fileList = await getFileList();
        setFiles(fileList);
      } catch (error) {
        console.error('Error fetching files:', error);
      }
    };

    fetchFiles();
  }, []);

  const handleDownload = async (ipfsHash, fileName) => {
    try {
      const fileBuffer = await getFileFromIPFS(ipfsHash);
      // Create a blob from the file buffer
      const blob = new Blob([fileBuffer]);
      // Create a temporary URL for the blob
      const url = URL.createObjectURL(blob);
      // Create a link element to trigger the download
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      // Simulate a click on the link to start the download
      link.click();
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  return (
    <div>
      <h2>File List</h2>
      <ul>
        {files.map((file, index) => (
          <li key={index}>
            <span>{file.fileName}</span>
            <button onClick={() => handleDownload(file.ipfsHash, file.fileName)}>Download</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileList;
