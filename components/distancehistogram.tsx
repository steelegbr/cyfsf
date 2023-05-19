import Plot from "react-plotly.js";

interface DistanceHistogramProps {
    distances: number[]
}

const DistanceHistogram = (props: DistanceHistogramProps) => {
    const { distances } = props;
    return (
        <>
            <div>And when we look at that spread of markers as a measure of distance:</div>
            <Plot
                data={[
                    {
                        x: distances,
                        type: "histogram"
                    }
                ]}
                layout={{
                    title: "Distances (miles)"
                }}
            />
        </>
    )
}

export default DistanceHistogram;