import path from "path";
import fs from "fs";
import { XMLParser } from "fast-xml-parser";
import { PrismaClient } from "@prisma/client";
import { point, polygon } from "turf";

const getPointStrings = () => {
    const kmlPath = path.join(process.cwd(), "map/sherwoodforest.kml");
    const kmlContent = fs.readFileSync(kmlPath, "utf8");
    const parser = new XMLParser();
    const kml = parser.parse(kmlContent);
    return kml.kml.Placemark.Polygon.outerBoundaryIs.LinearRing.coordinates.split("\n");
}

const getPolygon = (pointStrings: string[]) => {
    return polygon(
        [
            pointStrings.map(
                (coordString) => {
                    const splitCoords = coordString.split(",");
                    return [parseFloat(splitCoords[0]), parseFloat(splitCoords[1])];
                }
            )
        ]
    );
}

const getPoints = (pointStrings: string[]) => {
    return pointStrings.map(
        (coordString) => {
            const splitCoords = coordString.split(",");
            return point([parseFloat(splitCoords[0]), parseFloat(splitCoords[1])]);
        }
    )
}

const pointStrings = getPointStrings();
export const constituencyPoints = getPoints(pointStrings);
export const constituency = getPolygon(pointStrings);
export const constituencyCoords = constituencyPoints.map(
    (currentPoint) => ([currentPoint.geometry.coordinates[1], currentPoint.geometry.coordinates[0]])
);