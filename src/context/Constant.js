import Contract from "../blockchain/contract/VF.json"; //have to change
import MANTokenContract from "../blockchain/contract/MANToken.json";

export const contractAddress = "0xb4d66Cb1665A1249ED3cdF4546fFa3205a3Fd795"; //have to change
export const contractAbi = Contract.abi;

export const manTokenContractAddress =
  "0x8c223B0A6fE4D8837568Eeee0C7865501fc317e0";
export const manTokenContractAbi = MANTokenContract.abi;

export const hostServer = import.meta.env.VITE_REACT_APP_SERVER_URL;
