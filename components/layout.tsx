import Head from "next/head";
import Menu from "./menu";

interface LayoutProps {
    children: React.ReactElement
}

const Layout = (props: LayoutProps) => {
    const { children } = props;
    return (
        <>
            <Head>
                <title>Can You Find Sherwood Forest</title>
                <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.3/dist/leaflet.css"
                    integrity="sha256-kLaT2GOSpHechhsozzB+flnD+zUyjE2LlfWPgU04xyI="
                    crossorigin="" />
            </Head>
            <Menu />
            <div className="container mx-auto flex flex-col space-y-4">
                {children}
            </div>
        </>
    )
}

export default Layout;