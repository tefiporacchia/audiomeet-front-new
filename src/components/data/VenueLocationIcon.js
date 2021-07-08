import L from "leaflet";

export const VenueLocationIcon = L.icon({
    iconUrl: require("./venue_location_icon.svg"),
    iconRetinaUrl: require("./venue_location_icon.svg"),
    iconAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: [20, 20],
    className: "leaflet-venue-icon",
});

