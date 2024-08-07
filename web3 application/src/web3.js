import Web3 from "web3";

// MetaMask tarafından sağlanan web3'ü yüklediğimiz kısım
const web3 = new Web3(window.ethereum);

// MetaMask ile bağlantı kurma
// window.ethereum.request({ method: "eth_requestAccounts" }).then(accounts => {
//     console.log("MetaMask Account:", accounts[0]);
// });

export default web3;
