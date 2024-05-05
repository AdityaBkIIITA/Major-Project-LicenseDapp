import Web3 from 'web3';
import contractAbi from '../abis/Main.json';
import registerContractAbi from '../abis/Register.json';
import commentContractAbi from '../abis/Comment.json';
import licenseContractAbi from '../abis/License.json';

const web3 = new Web3(window.ethereum);

const getContractInstance = async () => {
    const contractAddress = '0xaF53CDD6a4eB10E5ac0915Ec0b1F7C999f8DFfE3';
    const contract = new web3.eth.Contract(contractAbi.abi, contractAddress);
    return contract;
};

const getRegisterContract = async () => {
    const contractAddress = '0x1dA4B6f35a50fE9AFA885eEF660ab68cb84D18B5';
    const contract = new web3.eth.Contract(registerContractAbi.abi, contractAddress);
    return contract;
}

const getCommentContract = async () => {
    const contractAddress = '0xAa71df0e3826Ed5c688DBD1Dc79B0854a41D8B25';
    const contract = new web3.eth.Contract(commentContractAbi.abi, contractAddress);
    return contract;
}

const getLicenseContract = async () => {
    const contractAddress = '0xAa71df0e3826Ed5c688DBD1Dc79B0854a41D8B25';
    const contract = new web3.eth.Contract(licenseContractAbi.abi, contractAddress);
    return contract;
}

const addFileToContract = async (ipfsHash, fileName, fileType, dateAdded, timeAdded, fileSize, deviceId) => {
    const contract = await getContractInstance();
    const accounts = await web3.eth.getAccounts();
  
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

export { addFileToContract, getFileList, signInUser, signUpUser, getRegisterContract, getCommentContract, getLicenseContract };
