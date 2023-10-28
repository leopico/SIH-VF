import { useContext, useState } from "react";
import styled, { keyframes } from "styled-components";
import SetContractContext from "../context/SetContractContext";
import Loader from "./Loader";

const Section = styled.div`
  height: 100vh;
  width: 100%;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: row;
  background: linear-gradient(#6d9061, #47613b);
`;

//Left Side of Page
const DivLeft = styled.div`
  height: 100%;
  flex: 1;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
`;

const DivLeftTop = styled.div`
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: row;
`;

//Animation for underline effect
const underlineAnimation = keyframes`
from {
  width: 0;
}
to {
  width: 100%;
}
`;

const DivLeftTopItem = styled.div`
  flex: 1;
  cursor: pointer;
  color: #fff;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-family: "inter", sans-serif;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 100;

  &:hover {
    text-decoration: underline #cee963;
    font-weight: 700;
  }
`;

const DivLeftItemWrapper = styled.div`
  flex: 5;
  width: 100%;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
`;

const DivLLeftItem1 = styled.div`
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: row;
`;

const DivLeftItemImage = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    max-width: 50%;
    max-height: 50%;
  }
`;

const DivLeftItemTextWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const DivLeftItemTextHeading = styled.div`
  flex: 1;
  font-family: "inter", sans-serif;
  font-size: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  letter-spacing: 4px;
`;
const DivLeftItemText = styled.div`
  flex: 1;
  align-items: center;
  justify-content: center;
  display: flex;
  font-size: 12px;
  font-family: "inter", sans-serif;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 2px;
`;

const DivLeftItem2 = styled.div`
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: row-reverse;
`;

//Right Div
const DivRight = styled.div`
  height: 100%;
  flex: 1;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: row;
`;

const DivRightLeftHeading = styled.div`
  flex: 1;
  height: 96%;
  max-width: 104px;
  flex: 1;
  background-color: #20361a53;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: transparent;
  border: 2px solid #ffffff;
  border-radius: 102px;
  //Typography
  text-align: center;
  writing-mode: vertical-rl;
  font-family: "inter", sans-serif;
  font-size: 60px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 25px;
  -webkit-text-stroke-width: 2px;
  -webkit-text-stroke-color: #ffffff;
`;

const DivRightRightWrapper = styled.div`
  flex: 5;
  display: flex;
  flex-direction: column;
  align-items: center; 
`;

const DivRightHeading = styled.div`
  flex: 1;
  display: flex;
  //Typography
  font-family: "inter", sans-serif;
  font-size: 64px;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 7.04px;
`;

const DivRightModelWrapper = styled.div`
  flex: 5;
  display: flex;
  min-height: 370px;
  align-items: center;
`;

const DivParagraph = styled.div`
  padding: 12px 12px 12px 12px;
  flex: 1;
  display: flex;
  font-size: 12px;
  font-family: "inter", sans-serif;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 2px;
`;

const DivRightButton = styled.div`
  flex: 1;
  display: flex;
  cursor: pointer;
  width: 90px;
  height: 10px;
  font-size: 10px;
  font-family: "inter", sans-serif;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  opacity: 0.9;
  background: #cee963;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  border: none;
  color: #3d4917;
  min-height: 25px;
  font-weight: 600;
  letter-spacing: 2px;
`;

const DivSeedsButton = styled.div`
flex: 1;
display: flex;
cursor: pointer;
width: 142px;
height: 25px;
font-size: 16px;
font-family: "inter", sans-serif;
border-radius: 20px;
align-items: center;
justify-content:   center;
opacity: 0.9;
background: #cee963;
box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
border: none;
color: #3d4917;
min-height: 42px;
font-weight: 600;
letter-spacing: 2px;
`;

const CloseButton = styled.button`
  /* Add any additional styling for the close button */
`;

const CloseButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end; /* Align the button to the right */
  width: 100%; /* Ensure the button stretches to the full width */
`;

const PopupContainer = styled.div`
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  padding: 20px;
  z-index: 1000;
  max-height: 400px; /* Adjust the maximum height as needed */
  overflow-y: auto; /* Enable scrolling if content overflows the container */
  width: 80%; /* Adjust the width as needed */
`;



const ThreeMapModel = styled.div`
  flex: 3;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledImage = styled.img`
  width: 70%;
  border-radius: 50%; 
`;

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  margin: 20px 0;
`;

const TableHead = styled.thead`
  background-color: #f5f5f5;
`;

const TableHeadRow = styled.tr``;

const TableHeader = styled.th`
  padding: 8px;
  text-align: left;
`;

const TableBody = styled.tbody``;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

const TableCell = styled.td`
  padding: 8px;
`;

function Collectibles() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [mintLoader, setMintLoader] = useState(false);
  //take fun from useContext of SetContract
  const { handleMint, seeds, canMintTreeNFT } = useContext(SetContractContext);
  // console.log(seeds);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <>
      <Section>
        <DivLeft>
          <DivLeftTop>
            <DivLeftTopItem>Stages</DivLeftTopItem>
            <DivLeftTopItem>Tools</DivLeftTopItem>
          </DivLeftTop>
          <DivLeftItemWrapper>
            <DivLLeftItem1>
              <DivLeftItemImage>
                <img src="/Component11.svg" />
              </DivLeftItemImage>
              <DivLeftItemTextWrapper>
                <DivLeftItemTextHeading>Seed</DivLeftItemTextHeading>
                <DivLeftItemText>Day05</DivLeftItemText>
              </DivLeftItemTextWrapper>
            </DivLLeftItem1>
            <DivLeftItem2>
              <DivLeftItemImage>
                <img src="/Component12.svg" />
              </DivLeftItemImage>
              <DivLeftItemTextWrapper>
                <DivLeftItemTextHeading>Sapling</DivLeftItemTextHeading>
                <DivLeftItemText>Day10</DivLeftItemText>
              </DivLeftItemTextWrapper>
            </DivLeftItem2>
            <DivLLeftItem1>
              <DivLeftItemImage>
                <img src="/Component13.svg" />
              </DivLeftItemImage>
              <DivLeftItemTextWrapper>
                <DivLeftItemTextHeading>Tree</DivLeftItemTextHeading>
                <DivLeftItemText>Day15</DivLeftItemText>
              </DivLeftItemTextWrapper>
            </DivLLeftItem1>
          </DivLeftItemWrapper>
        </DivLeft>
        <DivRight>
          <DivRightLeftHeading>Collectibles</DivRightLeftHeading>
          <DivRightRightWrapper>
            <DivRightHeading>TreeNFT</DivRightHeading>
            <DivRightModelWrapper>
              <ThreeMapModel reeMapModel>
                <StyledImage src="/TreeNFT.gif" alt="upcomingTree" />
              </ThreeMapModel>
            </DivRightModelWrapper>
            <DivParagraph>
              The virtual twin of a real world sapling planted by your efforts
              and contributions. This sapling would be geotagged and its updates
              would be stored on hashgraph, a distributed ledger to ensure
              transparency and authenticity, and will keep it monitorable and
              tamper-proof.{" "}
            </DivParagraph>


              <DivSeedsButton onClick={openPopup}>
                Seeds Details
              </DivSeedsButton>

              <PopupContainer pContainer isOpen={isPopupOpen}>
                <CloseButtonContainer>
                  <CloseButton onClick={closePopup}>Close</CloseButton>
                </CloseButtonContainer>
                <p style={{ textAlign: "center" }}>This is temporary data of seeds details for you.</p>
                <Table>
                  <TableHead>
                    <TableHeadRow>
                      <TableHeader>Seed ID</TableHeader>
                      <TableHeader>Stage</TableHeader>
                      <TableHeader>hrsToDie</TableHeader>
                      <TableHeader>Age</TableHeader>
                      <TableHeader>Is Tree</TableHeader>
                      <TableHeader>Action</TableHeader>
                    </TableHeadRow>
                  </TableHead>
                  <TableBody>
                    {seeds ? (
                      seeds
                        .filter((seed) => seed && seed.seedId)
                        .map((seed) => (
                          <TableRow key={seed.seedId}>
                            <TableCell>{seed.seedId}</TableCell>
                            <TableCell>{seed.stage}</TableCell>
                            <TableCell>{seed.hrsToDie}</TableCell>
                            <TableCell>{seed.age}</TableCell>
                            <TableCell>{seed.isTree ? "Tree" : "Not a Tree"}</TableCell>
                            <TableCell>
                              {canMintTreeNFT(seed) && !seed.isTree && (
                                <DivRightButton onClick={() => handleMint(setMintLoader, seed.seedId)}>
                                  {mintLoader && <Loader />} <span style={{ marginLeft: "5px" }}>Mint Now</span>
                                </DivRightButton>
                              )}
                            </TableCell>
                          </TableRow>
                        ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan="4">There are no seeds currently</TableCell>
                      </TableRow>
                    )
                    }
                  </TableBody>
                </Table>
              </PopupContainer>

          </DivRightRightWrapper>
        </DivRight>
      </Section>
    </>
  );
}

export default Collectibles;
