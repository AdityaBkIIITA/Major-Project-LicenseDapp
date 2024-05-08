import Web3 from 'web3';
import registerContractAbi from '../abis/Register.json';
import commentContractAbi from '../abis/Comment.json';
import licenseContractAbi from '../abis/License.json';
import fileContractAbi from '../abis/File.json';

const web3 = new Web3(window.ethereum);

const getRegisterContract = async () => {
    const contractAddress = '0x3d58497AAC04231B0EB4BFC8Ac185A774748ddd9';
    const contract = new web3.eth.Contract(registerContractAbi.abi, contractAddress);
    return contract;
}

const getCommentContract = async () => {
    const contractAddress = '0x4B9A87Bc50bE956F682401DaC64720d3E19B8f41';
    const contract = new web3.eth.Contract(commentContractAbi.abi, contractAddress);
    return contract;
}

const getLicenseContract = async () => {
    const contractAddress = '0xef86d2EAd32E2814E988F50dFb70Ed9e8fCbFEBA';
    const contract = new web3.eth.Contract(licenseContractAbi.abi, contractAddress);
    return contract;
}

const getFileContract = async () => {
    const contractAddress = '0x1F2EDC9b999547a77c56d82FCbC966B889B1C5dd';
    const contract = new web3.eth.Contract(fileContractAbi.abi, contractAddress);
    return contract;
}

export {getRegisterContract, getCommentContract, getLicenseContract, getFileContract };
