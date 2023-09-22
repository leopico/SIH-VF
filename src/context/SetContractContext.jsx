import Web3Modal from "web3modal";
import { Contract, ethers, formatEther, parseEther } from "ethers";
import { createContext, useContext } from "react";
import PropTypes from "prop-types";
import {
  contractAddress,
  contractAbi,
  manTokenContractAddress,
  manTokenContractAbi,
} from "./Constant";
import MessageContext from "./MessageContext";
import SetAuthContext from "./SetAuthContext";
import BigNumber from "bignumber.js";
import axios from "axios";
import { hostServer } from "./Constant";

const connectWithContract = async () => {
  try {
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.BrowserProvider(connection);
    const signer = await provider.getSigner();
    const contract = new Contract(contractAddress, contractAbi, signer);
    return contract;
  } catch (error) {
    console.log(error);
  }
};

const connectWithManTokenContract = async () => {
  try {
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.BrowserProvider(connection);
    const signer = await provider.getSigner();
    const manTokenContract = new Contract(
      manTokenContractAddress,
      manTokenContractAbi,
      signer
    );
    return manTokenContract;
  } catch (error) {
    console.log(error);
  }
};

const SetContractContext = createContext();

export const SetContractContextProvider = (props) => {
  const { setMessage } = useContext(MessageContext);
  const { profileId, handleAuth, address } = useContext(SetAuthContext);

  //interact with contract to getting the seed
  const getSeed = async (setLoader) => {
    try {
      if (!profileId) {
        await handleAuth(setLoader);
      } else {
        setLoader(true);
        const contract = await connectWithContract();
        const getseed = await contract.getSeed();
        const receipt = await getseed.wait();

        let tokenId;

        // Extract the tokenId from the Transfer event
        const transferEvent = await receipt.logs.find(
          (log) => log.eventName === "SeedMinted"
        );
        if (transferEvent) {
          const bigNumberTokenId = await receipt.logs[1].args[1];
          const stringTokenId = new BigNumber(bigNumberTokenId).toString();
          tokenId = parseInt(stringTokenId);
          // console.log(`Seed minted! Token ID: ${tokenId}`, typeof tokenId);
        }
        //here we go to store requirements data into our database
        await axios
          .post(`${hostServer}/send-seeddetails`, { tokenId, profileId })
          .then((res) => res.data);

        setLoader(false);
        setMessage({
          type: "success",
          message: `Seed minted! Token ID: ${tokenId}`,
        });
      }
    } catch (error) {
      setLoader(false);
      setMessage({
        type: "error",
        message: "You can't get seed properly!",
      });
    }
  };

  //interact with contract to giving the water
  const giveWater = async (
    setWaterLoader,
    selectedWaterTokenId,
    setSelectedWaterTokenId
  ) => {
    try {
      if (!profileId) {
        await handleAuth(setWaterLoader);
      } else if (!selectedWaterTokenId) {
        setMessage({
          type: "error",
          message: "You do not have tokenId",
        });
        return;
      } else {
        setWaterLoader(true);
        const contract = await connectWithContract();
        const getwater = await contract.giveWater(selectedWaterTokenId);
        await getwater.wait();
        //here we go to store requirements data into our database
        setSelectedWaterTokenId("");
        setWaterLoader(false);
        setMessage({
          type: "success",
          message: "You have given the water.",
        });
      }
    } catch (error) {
      setWaterLoader(false);
      setMessage({
        type: "error",
        message: "You can't give water properly!",
      });
    }
  };

  const minBalanceEther = 1;

  const applyManure = async (
    setManureLoader,
    selectedManureTokenId,
    setSelectedManureTokenId
  ) => {
    try {
      if (!profileId) {
        await handleAuth(setManureLoader);
        return;
      }

      const manToken = await connectWithManTokenContract();
      // console.log(manToken);
      if (!manToken) {
        setMessage({
          type: "error",
          message: "MAN token contract not initialized.",
        });
        return;
      }

      setManureLoader(true);
      const balanceWei = await manToken.balanceOf(address);
      const balanceEther = formatEther(balanceWei);
      // console.log(`Balance of ${address}: ${balanceEther} ETH`);

      if (parseFloat(balanceEther) > minBalanceEther) {
        const approveTx = await manToken.approve(
          contractAddress,
          parseEther("1")
        );
        await approveTx.wait();
        setMessage({
          type: "success",
          message: "Approved manure token!",
        });

        //this is only view function and we can not wait for this transcation
        //so that we can not apply manure in VF
        const vfContract = await connectWithContract();
        await vfContract.applyManure(selectedManureTokenId);
        // await tx.wait();
        setSelectedManureTokenId("");
        setManureLoader(false);
        setMessage({
          type: "success",
          message: "Manure added!",
        });
      } else {
        setSelectedManureTokenId("");
        setManureLoader(false);
        // Balance is not greater than 1 ETH, you can take another action here
        setMessage({
          type: "error",
          message: "You don't have enought manure!",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      setManureLoader(false);
      setMessage({
        type: "error",
        message: "Failed to add manure. Please try again.",
      });
    }
  };

  const handleMint = async (setMintLoader) => {
    try {
      if (!profileId) {
        await handleAuth(setMintLoader);
      }
      setMintLoader(true);
      setTimeout(() => {
        setMessage({
          type: "success",
          message: "Your Seed is not ready to become Tree  NFT",
        });
        setMintLoader(false);
      }, 2000);
    } catch (error) {
      console.log(error);
      setMintLoader(false);
      setMessage({
        type: "error",
        message: "Failed to mint NFT!",
      });
    }
  };

  return (
    <SetContractContext.Provider
      value={{ getSeed, giveWater, applyManure, handleMint }}
    >
      {props.children}
    </SetContractContext.Provider>
  );
};

// Define the propTypes for MessageContextProvider
SetContractContextProvider.propTypes = {
  children: PropTypes.node.isRequired, // Ensure children is provided and is a node
};

export default SetContractContext;
