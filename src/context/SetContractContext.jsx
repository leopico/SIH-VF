import { 
  createContext, useContext, useEffect, useReducer, useState 
} from "react";
import PropTypes from "prop-types";
import MessageContext from "./MessageContext";
import SetAuthContext from "./SetAuthContext";
import axios from "axios";
import { hostServer } from "./Constant";


const initialState = {
  seeds: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_SEEDS':
      return { ...state, seeds: action.seeds };
    default:
      return state;
  }
};


const SetContractContext = createContext();

export const SetContractContextProvider = (props) => {
  const { setMessage } = useContext(MessageContext);
  const { profileId, handleAuth } = useContext(SetAuthContext);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [userDetails, setUserDetails] = useState(null); 
  const seeds = state.seeds;
  // console.log(seeds);
  // console.log(userDetails);

  // Interact with the contract to get the seed
const getSeed = async (setLoader) => {
  try {
    if (!profileId) {
      await handleAuth(setLoader);
    } else {
      setLoader(true);
      // Make a POST request to create a seed
      const response = await axios.post(`${hostServer}/create-seed`, { profileId });
      // Retrieve the seedId from the response
      const seedId = await response.data;

      setLoader(false);
      setMessage({
        type: "success",
        message: `Seed minted! Seed ID: ${seedId}`,
      });
    }
  } catch (error) {
    setLoader(false);
    if (error.response) {
      // If the error is coming from the server, extract the error message
      const errorMessage = error.response.data;
      setMessage({
        type: "error",
        message: errorMessage,
      });
    } else {
      // If it's a network error or some other unexpected error
      setMessage({
        type: "error",
        message: "You can not get the seed properly.",
      });
    }
  }
};


  //interact with contract to giving the water
  const giveWater = async (
    setWaterLoader,
    selectedWaterTokenId,
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

        setWaterLoader(false);
        setMessage({
          type: "success",
          message: "You have given the water.",
        });
      }
    } catch (error) {
      setWaterLoader(false);
      if (error.response) {
        // If the error is coming from the server, extract the error message
        const errorMessage = error.response.data;
        setMessage({
          type: "error",
          message: errorMessage,
        });
      } else {
        // If it's a network error or some other unexpected error
        setMessage({
          type: "error",
          message: "You can not give water properly.",
        });
      }
    }
  };


  const applyManure = async (
    setManureLoader,
    selectedManureTokenId,
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

  
      setManureLoader(false);
      setMessage({
        type: "success",
        message: "Manure added!",
      });

    } catch (error) {
      setManureLoader(false);
      if (error.response) {
        // If the error is coming from the server, extract the error message
        const errorMessage = error.response.data;
        setMessage({
          type: "error",
          message: errorMessage,
        });
      } else {
        // If it's a network error or some other unexpected error
        setMessage({
          type: "error",
          message: "You can not apply manure properly.",
        });
      }
    }
  };

  useEffect(() => {
    // Now, conditionally fetch seed data based on profileId
    if (profileId) {
      axios.get(`${hostServer}/get-seeds?profileId=${profileId}`)
        .then((response) => {
          const seeds = response.data;
          dispatch({ type: 'SET_SEEDS', seeds });
        }) 
        .catch((error) => {
          if(error.response) {
            const errorMessage = error.response.data
            setMessage({
              type: 'error',
              message: errorMessage
            });
          }
          console.error(error);
        });

        axios.get(`${hostServer}/get-user?profileId=${profileId}`)
        .then((response) => {
          const userData = response.data;
          setUserDetails(userData);
        })
        .catch((error) => {
          if(error.response) {
            const errorMessage = error.response.data;
            setMessage({
              type: 'error',
              message: errorMessage
            });
          }
          console.error(error);
        });
    }
  }, [profileId, setMessage]);


  // Function to conditionally check if a seed can be minted
  const canMintTreeNFT = (seed) => {
    return seed.stage === "tree" && !seed.isTree;
  };


  const handleMint = async (mintStates, setMintStates, seedId) => {
    try {
      setMintStates({ ...mintStates, [seedId]: true });

      //trigger to mint to smart-contract for tree-nft

      //here we go to store requirements data into our database
      await axios
        .post(`${hostServer}/tree-nft`, { seedId, profileId })
        .then((res) => res.data);

      setMintStates({ ...mintStates, [seedId]: false });
      setMessage({
        type: "success",
        message: `Tree minted! Token ID: ${seedId}`,
      });

    } catch (error) {
      setMintStates({ ...mintStates, [seedId]: false });
      if (error.response) {
        // If the error is coming from the server, extract the error message
        const errorMessage = error.response.data;
        setMessage({
          type: "error",
          message: errorMessage,
        });
      } else {
        // If it's a network error or some other unexpected error
        setMessage({
          type: "error",
          message: "You can not mint nft properly.",
        });
      }
    }
  };

  return (
    <SetContractContext.Provider
      value={{ 
        getSeed, 
        giveWater, 
        applyManure, 
        handleMint, 
        seeds, 
        canMintTreeNFT,
        userDetails
      }}
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
