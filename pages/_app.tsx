import Layout from "@/components/layout"
import { AppProps } from "next/app"
import "tailwindcss/tailwind.css"
import "../styles/global.css"

const App = (props: AppProps) => {
    const { Component, pageProps } = props;
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    )
}

export default App;