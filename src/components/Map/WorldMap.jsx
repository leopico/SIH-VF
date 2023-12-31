import { useContext, useState, useEffect, useRef } from "react";
import styled from 'styled-components';
import SetContractContext from "../../context/SetContractContext";
import { GoogleMap, InfoWindow, Marker } from "@react-google-maps/api";
import { MAP_THEME } from "../../context/Constant";
import ChangeMapType from "./layers/ChangeMapType";

const seed = '/map/images/seed.png';
const seeddead= '/map/images/seeddead.png';
const sapling = '/map/images/sapling.png';
const tree = '/map/images/tree.png';
const clock = '/map/images/clock.png';
const ellipse = '/map/images/Ellipse.png';
const location = '/map/images/location.png';
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


const WorldMap = (props) => {
    const { isLoaded } = props;
    const mapRef = useRef(null);
    const [changeMyTypeID, setToggleChangeMyTypeID] = useState(1);
    const [selectedMarker, setSelectedMarker] = useState("");


    const {allSeeds } = useContext(SetContractContext);
    // console.log(allSeeds);

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

                        {allSeeds.map((marker) => (
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
                                                ProfileId : <strong>{selectedMarker.profileId.substring(0, 4) + "****" + selectedMarker.profileId.slice(-4)}</strong>
                                            </InfoText>
                                        </InfoRow>
                                        <InfoRow>
                                            <InfoIcon src={seed} alt="Seed" />
                                            <InfoText>
                                                SeedId: <strong>{selectedMarker.seedId.substring(0, 4) + "****" + selectedMarker.seedId.slice(-4)}</strong>
                                            </InfoText>
                                        </InfoRow>
                                        <InfoRow>
                                            <InfoIcon src={ellipse} alt="Ellipse" />
                                            <InfoText>Dies in: <strong>{selectedMarker.hrsToDie}</strong> &nbsp;hrs</InfoText>
                                        </InfoRow>
                                        <InfoRow>
                                            <InfoIcon src={seed} alt="Seed" />
                                            <InfoText>Stage: <strong>{selectedMarker.stage}</strong></InfoText>
                                        </InfoRow>
                                        <InfoRow>
                                            <InfoIcon src={clock} alt="clock" />
                                            <InfoText>Seed alive: <strong>{selectedMarker.isDead ? "dead" : "alive"}</strong></InfoText>
                                        </InfoRow>
                                        <InfoRow>
                                            <InfoIcon src={clock} alt="clock" />
                                            <InfoText>Seed age: <strong>{selectedMarker.age}</strong> days</InfoText>
                                        </InfoRow>
                                        <LocationInfo>
                                            <InfoIcon src={location} alt="Map" />
                                            <LocationCoords>
                                                <InfoText>Lat: <strong>{selectedMarker.location.lat}</strong></InfoText>
                                                <InfoText>Lng: <strong>{selectedMarker.location.lng}</strong></InfoText>
                                            </LocationCoords>
                                        </LocationInfo>
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

export default WorldMap;
