import { titleMap } from "@/services/resultservice";
import { ResultType } from "@/typing/result";
import { Decimal } from "@prisma/client/runtime";
import Head from "next/head";

interface ResultProps {
    result: ResultType,
    distance: Decimal,
    id: string
}

const generateDescription = (result: ResultType, distance: Decimal) => {
    if (result == "Success") {
        return (
            <p>
                You&apos;re spot on target and managed to find Sherwood Forest constituency!
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
            Unfortunately you were nowhere near at <b>{distance.toString()} miles</b> from Sherwood Forest constituency. It&apos;s in Nottinghamshire, just a few miles north of Nottingham.
        </p >
    )
}

const ResultHeader = (props: ResultProps) => {
    const { result, distance, id } = props;
    const title = titleMap.get(result);
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta property="og:title" content="Can You Find Sherwood Forest - {title}" />
                <meta property="og:image" content={`/api/results/og/${id}`} />
            </Head>
            <h1>{title}</h1>
            {generateDescription(result, distance)}
        </>
    )
}

export default ResultHeader;