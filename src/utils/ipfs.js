import axios from 'axios';

const pinataBaseUrl = 'https://api.pinata.cloud/pinning';
const pinataApiKey = '0d36bdb8c811216cbe08';
const pinataSecretApiKey = 'fd0bc7a2d64e78f6e4cb920e788851a3b97bb61a313b426b314b59b7ef1a1bc9';

const uploadFileToIPFS = async (file) => {
    console.log(file);
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post(
      `${pinataBaseUrl}/pinFileToIPFS`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          pinata_api_key: pinataApiKey,
          pinata_secret_api_key: pinataSecretApiKey,
        },
      }
    );

    return response.data.IpfsHash;
  } catch (error) {
    throw new Error('Error uploading file to Pinata IPFS');
  }
};

const getFileFromIPFS = async (ipfsHash) => {
  try {
    const response = await axios.get(
      `${pinataBaseUrl}/ipfs/${ipfsHash}`,
      {
        headers: {
          pinata_api_key: pinataApiKey,
          pinata_secret_api_key: pinataSecretApiKey,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error('Error fetching file from Pinata IPFS');
  }
};

export { uploadFileToIPFS, getFileFromIPFS };
