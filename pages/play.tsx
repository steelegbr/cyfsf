import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";

const GuessMap = dynamic(() => import("../components/guessmap"), { ssr: false });
const ukCentre: Coordinate = [54.003644, -2.5478587];
const startZoom = 5;

const Play = () => {
    const [guess, setGuess] = useState(ukCentre);
    const router = useRouter();
    console.log(guess);

    const handleGuess = useCallback(
        () => {
            const body = {
                longitude: guess[1],
                latitude: guess[0]
            };
            fetch(
                "/api/guess",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(body)
                }
            ).then(
                async (response) => {
                    const json = await response.json();
                    router.push(`/results/${json.id}`);
                }
            )
        },
        [guess, router]
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