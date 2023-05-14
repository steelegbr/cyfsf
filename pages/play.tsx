import dynamic from "next/dynamic";

const Map = dynamic(() => import("../components/map"), { ssr: false });
const ukCentre = [54.003644, -2.5478587];
const startZoom = 5;

const Play = () => {
    return (
        <>
            <Map center={ukCentre} zoom={startZoom} />
            <div className="text-center">
                <button className="guessButton">Right Around Here!</button>
            </div>
        </>
    )
}

export default Play;