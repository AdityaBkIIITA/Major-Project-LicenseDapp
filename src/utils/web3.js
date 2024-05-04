import Web3 from 'web3';
import contractAbi from '../abis/Main.json'; // Assuming you have the contract ABI in a JSON file

const getContractInstance = async () => {
    const web3 = new Web3(window.ethereum);
    // Get contract instance
    const contractAddress = '0x0Ac27d94A07263bD819220D2cd18eAbBE935424b'; // Replace with your contract address
    const contract = new web3.eth.Contract(contractAbi.abi, contractAddress);
    return contract;
  };
  

const addFileToContract = async (ipfsHash, fileName, fileType, dateAdded, timeAdded, fileSize, deviceId) => {
  const contract = await getContractInstance();
  const accounts = await Web3.eth.getAccounts();
  
  await contract.methods.addFile(
    accounts[0],
    ipfsHash,
    fileName,
    fileType,
    dateAdded,
    timeAdded,
    fileSize,
    deviceId
  ).send({ from: accounts[0] });
  
  console.log('File added to contract successfully');
};

const getFileList = async () => {
  const contract = await getContractInstance();
  const files = await contract.methods.getFiles().call();
  console.log('Files fetched from contract:', files);
  return files;
};

const signInUser = async (address) => {
  // Implementation to sign in the user using MetaMask or other wallet
  console.log('User signed in with address:', address);
  return { address };
};

const signUpUser = async (address) => {
  // Implementation to sign up the user using MetaMask or other wallet
  console.log('User signed up with address:', address);
  return { address };
};

export { addFileToContract, getFileList, signInUser, signUpUser };
