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
            </Head>
            <Menu />
            {children}
        </>
    )
}

export default Layout;