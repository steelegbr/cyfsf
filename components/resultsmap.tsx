import { MapContainer, Marker, TileLayer, Polygon } from "react-leaflet";

interface ResultsMapProps {
    guesses: any
    constituencyCoords: any
}

const ResultsMap = (props: ResultsMapProps) => {
    const guesses: any = props.guesses;
    const constituencyCoords: any = props.constituencyCoords;

    return (
        <MapContainer bounds={guesses} scrollWheelZoom={true} className="map">
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {guesses.map(
                (guess: any, index: number) => (
                    <Marker key={index} position={guess} />
                )
            )}
            <Polygon positions={constituencyCoords} />
        </MapContainer>
    )
}

export default ResultsMap;