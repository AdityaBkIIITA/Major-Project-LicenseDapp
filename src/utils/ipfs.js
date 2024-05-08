import axios from 'axios';

const pinataBaseUrl = 'https://api.pinata.cloud/pinning';
const pinataApiKey = '02cfa4527b9bbb6385db';
const pinataSecretApiKey = 'ae97af71660003b1999ecfcb0a0664cec932bfe0b9614d9c47f404d1f9be10eb';

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
  // try {
  //   const response = await axios.get(
  //     `https://gateway.pinata.cloud/ipfs/${ipfsHash}`,
  //     {
  //       responseType: 'arraybuffer', // Set response type to arraybuffer
  //       headers: {
  //         'Authorization': `Bearer ${jwtToken}`, // Add the WT token as a Bearer token
  //       },
  //     }
  //   );

  //   // Extract MIME type from response headers
  //   const contentType = response.headers['content-type'];

  //   return {
  //     data: response.data, // File data as ArrayBuffer
  //     contentType: contentType, // MIME type of the file
  //   };
  // } catch (error) {
  //   throw new Error('Error fetching file from Pinata IPFS');
  // }

      const baseURL = "https://amaranth-dying-perch-686.mypinata.cloud/ipfs/";
      const url = `${baseURL}${ipfsHash}`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch IPFS content');
        }
        return response;
      } catch (error) {
        console.error('Error fetching IPFS content:', error);
      }
};

export { uploadFileToIPFS, getFileFromIPFS };
