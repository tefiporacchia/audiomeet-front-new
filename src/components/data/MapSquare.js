import React from "react";
import {TileLayer, MapContainer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import '../../style/data/MapSquare.scss';

const MapSquare = () => {
    return (
        <MapContainer center={{lat:"-34.4579", lng:"-58.9117"}} zoom={13}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
        </MapContainer>
    );
};

export default MapSquare;