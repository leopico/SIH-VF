import { useContext, useState, useEffect, useRef } from "react";
import styled from 'styled-components';
import SetContractContext from "../../context/SetContractContext";
import { GoogleMap, InfoWindow, Marker } from "@react-google-maps/api";
import { MAP_THEME } from "../../context/Constant";
import ChangeMapType from "./layers/ChangeMapType";
import Loader from "../Loader";
import SetAuthContext from "../../context/SetAuthContext";

const seed = '/map/images/seed.png';
const seeddead = '/map/images/seeddead.png';
const sapling = '/map/images/sapling.png';
const tree = '/map/images/tree.png';
const clock = '/map/images/clock.png';
const ellipse = '/map/images/Ellipse.png';
const location = '/map/images/location.png';
const manurebutton = '/map/images/manurebutton.png';
const waterbutton = '/map/images/waterbutton.png';
const seedbuttoon = '/map/images/seedbutton.png';
const user = '/map/images/user.png';

const InfoWindowContainer = styled.div`
  background: white;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  font-family: 'Inter';
  font-weight: 500;
  overflow: hidden;
  padding: 20px;
  max-height: 150px;
  overflow-y: auto;
`;

const InfoRow = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
`;

const UserIcon = styled.img`
  width: 20px;
  height: 20px;
`;

const InfoIcon = styled.img`
  width: 20px;
  height: 20px;
`;

const InfoText = styled.div``;

const LocationInfo = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
`;

const LocationCoords = styled.div`
  display: flex;
  flex-direction: column;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center; /* Center the buttons horizontally */
`;

const Button = styled.div`
  width: 30px;
  height: 30px;
  background: white;
  padding: 1px;
  cursor: pointer;
  border-radius: 100%;
`;

const ButtonIcon = styled.img`
  width: 100%;
`;

const LoaderContainer = styled.div`
  display: flex;
  align-items: center; /* Align the loader vertically in the center */
`;

const initialMintStates = {};

const Map = (props) => {
    const { isLoaded } = props;
    const mapRef = useRef(null);
    const [changeMyTypeID, setToggleChangeMyTypeID] = useState(1);
    const [selectedMarker, setSelectedMarker] = useState("");
    const [getSeedMarker, setGetSeedMarker] = useState("");

    const [waterLoader, setWaterLoader] = useState(false);
    const [manureLoader, setManureLoader] = useState(false);
    const [mintStates, setMintStates] = useState(initialMintStates);
    const [loader, setLoader] = useState(false);

    const { getSeed, giveWater, applyManure, seeds, handleMint, canMintTreeNFT } = useContext(SetContractContext);
    const { address } = useContext(SetAuthContext);

    const containerStyle = {
        width: "95vw",
        height: "100vh",
    };
    const center = {
        lat: 30.3165,
        lng: 78.0322,
    };

    const onMapLoad = (mapInstance) => {
        mapRef.current = mapInstance;
        mapInstance.addListener("click", handleMapClick);
    };

    const handleMapClick = (event) => {
        const { latLng } = event;
        const lat = latLng.lat();
        const lng = latLng.lng();

        const location = {
            lat,
            lng,
        };

        setGetSeedMarker(location);
    };

    const MapType = {
        roadmap: "roadmap",
        satellite: "satellite",
        hybrid: "hybrid",
        terrain: "terrain",
    };

    const handleMapToggle = () => {
        if (changeMyTypeID === 0) {
            setToggleChangeMyTypeID(1);
        } else if (changeMyTypeID === 1) {
            setToggleChangeMyTypeID(2);
        } else if (changeMyTypeID === 2) {
            setToggleChangeMyTypeID(3);
        } else if (changeMyTypeID === 3) {
            setToggleChangeMyTypeID(4);
        } else if (changeMyTypeID === 4) {
            setToggleChangeMyTypeID(1);
        }
    };

    useEffect(() => {
        if (mapRef.current) {
            if (changeMyTypeID === 1) {
                mapRef.current.setMapTypeId(MapType.roadmap);
            } else if (changeMyTypeID === 2) {
                mapRef.current.setMapTypeId(MapType.terrain);
            } else if (changeMyTypeID === 3) {
                mapRef.current.setMapTypeId(MapType.satellite);
            } else if (changeMyTypeID === 4) {
                mapRef.current.setMapTypeId(MapType.hybrid);
            }
        }
    }, [changeMyTypeID, MapType.hybrid, MapType.roadmap, MapType.satellite, MapType.terrain]);


    return (
        isLoaded && (
            <>
                <div>
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={center}
                        zoom={2.3}
                        onLoad={onMapLoad}
                        options={{
                            disableDefaultUI: true,
                            styles: MAP_THEME,
                        }}
                    >

                        {
                            getSeedMarker && (
                                <InfoWindow
                                    position={{ lat: getSeedMarker.lat, lng: getSeedMarker.lng }}
                                    options={{
                                        pixelOffset: new window.google.maps.Size(0, -40),
                                    }}
                                    onCloseClick={() => setGetSeedMarker("")}
                                >
                                    <div>
                                        <InfoWindowContainer>
                                            <LocationInfo>
                                                <InfoIcon src={location} alt="Map" />
                                                <LocationCoords>
                                                    <InfoText>Lat: <strong>{getSeedMarker.lat}</strong></InfoText>
                                                    <InfoText>Lng: <strong>{getSeedMarker.lng}</strong></InfoText>
                                                </LocationCoords>
                                            </LocationInfo>
                                            <ButtonContainer>
                                                <LoaderContainer>
                                                    {loader && <Loader />}
                                                </LoaderContainer>
                                                <Button
                                                    onClick={() => getSeed(setLoader, getSeedMarker.lat, getSeedMarker.lng)}
                                                >
                                                    <ButtonIcon src={seedbuttoon} alt="Seed" />
                                                </Button>
                                            </ButtonContainer>
                                        </InfoWindowContainer>
                                    </div>

                                </InfoWindow>
                            )
                        }

                        {seeds.map((marker) => (
                            <div key={marker.seedId}>
                                <Marker
                                    position={marker.location}
                                    options={{
                                        icon:
                                            marker.stage === "seed" ? seed :
                                                marker.stage === "sapling" && !marker.isDead && !marker.isTree ? sapling :
                                                    marker.stage === "tree" && !marker.isTree && !marker.isDead ? sapling :
                                                        marker.isTree ? tree :
                                                            marker.isDead && seeddead
                                    }}
                                    onClick={() => setSelectedMarker(marker)}
                                />
                            </div>
                        ))}

                        {selectedMarker && (
                            <InfoWindow
                                position={selectedMarker.location}
                                options={{
                                    pixelOffset: new window.google.maps.Size(0, -40),
                                }}
                                onCloseClick={() => setSelectedMarker("")}
                            >
                                <div>
                                    <InfoWindowContainer>
                                        <InfoRow>
                                            <UserIcon src={user} alt="User" />
                                            <InfoText>
                                                Owner : <strong>{address.substring(0, 4) + "****" + address.slice(-4)}</strong>
                                            </InfoText>
                                        </InfoRow>
                                        <InfoRow>
                                            <InfoIcon src={seed} alt="Seed" />
                                            <InfoText>
                                                Cleaner's Id: <strong>{selectedMarker.seedId.substring(0, 4) + "****" + selectedMarker.seedId.slice(-4)}</strong>
                                            </InfoText>
                                        </InfoRow>
                                        <InfoRow>
                                            <InfoIcon src={ellipse} alt="Ellipse" />
                                            <InfoText>Being Dirty Again in: <strong>{selectedMarker.hrsToDie}</strong> &nbsp;hrs</InfoText>
                                        </InfoRow>
                                        <InfoRow>
                                            <InfoIcon src={seed} alt="Seed" />
                                            <InfoText>Cleaniness Stage <strong>{selectedMarker.stage}</strong></InfoText>
                                        </InfoRow>
                                        <InfoRow>
                                            <InfoIcon src={clock} alt="clock" />
                                            <InfoText>Cleaned ? <strong>{selectedMarker.isDead ? "dead" : "alive"}</strong></InfoText>
                                        </InfoRow>
                                        <InfoRow>
                                            <InfoIcon src={clock} alt="clock" />
                                            <InfoText>Cleaning Duration <strong>{selectedMarker.age}</strong> days</InfoText>
                                        </InfoRow>
                                        <LocationInfo>
                                            <InfoIcon src={location} alt="Map" />
                                            <LocationCoords>
                                                <InfoText>Lat: <strong>{selectedMarker.location.lat}</strong></InfoText>
                                                <InfoText>Lng: <strong>{selectedMarker.location.lng}</strong></InfoText>
                                            </LocationCoords>
                                        </LocationInfo>
                                        <ButtonContainer>
                                            <LoaderContainer>
                                                {waterLoader && <Loader />}
                                                {manureLoader && <Loader />}
                                                {mintStates[selectedMarker.seedId] && <Loader />}
                                            </LoaderContainer>
                                            <Button
                                                onClick={() =>
                                                    giveWater(
                                                        setWaterLoader,
                                                        selectedMarker.seedId
                                                    )
                                                }
                                            >
                                                <ButtonIcon src={waterbutton} alt="Water" />
                                            </Button>
                                            <Button
                                                onClick={() =>
                                                    applyManure(
                                                        setManureLoader,
                                                        selectedMarker.seedId
                                                    )
                                                }
                                            >
                                                <ButtonIcon src={manurebutton} alt="Manure" />
                                            </Button>
                                            {
                                                canMintTreeNFT(selectedMarker) && !selectedMarker.isTree && (
                                                    <Button
                                                        onClick={() => handleMint(
                                                            mintStates, setMintStates, selectedMarker.seedId, selectedMarker.location.lat, selectedMarker.location.lng
                                                        )}
                                                    >
                                                        <ButtonIcon src={tree} alt="Mint NFT" />
                                                    </Button>
                                                )
                                            }
                                        </ButtonContainer>
                                    </InfoWindowContainer>
                                </div>
                            </InfoWindow>
                        )}

                        <ChangeMapType handleMapToggle={handleMapToggle} />
                    </GoogleMap>
                </div>
            </>
        )
    );
};

export default Map;
