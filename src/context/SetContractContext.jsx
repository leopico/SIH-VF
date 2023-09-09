import Web3Modal from "web3modal";
import { Contract, ethers } from "ethers";
import { createContext, useContext } from "react";
import PropTypes from "prop-types";
import { contractAddress, contractAbi } from "./Constant";
import MessageContext from "./MessageContext";
import SetAuthContext from "./SetAuthContext";

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

  //interact with contract to getting the seed
  const getSeed = async (setLoader) => {
    try {
      if (!profileId) {
        await handleAuth(setLoader);
      } else {
        setLoader(true);
        const contract = await connectWithContract();
        const getseed = await contract.getSeed();
        await getseed.wait();
        //here we go to store requirements data into our database
        setLoader(false);
        setMessage({
          type: "success",
          message: "You already get the seed",
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

  return (
    <SetContractContext.Provider value={{ getSeed }}>
      {props.children}
    </SetContractContext.Provider>
  );
};

// Define the propTypes for MessageContextProvider
SetContractContextProvider.propTypes = {
  children: PropTypes.node.isRequired, // Ensure children is provided and is a node
};

export default SetContractContext;
