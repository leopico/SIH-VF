import styled from "styled-components";
import "./global.css";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import MessageContext from "../context/MessageContext";
import Loader from "./Loader";
import SetAuthContext from "../context/SetAuthContext";
import { hostServer } from "../context/Constant"
import axios from "axios";

const NavHeader = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #dcfee3;
`;

const NavLogo = styled.div`
  width: 40px;
  height: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-image: url("/logo2.png");
`;

const NavElementWrapper = styled.div`
  width: 800px;
  height: 60px;
  margin-left: 135px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 43px;
  background: rgba(206, 233, 99, 0.8);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;

const ExtraElementWarapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 30px;
`;

const NavElement = styled.div`
  cursor: pointer;
  width: 80px;
  height: 40px;
  margin: 40px 40px 40px 40px;
  display: flex;
  align-items: center;
  border-radius: 14px;

  justify-content: center;
  font-family: "Inter", sans-serif;
  transition: background-color 0.3s, color 0.3s;

  /* background-color: #d73021; */

  &:hover {
    color: #fff;
    border-radius: 14px;
    background: #3d4917;
  }
`;

const ButtonConnect = styled.div`
  width: 120px; /* Adjust the width as needed */
  height: 30px;
`;

const UserLogo = styled.div`
  width: 75px;
  height: 50px;
  cursor: pointer;
`;

const NotificationIcon = styled.div`
  width: 40px;
  height: 24px;
  cursor: pointer;
  position: relative;
`;

const PopupContainer = styled.div`
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  padding: 20px;
  z-index: 1000;
  max-height: 400px; 
  overflow-y: auto;
  overflow-x: auto;
  width: 50%;
`;

const CloseButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 16px;
  color: #3498db;
`;

const NotificationNumber = styled.span`
  position: absolute;
  top: -8px; 
  right: -3px; 
  background-color: #ff3333;
  color: white;
  font-size: 13px;
  font-weight: bold;
  border-radius: 50%;
  padding: 4px 8px;
`;

const GrayMessageContainer = styled.div`
  margin: 1px 0;
  padding: 1px;
  background-color: #f0f0f0;
`;

const PopupMessage = styled.p`
  text-align: left;
`;



const NavBar = () => {
  //set context to MessageContext
  const { setMessage } = useContext(MessageContext);

  //fetch context from SetDataContext
  const { handleAuth, signOut, profileId } = useContext(SetAuthContext);

  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [notification, setNotification] = useState([]);
  // console.log(notification);



  // async function handleDashboard() {
  //   if (profileId) {
  //     navigate("/Dashboard");
  //   } else {
  //     await handleAuth(setLoader);
  //     navigate("/Dashboard");
  //   }
  // }

  function handleHome() {
    navigate("/");
  }

  async function handleSignOut() {
    setLoader(true);
    if (profileId) {
      navigate("/");
      await signOut();
      setLoader(false);
      setMessage({
        type: "success",
        message: "You are Signed out!",
      });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  }

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  useEffect(() => {
    // Fetch data from an API using Axios
    async function fetchData() {
      try {
        const response = await axios.get(`${hostServer}/get-notifications-red/${profileId}`); // Replace with your API endpoint
        const responseData = await response.data;
        // console.log(responseData);

        // Set the data in the state
        setNotification(responseData);
      } catch (error) {
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
            message: "You can not get notification properly.",
          });
        }
      }
    }

    if (profileId) {
      fetchData();
    }
  }, [profileId, setMessage]);

  return (
    <NavHeader>
      <img src="/logo2.png" alt="Logo" style={{ width: "50px", height: "50px" , paddingLeft : "50px"}} />
      <NavElementWrapper>
        <NavElement onClick={handleHome} className="button-86" role="button" >Home</NavElement>
        <NavElement >About</NavElement>
        <NavElement>FAQs</NavElement>
        <NavElement>Contact</NavElement>
        <NavElement>Blog</NavElement>
      </NavElementWrapper>
      <ExtraElementWarapper>
        {profileId && (
          <NotificationIcon onClick={openPopup}>
            <svg xmlns="http://www.w3.org/2000/svg" height="2rem" viewBox="0 0 448 512"><path d="M224 0c-17.7 0-32 14.3-32 32V49.9C119.5 61.4 64 124.2 64 200v33.4c0 45.4-15.5 89.5-43.8 124.9L5.3 377c-5.8 7.2-6.9 17.1-2.9 25.4S14.8 416 24 416H424c9.2 0 17.6-5.3 21.6-13.6s2.9-18.2-2.9-25.4l-14.9-18.6C399.5 322.9 384 278.8 384 233.4V200c0-75.8-55.5-138.6-128-150.1V32c0-17.7-14.3-32-32-32zm0 96h8c57.4 0 104 46.6 104 104v33.4c0 47.9 13.9 94.6 39.7 134.6H72.3C98.1 328 112 281.3 112 233.4V200c0-57.4 46.6-104 104-104h8zm64 352H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7s18.7-28.3 18.7-45.3z" /></svg>
            {notification && notification.length > 0 && (
              <NotificationNumber>{notification.length}</NotificationNumber>
            )}
          </NotificationIcon>
        )}
        <PopupContainer isOpen={isPopupOpen}>
          <CloseButtonContainer>
            <CloseButton onClick={closePopup}>Close</CloseButton>
          </CloseButtonContainer>
          <p style={{ textAlign: "center" }}>
            This is temporary notification of seeds for you.
          </p>
          {notification.length > 0 ? (
            notification.map((seed, index) => (
              <GrayMessageContainer key={index}>
                <PopupMessage>
                  <strong>{seed.seedId}</strong> is in red condition.
                </PopupMessage>
              </GrayMessageContainer>
            ))
          ) : (
            <p style={{ textAlign: "center" }}>
              There is no data for notification
            </p>
          ) }
        </PopupContainer>
        <ButtonConnect>
          {profileId ? (
            <button onClick={handleSignOut} className="button-86" role="button">
              {loader && <Loader />}
              <span style={{ marginLeft: "5px" }}>Sign out</span>
            </button>
          ) : (
            <button
              onClick={() => handleAuth(setLoader)}
              className="button-86"
              role="button"
            >
              {loader && <Loader />}
              <span style={{ marginLeft: "5px" }}>Connect Wallet</span>
            </button>
          )}
        </ButtonConnect>
        <UserLogo onClick={() => alert('coming soon')}>
          <img src="/Avatar.svg" alt="Logo" />
        </UserLogo>
      </ExtraElementWarapper>
    </NavHeader>
  );
};

export default NavBar;
