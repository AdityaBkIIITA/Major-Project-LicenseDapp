import React, { useState } from 'react';
import { uploadFileToIPFS } from '../../utils/ipfs';
import { addFileToContract } from '../../utils/web3';

function AddFile() {
  const [file, setFile] = useState(null);
  const [ipfsHash, setIpfsHash] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    try {
      const ipfsHash = await uploadFileToIPFS(file);
      setIpfsHash(ipfsHash);
      await addFileToContract(ipfsHash, file.name, file.type, 'dateAdded', 'timeAdded', file.size, 'deviceId');
      // Handle successful file upload
    } catch (error) {
      console.error(error);
      // Handle file upload error
    }
  };

  return (
    <div>
      <h2>Add File</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Upload File</button>
      {ipfsHash && <p>IPFS Hash: {ipfsHash}</p>}
    </div>
  );
}

export default AddFile;
