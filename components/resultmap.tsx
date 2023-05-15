import { LatLngExpression } from "leaflet";
import { MapContainer, Marker, Polygon, Polyline, TileLayer } from "react-leaflet";

interface ResultMapProps {
    latitude: number,
    longitude: number,
    nearestLatitude: number,
    nearestLongitude: number,
    constituencyCoords: LatLngExpression[]
}

const ResultMap = (props: ResultMapProps) => {
    const { latitude, longitude, nearestLatitude, nearestLongitude, constituencyCoords } = props;
    const center: [number, number] = [((latitude + nearestLatitude) / 2), ((longitude + nearestLongitude) / 2)];
    const guess: [number, number] = [latitude, longitude];
    const line: [number, number][] = [[nearestLatitude, nearestLongitude], guess];
    const bounds = [guess, ...constituencyCoords];

    return (
        <MapContainer center={center} bounds={bounds} scrollWheelZoom={true} className="map">
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Polygon positions={constituencyCoords} />
            <Marker position={guess} />
            <Polyline positions={line} />
        </MapContainer>
    )
}

export default ResultMap;