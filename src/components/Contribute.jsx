import styled from "styled-components";
import Collectibles from "./Collectibles";
import { useJsApiLoader } from "@react-google-maps/api";
import { mapOptions } from "../context/Constant";
import Map from "./Map/Map";

const Section = styled.div`
  height: 100vh;
  width: 100%;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: row;
  background: linear-gradient(#95ba85, #6d9061);
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




function Contribute() {
  const { isLoaded } = useJsApiLoader({
    id: mapOptions,
    googleMapsApiKey: mapOptions
  })


  return (
    <>
      <Section id="contribute">
        <MapSection>
          <RightBanner>
            <Map isLoaded={isLoaded} />
          </RightBanner>
          <LeftBanner>Contribute</LeftBanner>
        </MapSection>
      </Section>
      <Collectibles />
    </>
  );
}

export default Contribute;
