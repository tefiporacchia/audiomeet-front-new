import React from "react";
import L from 'leaflet';
import {TileLayer, MapContainer,Circle, } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import '../../style/data/MapSquare.scss';
import MyMarker from "./MyMarker";

const MapSquare = ({longitud,latitud, chosenRadix}) => {
    const fillBlueOptions = { fillColor: 'blue' }

    return (
        <MapContainer center={{lat:"-34.4579", lng:"-58.9117"}} zoom={9} >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <Circle center={[latitud, longitud]} pathOptions={fillBlueOptions} radius={chosenRadix} />
            <MyMarker longitud={longitud} latitud={latitud}/>
        </MapContainer>
    );
};

export default MapSquare;