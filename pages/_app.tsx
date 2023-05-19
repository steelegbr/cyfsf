import Layout from "@/components/layout"
import { AppProps } from "next/app"
import "tailwindcss/tailwind.css"
import "../styles/global.css"
import { GoogleAnalytics } from "nextjs-google-analytics"

const App = (props: AppProps) => {
    const { Component, pageProps } = props;
    return (
        <Layout>
            <GoogleAnalytics trackPageViews />
            <Component {...pageProps} />
        </Layout>
    )
}

export default App;