import { useRouter } from "next/router";
import { useCallback } from "react";

const Home = () => {
    const router = useRouter();

    const startGame = useCallback(
        () => {
            router.push("/")
        },
        [router]
    );

    return (
        <>
            <h1>Can You Find Sherwood Forest</h1>
            <p>Sherwood Forest is the new name for an old constituency but can you find it on the map?</p>
            <p>There&apos;s only one way to find out!</p>
            <button onClick={startGame}>Find Sherwood Forest!</button>
        </>
    )
}

export default Home;