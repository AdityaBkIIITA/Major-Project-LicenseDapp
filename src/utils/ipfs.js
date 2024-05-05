import axios from 'axios';

const pinataBaseUrl = 'https://api.pinata.cloud/pinning';
const pinataApiKey = '0d36bdb8c811216cbe08';
const pinataSecretApiKey = 'fd0bc7a2d64e78f6e4cb920e788851a3b97bb61a313b426b314b59b7ef1a1bc9';

const uploadFileToIPFS = async (file) => {
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
        responseType: 'arraybuffer', // Set response type to arraybuffer
        headers: {
          pinata_api_key: pinataApiKey,
          pinata_secret_api_key: pinataSecretApiKey,
        },
      }
    );

    // Extract MIME type from response headers
    const contentType = response.headers['content-type'];

    return {
      data: response.data, // File data as ArrayBuffer
      contentType: contentType, // MIME type of the file
    };
  } catch (error) {
    throw new Error('Error fetching file from Pinata IPFS');
  }
};

export { uploadFileToIPFS, getFileFromIPFS };
