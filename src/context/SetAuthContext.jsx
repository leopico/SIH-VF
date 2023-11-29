import { hostServer, ChainId } from "./Constant";
import { createContext, useEffect, useState } from "react";
import { useContext } from "react";
import MessageContext from "./MessageContext";
import PropTypes from "prop-types";
import { useCookies } from "react-cookie";
import styled from "styled-components";

const Button = styled.button`
  margin: 0 5px;
  padding: 6px;
  font-size: 10px;  
  cursor: pointer;
  background-color: black;
  text-align: center;
  border-radius: 10%;
  color: white
`;


//From Morails
import { useAccount, useConnect, useSignMessage, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import axios from "axios";

//create context for this SetDataContext
const SetAuthContext = createContext();

export const SetAuthContextProvider = (props) => {
  const { setMessage } = useContext(MessageContext);

  //set cookies coming from backend side of user object
  const [cookies, setCookie, removeCookie] = useCookies(["session"]);
  const [session, setSession] = useState({});
  const { address, profileId } = session;

  let addr = "";

  if (address && typeof address === "string") {
    // 'address' is a valid string, so perform slicing
    const firstCharOfAddress = address.slice(0, 5);
    const secondCharOfAddress = address.slice(39);
    addr = firstCharOfAddress + "..." + secondCharOfAddress;
  }

  const { connectAsync } = useConnect();
  const { disconnectAsync } = useDisconnect();
  const { isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();

  

  const handleAuth = async (setLoader) => {
    setLoader(true);

    // Check if window.ethereum is available
    if (!window.ethereum) {
      setLoader(false);
      setMessage({
        type: "error",
        message: "Please install the MetaMask wallet to login.",
      });
      return;
    }


    //disconnects the web3 provider if it's already active
    if (isConnected) {
      await disconnectAsync();
    }

    // enabling the web3 provider metamask
    await connectAsync({
      connector: new InjectedConnector(),
    });

    // Get the Ethereum object
    const ethereum = window.ethereum;

    // Get account and chainId
    const accounts = await ethereum.request({ method: "eth_accounts" });
    const account = await accounts[0];
    const chainIdHex = await ethereum.request({ method: "eth_chainId" });

    const expectedChainId = ChainId; // Hex representation of 11155111

    if (chainIdHex !== expectedChainId) {
      // User is connected to a different network, prompt them to switch
      setMessage({
        type: "error",
        message: <>
          please click this button to switch right-network
          <Button onClick={() => handleSwitchNetwork(setLoader)}>Switch Network</Button>
        </>,
      });
      setLoader(false);
      return;
    }

    const userData = { address: account, chain: chainIdHex };
    // making a post request to our 'request-message' endpoint
    const { data } = await axios.post(
      `${hostServer}/request-message`,
      userData,
      {
        headers: {
          "content-type": "application/json",
        },
        withCredentials: true,
      }
    ).catch((err) => {
      setLoader(false);
      if (err.response) {
        const errorMessage = err.response.data;
        setMessage({
          type: "error",
          message: errorMessage
        })
      } else {
        setLoader(false);
        // If it's a network error or some other unexpected error
        setMessage({
          type: "error",
          message: "You can not authenticate properly.",
        });
      }
    })

    const message = data.message;
    // signing the received message via metamask
    const signature = await signMessageAsync({ message });

    await axios.post(
      `${hostServer}/verify`,
      {
        message,
        signature,
      },
      { withCredentials: true } // set cookie from Express server
    ).catch((err) => {
      setLoader(false);
      if (err.response) {
        const errorMessage = err.response.data;
        setMessage({
          type: "error",
          message: errorMessage
        })
      } else {
        setLoader(false);
        // If it's a network error or some other unexpected error
        setMessage({
          type: "error",
          message: "You can not authenticate properly.",
        });
      }
    })

    await axios(`${hostServer}/authenticate`, {
      withCredentials: true,
    })
      .then(({ data }) => {
        const { ...authData } = data; // remove unimportant iat value

        //setCookie coming from backend side user Data
        setCookie("session", authData, { path: "/" });
        setLoader(false);
        setMessage({
          type: "success",
          message: "You have authenticated!",
        });
      })
      .catch((err) => {
        setLoader(false);
        if (err.response) {
          const errorMessage = err.response.data;
          setMessage({
            type: "error",
            message: errorMessage
          })
        } else {
          setLoader(false);
          // If it's a network error or some other unexpected error
          setMessage({
            type: "error",
            message: "You can not authenticate properly.",
          });
        }
      })
  };

  const handleSwitchNetwork = async (setLoader) => {
    try {
      setLoader(true);
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: "0xaa36a7", // Sepolia testnet chainId
            chainName: "Sepolia Testnet",
            nativeCurrency: {
              name: "ETH",
              symbol: "ETH",
              decimals: 18,
            },
            rpcUrls: ["https://rpc2.sepolia.org"],
            blockExplorerUrls: ["https://sepolia.etherscan.io"],
          },
        ],
      });
      setLoader(false);
      setMessage({
        type: "success",
        message: "Switched to right network and Please login again!"
      })
    } catch (error) {
      setLoader(false);
      setMessage({
        type: "error",
        message: "Failed to switch network. Please switch manually in your wallet.",
      });
    }
  };

  const signOut = async () => {
    try {
      //remove cookie of authData
      removeCookie("session", { path: "/" });
      await axios(`${hostServer}/logout`, {
        withCredentials: true,
      });
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data;
        setMessage({
          type: "error",
          message: errorMessage
        });
      } else {
        setMessage({
          type: "error",
          message: "You can't sign out properly."
        })
      }
    }
  };

  useEffect(() => {
    if (cookies.session) {
      setSession(cookies.session);
    }
  }, [cookies.session]);

  return (
    <SetAuthContext.Provider
      value={{
        handleAuth,
        signOut,
        addr,
        profileId,
        address,
      }}
    >
      {props.children}
    </SetAuthContext.Provider>
  );
};

// Define the propTypes for MessageContextProvider
SetAuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired, // Ensure children is provided and is a node
};

export default SetAuthContext;
