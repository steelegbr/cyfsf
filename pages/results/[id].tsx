import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import { PrismaClient } from "@prisma/client";
import ResultHeader from "@/components/resultheader";
import { constituencyCoords } from "@/services/coordservice";
import { LatLngExpression } from "leaflet";
import { distanceToResult } from "@/services/resultservice";
import { FacebookIcon, FacebookShareButton, TwitterIcon, TwitterShareButton } from "next-share";
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

const Results = (props: GuessProps) => {
    const { guess, url } = props;
    const router = useRouter();
    const result = distanceToResult(guess.distance);
    const socialText = result === "Success" ? "I managed to find Sherwood Forest constituency. Can you?" : `I got within ${guess.distance} mile(s) of Sherwood Forest consistuency. Can you find it?`;

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
            <div className="flex space-x-4">
                <span>Share your result:</span>
                <FacebookShareButton url={url} quote={socialText}>
                    <FacebookIcon size={32} />
                </FacebookShareButton>
                <TwitterShareButton url={url} title={socialText}>
                    <TwitterIcon size={32} />
                </TwitterShareButton>
            </div>
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