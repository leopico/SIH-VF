import React from "react";
import styled from "styled-components";
import Contribute from "./Contribute";

const Section = styled.div`
  width: 100%;
  height: 760px;
  background: linear-gradient(#b2d8b0, #95ba85);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const Container1 = styled.div`
  flex: 1;
  width: auto;
  height: 100%;
  /* background-color: #5e5e49; */
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const Container1TextWrapper = styled.div`
  width: 50%;
  height: 90%;
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
  font-size: 108px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 50px;
  -webkit-text-stroke-width: 2px;
  -webkit-text-stroke-color: #ffffff;

  //Typography end
`;

const Container2 = styled.div`
  flex: 3;
  width: auto;
  height: 100%;
  /* background-color: #5e5e49; */
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Container2Div1 = styled.div`
  flex: 1;
  width: 100%;
  height: 100%;
  /* background-color: #5e5e49; */
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const Container2Div1Div = styled.div`
  flex: 1;
  width: auto;
  height: 100%;
  /* background-color: #5e5e49; */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container2Div1DivWrapper = styled.div`
  cursor: pointer;
  width: 190px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 64px;
  //Typography
  color: #224e34;
  font-family: "inter", sans-serif;
  font-size: 22px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  //Typography end

  &:hover {
    background-color: #3d49177e;
    color: #ffffff;
  }
`;

const Container2Div2 = styled.div`
  flex: 3;
  width: 100%;
  height: 100%;
  /* background-color: #5e5e49; */
  display: flex;
  justify-content: center;
  align-items: center;
  //Typography
  color: #224e34;
  font-family: "inter", sans-serif;
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  //Typography end
`;

const Container3 = styled.div`
  flex: 3;
  width: auto;
  height: 100%;
  /* background-color: #5e5e49; */
  display: flex;
  justify-content: center;
  align-items: center;

  iframe {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
`;

function About() {
  return (
    <>
      <Section>
        <Container1>
          <Container1TextWrapper>About</Container1TextWrapper>
        </Container1>
        <Container2>
          <Container2Div1>
            <Container2Div1Div>
              <Container2Div1DivWrapper>
                Virtual Forest
              </Container2Div1DivWrapper>
            </Container2Div1Div>
            <Container2Div1Div>
              <Container2Div1DivWrapper>Zuraverse</Container2Div1DivWrapper>
            </Container2Div1Div>
            <Container2Div1Div>
              <Container2Div1DivWrapper>Organisation</Container2Div1DivWrapper>
            </Container2Div1Div>
          </Container2Div1>
          <Container2Div2>
            Virtual forest is a web-based game that enables users to plant trees
            in the real world, while sitting on couch or work-desk!{" "}
          </Container2Div2>
        </Container2>
        <Container3>3D Model Goes Here</Container3>
      </Section>
      <Contribute />
    </>
  );
}

export default About;
