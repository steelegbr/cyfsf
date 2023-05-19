import { LeafletMouseEvent } from "leaflet";
import { useMemo, useRef } from "react";
import { MapContainer, Marker, TileLayer, useMap, useMapEvents } from "react-leaflet";

interface MapProps {
    center: Coordinate;
    zoom: number;
    guess: Coordinate,
    setGuess: Function
}

interface MapEventHandlerProps {
    setGuess: Function
}

const MapEventHandler = (props: MapEventHandlerProps) => {
    const { setGuess } = props;
    const map = useMapEvents({
        click: (event: LeafletMouseEvent) => {
            setGuess([event.latlng.lat, event.latlng.lng]);
        }
    });
    return null;
}

const GuessMap = (props: MapProps) => {
    const { center, zoom, guess, setGuess } = props;
    const markerRef = useRef(null);

    const markerEventHandlers = useMemo(
        () => ({
            dragend() {
                const marker = markerRef.current as any;
                if (marker != null) {
                    const guessLatLng = marker.getLatLng();
                    setGuess([guessLatLng.lat, guessLatLng.lng]);
                }
            },
        }),
        [setGuess],
    )

    return (
        <MapContainer center={center} zoom={zoom} scrollWheelZoom={true} className="map">
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapEventHandler setGuess={setGuess} />
            <Marker
                eventHandlers={markerEventHandlers}
                draggable={true}
                ref={markerRef}
                position={guess}
            />
        </MapContainer>
    )
}

export default GuessMap;