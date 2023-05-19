import { PrismaClient } from "@prisma/client";
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";

interface ResultsProps {
    guesses: number[][2],
    distances: number[]
}

const prisma = new PrismaClient();
const ResultsMap = dynamic(() => import("../../components/resultsmap"), { ssr: false });
const DistanceHistogram = dynamic(() => import("../../components/distancehistogram"), { ssr: false })

const Results = (props: ResultsProps) => {
    const { guesses, distances } = props;
    return (
        <>
            <h1>Results</h1>
            <div>Everyone&apos;s guesses can be found on the map below:</div>
            <ResultsMap guesses={guesses} />
            <DistanceHistogram distances={distances} />
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const guesses = await prisma.guess.findMany();

    const distances = guesses.map((guess) => parseFloat(guess.distance.toString()));
    const distancesSorted = distances.sort();

    return {
        props: {
            guesses: guesses.map((guess) => [parseFloat(guess.latitude.toString()), parseFloat(guess.longitude.toString())]),
            distances: distancesSorted
        }
    };
}

export default Results;