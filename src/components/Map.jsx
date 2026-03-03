import React, { useEffect, useState } from 'react'
import Mapstyle from './Map.module.css'
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvent } from 'react-leaflet';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useCities } from './context/CitiesContext';
import { useGeolocation } from '../hooks/useGeolocation';
import Button from './Button';


export default function Map() {  

  const [mapPosition, setMapPosition] = useState([40, 0]);
  const [searchParams] = useSearchParams();
  const {info} = useCities();
  const {isLoading: isLoadingPosition, position: geoPosition, getPosition} = useGeolocation();
  
  const mapLat = searchParams.get("lat");
  const mapLng = searchParams.get("lng");

  
   
  
  useEffect(function(){

      if(mapLat && mapLng){
        setMapPosition([mapLat, mapLng]);
      }

  },[mapLat, mapLng])


  useEffect(
    function(){
      if(geoPosition){
        // console.log(geoPosition)
          setMapPosition([geoPosition.lat, geoPosition.lng])
      }
  },[geoPosition])
   


  return (
    <div className={Mapstyle.mapContainer}>
      {
        !geoPosition && (
            <Button type="position" onClick={getPosition}>
              {isLoadingPosition ? '...Loading':'Use your position'}
            </Button>)
      }
     
      <MapContainer 
        center={mapPosition} 
        zoom={13} 
        style={{ height: "100%", width: "100%" }}
        className={Mapstyle.map}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {
         
          info.map((cityMark) => (

            cityMark.position && (
            <Marker key={cityMark.id} position={[cityMark.position.lat, cityMark.position.lng]}>
              <Popup>
                <span>{cityMark.emoji}</span>
                <span>{cityMark.cityName}</span>
              </Popup>
            </Marker>

            )

            
          ))
        }
        <ChangeCenter position={mapPosition}/>
        <DetectClick/>
      </MapContainer>

    </div>
  )
}

function ChangeCenter({position}){
  const map = useMap();
  map.setView(position);

  return null
}

function DetectClick(){
  const navigate = useNavigate();
  useMapEvent({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
    })
}
