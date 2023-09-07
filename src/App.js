import React, { useState, useEffect } from 'react';
import './App.css';
import Web3 from 'web3';

const CONTRACT_ABI = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "tokenAddress",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "deadWallet",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "BurnedAmountUpdated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "tokenAddress",
				"type": "address"
			}
		],
		"name": "TokenAddressUpdated",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "getBurnedAmount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "tokenAddress",
				"type": "address"
			}
		],
		"name": "setTokenAddress",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "updateBurnedAmount",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];

const CONTRACT_ADDRESS = '0x59Ba3aa7f8f7C48cF6961e8c2b133D4D408429D9';
const BSC_MAINNET_RPC_URL = 'https://bsc-dataseed1.binance.org/';
const TOTAL_SUPPLY = 10000000000000000000000; // Total supply of tokens

function App() {
  const [burnAmount, setBurnAmount] = useState(0);

  useEffect(() => {
    async function getBurnedAmount() {
      try {
        console.log("Creating Web3 instance...");
        const web3Instance = new Web3(BSC_MAINNET_RPC_URL);
        console.log("Web3 instance created:", web3Instance);

        console.log("Creating Contract instance...");
        const contract = new web3Instance.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
        console.log("Contract instance created:", contract);

        console.log("Calling getBurnedAmount()...");
        const currentBurnAmount = await contract.methods.getBurnedAmount().call();
        console.log("Current burn amount retrieved:", currentBurnAmount);

        setBurnAmount(currentBurnAmount);
      } catch (error) {
        console.error("Error retrieving burn amount:", error);
      }
    }

    console.log("Getting initial burn amount...");
    getBurnedAmount();

    console.log("Setting interval for burn amount updates...");
    const intervalId = setInterval(() => {
      getBurnedAmount();
    }, 10000);

    return () => clearInterval(intervalId);
  }, []);

  const TOTAL_SUPPLYWithCommas = TOTAL_SUPPLY ? TOTAL_SUPPLY.toLocaleString() : null;
  const remainingSupply = burnAmount ? (TOTAL_SUPPLY - burnAmount) : null;
  const remainingSupplyWithCommas = remainingSupply ? remainingSupply.toLocaleString() : null;
  const burnPercentage = burnAmount ? ((burnAmount / TOTAL_SUPPLY) * 100).toFixed(2) : 0;
  const remainingPercentage = remainingSupply ? ((remainingSupply / TOTAL_SUPPLY) * 100).toFixed(2) : 0;
  const washAmount = burnAmount ? ((burnAmount * 2) / 2) : null;
  const washAmountWithCommas = washAmount ? washAmount.toLocaleString() : null;

  return (
    <div className="App">
      <h1>Shibmoon Burn Tracker</h1>
      {burnAmount ? (
        <>
		  <p>Total Supply: {TOTAL_SUPPLYWithCommas}</p>
          <p>Total Burn Amount: {washAmountWithCommas}</p>
          <p>Remaining Supply: {remainingSupplyWithCommas}</p>
          <p>Burn Percentage: {burnPercentage}%</p>
          <p>Remaining Percentage: {remainingPercentage}%</p>
        </>
      ) : (
        <p>Failed to retrieve burn amount. Please try again later.</p>
      )}
    </div>
  );
}

export default App;
