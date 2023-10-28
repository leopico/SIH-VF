import Web3Modal from "web3modal";
import { Contract, ethers } from "ethers";
import { createContext, useContext, useEffect, useReducer } from "react";
import PropTypes from "prop-types";
import {
  contractAddress,
  contractAbi,
} from "./Constant";
import MessageContext from "./MessageContext";
import SetAuthContext from "./SetAuthContext";
import BigNumber from "bignumber.js";
import axios from "axios";
import { hostServer } from "./Constant";
import { io } from "socket.io-client";

const socket = io(hostServer); //connect to server

const initialState = {
  seeds: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "INITIAL_SEED_DATA":
      return { seeds: action.payload };
    case "SEED_DATA":
      return { seeds: [...state.seeds, action.payload] };
    default:
      return state;
  }
}


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


const SetContractContext = createContext();

export const SetContractContextProvider = (props) => {
  const { setMessage } = useContext(MessageContext);
  const { profileId, handleAuth } = useContext(SetAuthContext);
  const [state, dispatch] = useReducer(reducer, initialState);
  const seeds = state.seeds;
  // console.log(seeds);

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
          .post(`${hostServer}/create-seed`, { tokenId, profileId })
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

        //here we go to store requirements data into our database
        await axios
          .post(`${hostServer}/water-seed`, { seedId: selectedWaterTokenId })
          .then((res) => res.data);

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

      setManureLoader(true);

      //here we go to store requirements data into our database
      await axios
        .post(`${hostServer}/apply-manure`, { seedId: selectedManureTokenId })
        .then((res) => res.data);

      setSelectedManureTokenId("");
      setManureLoader(false);
      setMessage({
        type: "success",
        message: "Manure added!",
      });

    } catch (error) {
      console.error("Error:", error);
      setManureLoader(false);
      setMessage({
        type: "error",
        message: "Failed to add manure. Please try again.",
      });
    }
  };

  useEffect(() => {
    if (profileId) {
      socket.emit("profileId", profileId);

      socket.on("initialSeedsData", (seeds) => {
        dispatch({ type: "INITIAL_SEED_DATA", payload: seeds });
      });

      socket.on("seedData", (seed) => {
        dispatch({ type: "SEED_DATA", payload: seed });
      });

      return () => {
        socket.disconnect();
      };
    }
  }, [profileId]);

  // Function to conditionally check if a seed can be minted
  const canMintTreeNFT = (seed) => {
    return seed.stage === "tree" && !seed.isTree;
  };


  const handleMint = async (setMintLoader, seedId) => {
    try {
      if (!profileId) {
        await handleAuth(setMintLoader);
      }
      setMintLoader(true);

      //trigger to mint to smart-contract for tree-nft

      //here we go to store requirements data into our database
      await axios
        .post(`${hostServer}/tree-nft`, { seedId, profileId })
        .then((res) => res.data);

      setMintLoader(false);
      setMessage({
        type: "success",
        message: `Tree minted! Token ID: ${seedId}`,
      });

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
      value={{ getSeed, giveWater, applyManure, handleMint, seeds, canMintTreeNFT }}
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
