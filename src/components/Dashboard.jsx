import styles from "./UserDashBoard.module.css";
import styled from 'styled-components';
import { useState } from 'react';
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
  position: absolute; /* Change fixed to absolute */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  background-color: lightblue;
  border: 10px solid indigo;
  border-radius: 5px;
  z-index: 1000;
  width: 300px;
`;

// ... rest of your code


const CloseButton = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
  `;

const EditButton = styled.button`
    margin-top: 10px;
  `;


function Dashboard (){
    
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

    
       <div className={styles.userdashboard}>
         <div className={styles.macbookAir1}>
           <div className={styles.path106Parent}>
          <img className={styles.path106Icon} alt="" src="/path106.svg" />
          <div className={styles.groupChild} />
          <img className={styles.groupItem} alt="" src="https://demovf.vercel.app/map/images/user.png" />
          <div className={styles.materialSymbolslocationOnParent}>
            {/* <img
              className={styles.materialSymbolslocationOnIcon}
              alt=""
              src="/materialsymbolslocationon.svg"
            /> */}
            
            <container className={styles.containerinput}>
            <div className={styles.melissaPeters}>Name-{user.name}</div>
            <div className={styles.interiorDesigner}>
              <p className={styles.interiorDesigner1}>Career - {user.career}</p>
              <p className={styles.email}>Email - {user.email}</p>
              <p className={styles.lagosNigeria}>Location - {user.location}</p>
              
            </div>

            <button style={
              {
                backgroundColor: '#00FF00',
                color: '#fff',
                margin: '160px 60px', // Add margin to move the button down
                padding: '10px',
                borderRadius: '5px',
                border: 'none',
                cursor: 'pointer',
              }
            } onClick={handleEditProfile}>Edit profile</button>
         
            
            </container>
           


            
          </div>
          
          
          
          <div className={styles.groupParent}>
            <div className={styles.parent}>
              <div className={styles.div}>{user.level}</div>
              <div className={styles.level}>
                <p className={styles.interiorDesigner1}>level</p>
              </div>
            </div>
            <div className={styles.group}>
              <div className={styles.div1}>26</div>
              <div className={styles.friends}>friends</div>
            </div>
            <div className={styles.container}>
              <div className={styles.div2}>{user.treesGrown}</div>
              <div className={styles.trees}>trees</div>
            </div>
          </div>
          <div className={styles.rectangleParent}>
            <div className={styles.groupInner} />
          </div>
          
        </div>
        <div className={styles.myForest}>My Forest</div>
        <img className={styles.macbookAir1Child} alt="" src="/line-2.svg" />
        <div className={styles.friendsParent}>
          <div className={styles.badges}>Friends</div>
          <div className={styles.lineDiv} />
        </div>
        <div className={styles.lineParent}>
          <div className={styles.lineDiv} />
          <div className={styles.badges}>Badges</div>
        </div>
        <div className={styles.imgAvatar}>
          <img className={styles.vectorIcon} alt="" src="/vector.svg" />
          <img className={styles.vectorIcon1} alt="" src="/vector1.svg" />
        </div>
      </div>
    <div className={styles.card_pri}>
      <div className={styles.card2}>
        <div className={styles.card2Child} />
        <div className={styles.card2Item} />
        <img
          className={styles.virtualforesticon1}
          alt=""
          src="https://cdn.pixabay.com/photo/2012/04/13/01/09/tree-31580_1280.png"
        />
        <div className={styles.div3}>{user.treesGrown}</div>
        <div className={styles.totalTrees}>Total Trees</div>
        
      </div>
      <div className={styles.card3}>
        <div className={styles.card3Child} />
        <div className={styles.card2Item} />
        <img
          className={styles.virtualforesticon1}
          alt=""
          src="https://cdn.pixabay.com/photo/2020/09/23/22/14/pumpkins-5597202_1280.png"
        />
        <div className={styles.garden}>Garden</div>
        <div className={styles.totalTrees}>Current Stage</div>
      </div>
      <div className={styles.card4}>
        <div className={styles.card4Child} />
        <div className={styles.card2Item} />
        <img
          className={styles.virtualforesticon1}
          alt=""
          src="https://cdn.pixabay.com/photo/2020/04/28/14/06/summer-5104630_1280.png"
        />
        <div className={styles.orchard}>Orchard</div>
        <div className={styles.nextStage}>Next Stage</div>
        <div className={styles.toGo}>263 to go</div>
      </div>
      <div className={styles.treesHealth}>
        <img className={styles.treesHealthChild} alt="" src="https://www.rd.com/wp-content/uploads/2022/12/Best-Plant-Care-Apps-6-Plant-Light-Meter.jpg?fit=700%2C700?fit=700,700" />
        <div className={styles.plantsHealth}>Plants’ Health</div>
        {/* <div className={styles.optimum}>Optimum</div> */}
        <div className={styles.rectangleGroup}>
          <div className={styles.rectangleDiv} />
          <b className={styles.review}>Review</b>
        </div>
      </div>
      <div className={styles.contribution}>
        <div className={styles.contributionChild} />
        <div className={styles.towardsPlanters}>Towards Planters</div>
        <div className={styles.totalContribution}>{`Total Contribution `}</div>
        <b className={styles.b}>$169</b>
        <div className={styles.rectangleContainer}>
          <div className={styles.groupChild2} />
          <b className={styles.breakdown}>Breakdown</b>
        </div>
      </div>
      <div className={styles.collectiblesEarned}>
        <div className={styles.collectiblesEarned1}>Collectibles Earned</div>
        <div className={styles.treeNft}>
          <div className={styles.treeNftChild} />
          <img
            className={styles.virtualforesticon13}
            alt=""
            src="https://cdn.pixabay.com/photo/2021/11/26/11/01/nft-6825637_1280.png"
          />
          <div className={styles.treeNft1}>Tree NFT</div>
        </div>
        <div className={styles.gardenNft}>
          <div className={styles.gardenNftChild} />
          <img
            className={styles.virtualforesticon14}
            alt=""
            src="https://nftgarden.app/wp-content/uploads/2022/11/favicon.png"
          />
          <div className={styles.gardenNft1}>Garden NFT</div>
          <div className={styles.groupDiv}>
            <div className={styles.groupChild2} />
            {/* <b className={styles.breakdown}>Mint Now</b> */}
          </div>
        </div>
      </div>
      <div className={styles.rewards}>
        <div className={styles.rewards1}> Rewards</div>
        <div className={styles.rewardsChild} />
        <div className={styles.totalCarbonOffset}>{`Total Carbon Offset `}</div>
        <b className={styles.t}>2.2 T</b>
      </div>
      <div className={styles.userdashboardChild} />
      <div className={styles.refiRewardsFrom}>ReFi Rewards From Next Level</div>
      <div className={styles.x6bd5d59a2aWrapper}>
        <div className={styles.x6bd5d59a2a}>0x6bd5d59a2a</div>
 
      </div>
      <img
        className={styles.greenCreativeGrowingSeedFoIcon}
        alt=""
        src="/green-creative-growing-seed-for-agriculture--farming--gardening-logoremovebgpreview-1@2x.png"
      />
    </div>
    </div>
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
          <EditButton style={
                {
                backgroundColor: '#00FF00',
                color: '#fff',
                margin: '16px 6px', // Add margin to move the button down
                padding: '10px',
                borderRadius: '5px',
                border: 'none',
                cursor: 'pointer',
              }
          }onClick={handleSaveProfile}>
            {
              loader ? <Loader /> : "save"
            }
          </EditButton>
        </EditProfileModal>
      )}
    </>
  );
};

export default Dashboard;