import { useMemo, useRef } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";

interface MapProps {
    center: Coordinate;
    zoom: number;
    guess: Coordinate,
    setGuess: Function
}

const GuessMap = (props: MapProps) => {
    const { center, zoom, guess, setGuess } = props;
    const markerRef = useRef(null);

    const eventHandlers = useMemo(
        () => ({
            dragend() {
                const marker = markerRef.current as any;
                if (marker != null) {
                    setGuess(marker.getLatLng())
                }
            },
        }),
        [],
    )

    return (
        <MapContainer center={center} zoom={zoom} scrollWheelZoom={true} className="map">
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker
                eventHandlers={eventHandlers}
                draggable={true}
                ref={markerRef}
                position={guess}
            />
        </MapContainer>
    )
}

export default GuessMap;