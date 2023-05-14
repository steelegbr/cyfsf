import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

interface MapProps {
    center: [number, number];
    zoom: number;
}

const Map = (props: MapProps) => {
    const { center, zoom } = props;
    return (
        <MapContainer center={center} zoom={zoom} scrollWheelZoom={true} className="map">
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
        </MapContainer>
    )
}

export default Map;