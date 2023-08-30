import React from "react";
import styled, { keyframes } from "styled-components";

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
  width: 142px;
  height: 25px;
  font-size: 16px;
  font-family: "inter", sans-serif;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  opacity: 0.9;
  background: #cee963;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  border: none;
  color: #3d4917;
  min-height: 42px;
  font-weight: 600;
  letter-spacing: 2px;
`;

function Collectibles() {
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
                <DivLeftItemText>Day05</DivLeftItemText>
              </DivLeftItemTextWrapper>
            </DivLeftItem2>
            <DivLLeftItem1>
              <DivLeftItemImage>
                <img src="/Component13.svg" />
              </DivLeftItemImage>
              <DivLeftItemTextWrapper>
                <DivLeftItemTextHeading>Tree</DivLeftItemTextHeading>
                <DivLeftItemText>Day05</DivLeftItemText>
              </DivLeftItemTextWrapper>
            </DivLLeftItem1>
          </DivLeftItemWrapper>
        </DivLeft>
        <DivRight>
          <DivRightLeftHeading>Collectibles</DivRightLeftHeading>
          <DivRightRightWrapper>
            <DivRightHeading>TreeNFT</DivRightHeading>
            <DivRightModelWrapper>Model Here</DivRightModelWrapper>
            <DivParagraph>
              The virtual twin of a real world sapling planted by your efforts
              and contributions. This sapling would be geotagged and its updates
              would be stored on hashgraph, a distributed ledger to ensure
              transparency and authenticity, and will keep it monitorable and
              tamper-proof.{" "}
            </DivParagraph>
            <DivRightButton>Mint Now</DivRightButton>
          </DivRightRightWrapper>
        </DivRight>
      </Section>
    </>
  );
}

export default Collectibles;
