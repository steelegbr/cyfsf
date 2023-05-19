import Layout from "@/components/layout"
import { AppProps } from "next/app"
import "tailwindcss/tailwind.css"
import "../styles/global.css"
import { Analytics } from '@vercel/analytics/react';

const App = (props: AppProps) => {
    const { Component, pageProps } = props;
    return (
        <Layout>
            <>
                <Component {...pageProps} />
                <Analytics />
            </>
        </Layout>
    )
}

export default App;