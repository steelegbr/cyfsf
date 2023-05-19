import { ResultType } from "@/typing/result";

const threshold = 5;

export const titleMap = new Map<ResultType, string>(
    [
        ["Success", "🥳 Congratulations!"],
        ["Partial", "😬 So Close!"],
        ["Failure", "😢 Oh Dear!"]
    ]
);

export const distanceToResult = (distance: number) => {
    if (distance == 0) {
        return "Success";
    }
    if (distance <= threshold) {
        return "Partial";
    }
    return "Failure";
}