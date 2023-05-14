import dynamic from "next/dynamic";
import { useCallback, useState } from "react";

const GuessMap = dynamic(() => import("../components/guessmap"), { ssr: false });
const ukCentre: Coordinate = [54.003644, -2.5478587];
const startZoom = 5;

const Play = () => {
    const [guess, setGuess] = useState(ukCentre);

    const handleGuess = useCallback(
        () => {
            console.log(`Guess: ${guess}`);
        },
        [guess]
    )

    return (
        <>
            <GuessMap center={ukCentre} zoom={startZoom} guess={guess} setGuess={setGuess} />
            <div className="text-center">
                <button className="guessButton" onClick={handleGuess}>Right Around Here!</button>
            </div>
        </>
    )
}

export default Play;