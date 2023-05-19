import { NextApiRequest, NextApiResponse } from "next";
import { distance, point } from "turf";
import booleanPointInPolygon from "@turf/boolean-point-in-polygon";
import { PrismaClient } from "@prisma/client";
import { constituency, constituencyPoints } from "@/services/coordservice";
import { Guess } from "@/typing/api";

const prisma = new PrismaClient();

const Guess = async (req: NextApiRequest, res: NextApiResponse) => {
    const guess = req.body as Guess;

    const guessPoint = point([guess.longitude, guess.latitude]);
    let minDistance = 0;
    let nearestPoint = guessPoint;

    // If we're outside the polygon, calculate the distance to the nearest point
    // This isn't 100% (they could be closer to a line) but good enough for a game!

    if (!booleanPointInPolygon(guessPoint, constituency)) {
        const distances = constituencyPoints.map(
            (currentPoint) => {
                const currentDistance = distance(currentPoint, guessPoint, "miles");
                return {
                    point: currentPoint,
                    distance: currentDistance
                }
            }
        );

        const closestCombo = distances.reduce(
            (existingCombo, currentCombo) => {
                if (currentCombo.distance < existingCombo.distance) {
                    return currentCombo;
                }
                return existingCombo;
            }
        );

        minDistance = parseFloat(closestCombo.distance.toFixed(1));
        nearestPoint = closestCombo.point;
    }

    // Store and return the guess

    const dbGuess = await prisma.guess.create({
        data: {
            latitude: guess.latitude,
            longitude: guess.longitude,
            distance: minDistance,
            intersectLongitude: nearestPoint.geometry.coordinates[0],
            intersectLatitude: nearestPoint.geometry.coordinates[1]
        }
    })

    res.status(200).json({ "id": dbGuess.id });
}

export default Guess;