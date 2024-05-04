// web3Utils.js

import Web3 from 'web3';

const setupWeb3 = async () => {
  // Initialize Web3 provider
  if (window.ethereum) {
    // Modern dapp browsers
    window.web3 = new Web3(window.ethereum);
    try {
      // Request account access if needed
      await window.ethereum.enable();
      console.log('Web3 initialized');
      return window.web3;
    } catch (error) {
      console.error('User denied account access:', error);
      throw new Error('User denied account access');
    }
  } else if (window.web3) {
    // Legacy dapp browsers
    window.web3 = new Web3(window.web3.currentProvider);
    console.log('Web3 initialized');
    return window.web3;
  } else {
    // Non-dapp browsers
    console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    throw new Error('Non-Ethereum browser detected');
  }
};

const getAccount = async () => {
  const web3 = await setupWeb3();
  const accounts = await web3.eth.getAccounts();
  if (accounts.length === 0) {
    throw new Error('No accounts found');
  }
  return accounts[0];
};

export { setupWeb3, getAccount };
