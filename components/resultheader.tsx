import { ResultType } from "@/typing/result";
import { Decimal } from "@prisma/client/runtime";
import Head from "next/head";

interface ResultProps {
    result: ResultType,
    distance: Decimal
}

const titleMap = new Map<ResultType, string>(
    [
        ["Success", "🥳 Congratulations!"],
        ["Partial", "😬 So Close!"],
        ["Failure", "😢 Oh Dear!"]
    ]
);

const generateDescription = (result: ResultType, distance: Decimal) => {
    if (result == "Success") {
        return (
            <p>
                You're spot on target and managed to find Sherwood Forest constituency!
            </p>
        )
    }
    if (result == "Partial") {
        return (
            <p>
                You same so close. Only <b>{distance.toString()}</b> mile(s) from Sherwood Forest constituency.
            </p>
        )
    }
    return (
        <p>
            Unfortunately you were nowhere near at <b>{distance.toString()} miles</b> from Sherwood Forest constituency. It's in Nottinghamshire, just a few miles north of Nottingham.
        </p >
    )
}

const ResultHeader = (props: ResultProps) => {
    const { result, distance } = props;
    const title = titleMap.get(result);
    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <h1>{title}</h1>
            {generateDescription(result, distance)}
        </>
    )
}

export default ResultHeader;