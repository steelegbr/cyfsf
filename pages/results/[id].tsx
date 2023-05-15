import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import { Guess, PrismaClient } from "@prisma/client";
import ResultHeader from "@/components/resultheader";
import { ResultType } from "@/typing/result";
import { constituencyCoords } from "@/services/coordservice";
import { LatLngExpression } from "leaflet";

interface GuessProps {
    guess: Guess
    constituencyCoords: number[][]
}

const prisma = new PrismaClient();
const threshold = 5;
const ResultMap = dynamic(() => import("../../components/resultmap"), { ssr: false });

const distanceToResult: ResultType = (distance: number) => {
    if (distance == 0) {
        return "Success";
    }
    if (distance <= threshold) {
        return "Partial";
    }
    return "Failure";
}

export default (props: GuessProps) => {
    const { guess } = props;
    const result = distanceToResult(guess.distance);

    return (
        <>
            <ResultHeader result={result} distance={guess.distance} />
            <ResultMap
                latitude={parseFloat(guess.latitude.toString())}
                longitude={parseFloat(guess.longitude.toString())}
                nearestLatitude={parseFloat(guess.intersectLatitude.toString())}
                nearestLongitude={parseFloat(guess.intersectLongitude.toString())}
                constituencyCoords={props.constituencyCoords as LatLngExpression[]}
            />
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const guess = await prisma.guess.findUnique({
        where: {
            id: context.params?.id as string
        }
    });
    return {
        props: {
            guess: JSON.parse(JSON.stringify(guess)),
            constituencyCoords
        }
    }
}