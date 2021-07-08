import React from "react";
import { Marker,Popup } from "react-leaflet";
import { VenueLocationIcon } from "./VenueLocationIcon";

const MyMarker = ({longitud,latitud}) => {
    return (
        <Marker position={{lat:latitud, lng:longitud}}>
            <Popup>
            <span>
              Your localization! :)
            </span>
            </Popup>
        </Marker>

        );
};

export default MyMarker;