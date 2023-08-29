import React from "react";
import styled from "styled-components";

const Section = styled.div`
  height: 100vh;
  width: 100%;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: row;
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

const DivLeftTopItem = styled.div`
  flex: 1;
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
`;

const DivLeftItemTextWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;
const DivLeftItemTextHeading = styled.div`
  flex: 1;
`;
const DivLeftItemText = styled.div`
  flex: 1;
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
  display: flex;
`;

const DivRightRightWrapper = styled.div`
  flex: 5;
  display: flex;
  flex-direction: column;
`;

const DivRightHeading = styled.div`
  flex: 1;
  display: flex;
`;

const DivRightModelWrapper = styled.div`
  flex: 5;
  display: flex;
`;

const DivParagraph = styled.div`
  flex: 1;
  display: flex;
`;

const DivRightButton = styled.div`
  flex: 1;
  display: flex;
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
              <DivLeftItemImage>Icon Here</DivLeftItemImage>
              <DivLeftItemTextWrapper>
                <DivLeftItemTextHeading>Seed</DivLeftItemTextHeading>
                <DivLeftItemText>Day05</DivLeftItemText>
              </DivLeftItemTextWrapper>
            </DivLLeftItem1>
            <DivLeftItem2>
              <DivLeftItemImage>Image Here</DivLeftItemImage>
              <DivLeftItemTextWrapper>
                <DivLeftItemTextHeading>Sapling</DivLeftItemTextHeading>
                <DivLeftItemText>Day05</DivLeftItemText>
              </DivLeftItemTextWrapper>
            </DivLeftItem2>
            <DivLLeftItem1>
              <DivLeftItemImage>Image Here</DivLeftItemImage>
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
