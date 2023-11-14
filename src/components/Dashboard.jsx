import { useState } from 'react';
import styled from 'styled-components';
import NavBar from './NavBar';
import { useContext } from 'react';
import SetContractContext from '../context/SetContractContext';
import Loader from './Loader';
import axios from 'axios';
import MessageContext from '../context/MessageContext';
import { hostServer } from '../context/Constant';

const profileImage = "/map/images/user.png";

const FlexDiv = styled.div`
    display: flex;
    justify-content: space-around;
    padding: 20px;
    width: 100%;
  `;

const EditProfileModal = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 20px;
    background-color: white;
    border: 1px solid #ccc;
    z-index: 1000;
    width: 300px; /* Adjust the width as needed */
  `;

const CloseButton = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
  `;

const EditButton = styled.button`
    margin-top: 10px;
  `;

function Dashboard() {
  const { userDetails } = useContext(SetContractContext);
  const { setMessage } = useContext(MessageContext);
  const user = userDetails && userDetails.length > 0 ? userDetails[0] : {};
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [career, setCareer] = useState("");
  const [location, setLocation] = useState("");
  const [loader, setLoader] = useState(false);
  const profileId = user.profileId;
  // console.log(profileId)


  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleCloseProfile = () => {
    setIsEditing(false);
    setName("");
    setEmail("");
    setCareer("");
    setLocation("")
  };

  const handleSaveProfile = async () => {
    try {
      setLoader(true);
      await axios.put(`${hostServer}/update-profile/${profileId}`, {
        name,
        email,
        career,
        location
      }).then((res) => res.data);
      setLoader(false);
      setIsEditing(false);
      setMessage({
        type: 'success',
        message: "You have successfully updated!"
      });
    } catch (error) {
      setLoader(false);
      setIsEditing(false);
      if (error.response) {
        // If the error is coming from the server, extract the error message
        const errorMessage = error.response.data;
        setMessage({
          type: "error",
          message: errorMessage,
        });
      } else {
        setLoader(false);
        setIsEditing(false);
        setMessage({
          type: "error",
          message: "You can update properly.",
        });
      }
    }
  }

  return (
    <>
      <NavBar />
      <FlexDiv>
        <div>
          <h1>left side</h1>
          <img src={profileImage} alt='profile' />
          <p>level: {user.level}</p>
          <p>trees: {user.treesGrown} trees</p>
          <p>Friends: 0</p>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Career: {user.career}</p>
          <p>Location: {user.location}</p>
          <button onClick={handleEditProfile}>Edit profile</button>
        </div>
        <div>
          <h1>right side</h1>
          <p>Total Trees: {user.treesGrown} trees</p>
          <p>Current Stage: Garden</p>
          <p>Next Stage: Orchard</p>
        </div>
      </FlexDiv>

      {isEditing && (
        <EditProfileModal>
          <CloseButton onClick={handleCloseProfile}>X</CloseButton>
          <h2>Edit Profile</h2>
          <label>
            Name:
            <input type="text" name='name' defaultValue={user.name} onChange={(e) => { setName(e.target.value) }} />
          </label>
          <br />
          <label>
            Email:
            <input type="email" name='email' defaultValue={user.email} onChange={(e) => { setEmail(e.target.value) }} />
          </label>
          <br />
          <label>
            Career:
            <input type="text" name='career' defaultValue={user.career} onChange={(e) => { setCareer(e.target.value) }} />
          </label>
          <br />
          <label>
            Location:
            <input type="text" name='location' defaultValue={user.location} onChange={(e) => { setLocation(e.target.value) }} />
          </label>
          <br />
          <EditButton onClick={handleSaveProfile}>
            {
              loader ? <Loader /> : "save"
            }
          </EditButton>
        </EditProfileModal>
      )}
    </>
  );
}

export default Dashboard;
