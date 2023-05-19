import { MapContainer, Marker, TileLayer } from "react-leaflet";

interface ResultsMapProps {
    guesses: number[][2]
}

const ResultsMap = (props: ResultsMapProps) => {
    const { guesses } = props;

    return (
        <MapContainer bounds={guesses} scrollWheelZoom={true} className="map">
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {guesses.map(
                (guess, index) => (
                    <Marker key={index} position={guess} />
                )
            )}
        </MapContainer>
    )
}

export default ResultsMap;