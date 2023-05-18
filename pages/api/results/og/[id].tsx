import { distanceToResult, titleMap } from "@/services/resultservice";
import { ResultType } from "@/typing/result";
import { ImageResponse, NextRequest } from "next/server";

export const config = {
    runtime: "edge"
}

const generateDescription = (result: ResultType, distance: number) => {
    if (result == "Success") {
        return (
            <p>
                I found Sherwood Forest Constituency! Can you?
            </p>
        )
    }
    if (result == "Partial") {
        return (
            <p>
                I guessed only {distance.toString()} mile(s) from Sherwood Forest constituency. Can you do any better?
            </p>
        )
    }
    return (
        <p>
            I couldn't find Sherwood Forest constituency, guessing {distance.toString()} miles away. Can you do any better?
        </p >
    )
}

const handler = async (req: NextRequest) => {
    const apiUrl = req.url.replace("/og/", "/");
    const qsIndex = apiUrl.indexOf("?");
    const response = await fetch(apiUrl.slice(0, qsIndex));
    const guess = await response.json();
    const result = distanceToResult(guess.distance);

    return new ImageResponse(
        (
            <div style={{
                height: "100%",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                backgroundColor: "#10B981",
                color: "white",
                fontFamily: "ui-sans-serif",
                fontWeight: "700",
                fontSize: "60",
                padding: "50px"
            }}>
                <h1 style={{ fontSize: "100" }}>{titleMap.get(result)}</h1>
                <p>{generateDescription(result, guess.distance)}</p>
            </div>
        ),
        {
            width: 1200,
            height: 630
        }
    )
}

export default handler;