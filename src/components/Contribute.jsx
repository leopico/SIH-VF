import { useEffect, useState } from "react";
import styled from "styled-components";
import Collectibles from "./Collectibles";
import { useJsApiLoader } from "@react-google-maps/api";
import { mapOptions } from "../context/Constant";
import Map from "./Map/Map";
import WorldMap from "./Map/WorldMap";

const Section = styled.div`
  height: 100vh;
  width: 100%;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  background: linear-gradient(#95ba85, #6d9061);
  margin-bottom: 20px;
`;

const MapSection = styled.div`
  display: flex;
  height: 100%;
  flex: 1;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

const LeftBanner = styled.div`
  height: 100%;
  max-width: 104px;
  flex: 1;
  background-color: #20361a53;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: transparent;
  border: 2px solid #ffffff;
  border-radius: 1px;
  //Typography
  text-align: center;
  writing-mode: vertical-rl;
  font-family: "inter", sans-serif;
  font-size: 64px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 25px;
  -webkit-text-stroke-width: 2px;
  -webkit-text-stroke-color: #ffffff;

  @media (max-width: 768px) {
    display: none;
  }
`;

const RightBanner = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  /* color: white; */
  flex: 3;
`;

const ButtonContainer = styled.div`
  display: flex;
`;

const Button = styled.button`
  margin: 0 10px;
  padding: 10px;
  font-size: 16px;  
  cursor: pointer;
  color: transparent;
  background-color: ${({ selected }) => (selected ? "#20361a53" : "#6b380300")};
  color: ${({ selected }) => (selected ? "gray" : "transparent")};
  
  //typo
  text-align: center;
  writing-mode: horizontal-rl;
  font-family: "inter", sans-serif;
  font-size: 64px;
  font-style: normal;
  font-weight: 800;
  line-height: 2.5rem;
  letter-spacing: 25px;
  -webkit-text-stroke-width: 2px;
  -webkit-text-stroke-color: #ffffff;
`;

function Contribute() {
  const { isLoaded } = useJsApiLoader({
    id: mapOptions,
    googleMapsApiKey: mapOptions
  });

  const [selectedData, setSelectedData] = useState(() => {
    return localStorage.getItem("selectedData") || "map2"
  });

  const handleButtonClick = (mayType) => {
    setSelectedData(mayType);
  };

  // Update localStorage when selectedData changes
  useEffect(() => {
    localStorage.setItem("selectedData", selectedData);
    // console.log(selectedData);
  }, [selectedData]);

  return (
    <>
      <Section id="contribute">
        <ButtonContainer>
          <Button onClick={() => handleButtonClick("map1")} selected={selectedData === "map1"}>
            User Map
          </Button>
          <Button onClick={() => handleButtonClick("map2")} selected={selectedData === "map2"}>
            World Map
          </Button>
        </ButtonContainer>
        <MapSection>
          <RightBanner>
            {selectedData === "map1" && <Map isLoaded={isLoaded}/>}
            {selectedData === "map2" && <WorldMap isLoaded={isLoaded}/>}
          </RightBanner>
          <LeftBanner>Contribute</LeftBanner>
        </MapSection>
      </Section>
      <Collectibles />
    </>
  );
}

export default Contribute;
