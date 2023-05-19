import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import { PrismaClient } from "@prisma/client";
import ResultHeader from "@/components/resultheader";
import { constituencyCoords } from "@/services/coordservice";
import { LatLngExpression } from "leaflet";
import { distanceToResult } from "@/services/resultservice";
import { IncomingMessage } from "http";
import { useRouter } from "next/router";
import { useCallback } from "react";

interface GuessProps {
    guess: any
    constituencyCoords: number[][]
    url: string
}

const prisma = new PrismaClient();
const ResultMap = dynamic(() => import("../../components/resultmap"), { ssr: false });
const Social = dynamic(() => import("../../components/social"), { ssr: false });

const Results = (props: GuessProps) => {
    const { guess, url } = props;
    const router = useRouter();
    const result = distanceToResult(guess.distance);

    const startGame = useCallback(
        () => {
            router.push("/")
        },
        [router]
    );

    return (
        <>
            <ResultHeader result={result} distance={guess.distance} id={guess.id} />
            <ResultMap
                latitude={parseFloat(guess.latitude.toString())}
                longitude={parseFloat(guess.longitude.toString())}
                nearestLatitude={parseFloat(guess.intersectLatitude.toString())}
                nearestLongitude={parseFloat(guess.intersectLongitude.toString())}
                constituencyCoords={props.constituencyCoords as LatLngExpression[]}
            />
            <Social result={result} guess={guess} />
            <div>
                <button onClick={startGame}>Play Again?</button>
            </div>
        </>
    )
}

const urlToPath = (url: string) => {
    const dotIndex = url.indexOf(".");
    if (dotIndex < 0) {
        return url;
    }
    return url.slice(0, dotIndex);
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const guess = await prisma.guess.findUnique({
        where: {
            id: context.params?.id as string
        }
    });
    const request = context.req as IncomingMessage;
    const url = new URL(request.url || "/", `https://${request.headers.host}`);

    return {
        props: {
            guess: JSON.parse(JSON.stringify(guess)),
            constituencyCoords,
            url: url.toString()
        }
    }
}

export default Results;