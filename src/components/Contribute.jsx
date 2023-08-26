import React from 'react'
import styled from 'styled-components'

const Section = styled.div`
height: 100vh;
width: 100%;
align-items: center;
justify-content: center;
display: flex;
flex-direction: row;
/* background-color: #3D4917; */
`;

// const Container = styled.div`
// height: 100vh;
// width: 100%;
// align-items: center;
// justify-content: center;
// display: flex;
// flex-direction: row;
// `;

const GeneralSection = styled.div`
height: 100%;
flex: 1;
align-items: center;
justify-content: center;
display: flex;
flex-direction: column;
`;


const GenralSectionWrapper = styled.div`
display: flex;
height: 100%;
width: 100%;
flex-direction: row-reverse;`;

const GeneralSectionDiv = styled.div`
flex: 3;
width: 100%;
align-items: center;
justify-content: center;
display: flex;
flex-direction: column;
`;
const GenralSectionIcon = styled.div`
height: 100%;
flex: 1;
align-items: center;
justify-content: center;
display: flex;

`;


const GenralSectionMsg = styled.div`
display: flex;
width: 100%;
align-items: center;
justify-content: center;
font-size: 16px;
font-weight: 400;
font-family: 'inter', sans-serif;
color: #ffff;
`;

const GeneralSectionDivDiv1 = styled.div`
flex: 1;
font-size: 32px;
font-weight: 700;
font-family: 'inter', sans-serif;
color: #ffff;
`;
const GeneralSectionDivDiv2 = styled.div`
font-weight: 400;
font-size: 16px;
font-family: 'inter', sans-serif;
color: #ffff;
flex: 1;`;


const GeneralSectionDivDiv3 = styled.div`
display: flex;
flex: 1;
flex-direction: row;`;

const DivDivsubButton = styled.div`
cursor: pointer;
display: flex;
min-width: 25px;
max-height: 25px;
align-items: center;
justify-content: center;
color: white;
border: 1px solid white;
border-bottom-left-radius: 8px;
border-top-left-radius: 8px;
flex: 1;
&:hover {
  color: white;
  background-color: #CEE963;
}
`;


const DivDivAddButton = styled.div`
cursor: pointer;
display: flex;
min-width: 25px;
max-height: 25px;
align-items: center;
justify-content: center;
color: white;
border: 1px solid white;
border-bottom-right-radius: 8px;
border-top-right-radius: 8px;
flex: 1;
&:hover {
  color: white;
  background-color: #CEE963;
}`;


const DivDivValue = styled.div`
display: flex;
min-width: 36px;
max-height: 25px;
align-items: center;
justify-content: center;
color: white;
border: 1px solid white;
flex: 2;;`;


const GeneralSectionDivDiv3Button = styled.button`
cursor: pointer;
width: 100px;
height: 25px;
font-size: 12px;
font-family: 'inter', sans-serif;
border-radius: 20px;
opacity: 0.9;
background: #CEE963;
box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
border: none;
color: #3D4917;
`;


const GeneralSectionDivDiv4 = styled.div`
flex: 1;`;

const MapSection = styled.div`
display: flex;
height: 100%;
flex: 1;
align-items: center;
justify-content: center;
flex-direction: row;
`;

const LeftBanner = styled.div`
height: 90%;
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
font-family: 'inter', sans-serif;
font-size: 64px;
font-style: normal;
font-weight: 700;
line-height: normal;
letter-spacing: 25px;
-webkit-text-stroke-width: 2px;
-webkit-text-stroke-color: #ffffff;
`;

const RightBanner = styled.div`
height: 100%;
display: flex;
flex-direction: column;
/* color: white; */
flex: 3;`;

const ModeChanger = styled.div`
flex: 1;
display: flex;
max-height: 72px;
flex-direction: row;
justify-content: center;
align-items: center;
`;

const ModeChangerDiv = styled.div`
flex: 1;
cursor: pointer;
padding: 10px 50px 10px 50px;
color: #FFF;
text-align: center;
text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
font-family: 'inter', sans-serif;
font-size: 18px;
font-weight: 200;
&:hover {
  font-weight: 700;
border-radius: 29px;
background: #3D4917;
box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
}

`;

const ThreeMapModel = styled.div`
flex: 3;
display: flex;
justify-content: center;
align-items: center;
`;


function Contribute() {
  return (
<>
<Section>
<GeneralSection>
  <GenralSectionWrapper>
<GeneralSectionDiv>
<GeneralSectionDivDiv1>Seed Bag</GeneralSectionDivDiv1>
<GeneralSectionDivDiv2>Refills Everyday</GeneralSectionDivDiv2>
<GeneralSectionDivDiv3><DivDivsubButton>-</DivDivsubButton><DivDivValue>1</DivDivValue><DivDivAddButton>+</DivDivAddButton></GeneralSectionDivDiv3>
<GeneralSectionDivDiv4><GeneralSectionDivDiv3Button>Hello</GeneralSectionDivDiv3Button></GeneralSectionDivDiv4>
</GeneralSectionDiv>
<GenralSectionIcon><img src='/SeedButton.png'/></GenralSectionIcon>
</GenralSectionWrapper>
<GenralSectionWrapper>
<GeneralSectionDiv>
<GeneralSectionDivDiv1>Water</GeneralSectionDivDiv1>
<GeneralSectionDivDiv2>Refills days</GeneralSectionDivDiv2>
<GeneralSectionDivDiv3><DivDivsubButton>-</DivDivsubButton><DivDivValue>1</DivDivValue><DivDivAddButton>+</DivDivAddButton></GeneralSectionDivDiv3>
<GeneralSectionDivDiv4><GeneralSectionDivDiv3Button>Hello</GeneralSectionDivDiv3Button></GeneralSectionDivDiv4>
</GeneralSectionDiv>
<GenralSectionIcon><img src='/WaterButton.png'/></GenralSectionIcon>
</GenralSectionWrapper>
<GenralSectionWrapper>
<GeneralSectionDiv>
<GeneralSectionDivDiv1>Maunre Bag</GeneralSectionDivDiv1>
<GeneralSectionDivDiv2>Refills</GeneralSectionDivDiv2>
<GeneralSectionDivDiv3><DivDivsubButton>-</DivDivsubButton><DivDivValue>1</DivDivValue><DivDivAddButton>+</DivDivAddButton></GeneralSectionDivDiv3>
<GeneralSectionDivDiv4><GeneralSectionDivDiv3Button>Hello</GeneralSectionDivDiv3Button></GeneralSectionDivDiv4>
</GeneralSectionDiv>
<GenralSectionIcon><img src='/Compost.png'/></GenralSectionIcon>
</GenralSectionWrapper>

<GenralSectionMsg>All Proceedings go to NGOs</GenralSectionMsg>
</GeneralSection>
<MapSection>
  <RightBanner>
    <ModeChanger>
      <ModeChangerDiv>User Map</ModeChangerDiv>
      <ModeChangerDiv>World Map</ModeChangerDiv>
      </ModeChanger>
    <ThreeMapModel>3D Model Goes Here</ThreeMapModel>
      </RightBanner>
  <LeftBanner>Contribute</LeftBanner></MapSection>
</Section>

</>
  )
}

export default Contribute