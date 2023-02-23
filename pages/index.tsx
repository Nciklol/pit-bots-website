import { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
    return (
        <>
            <Head>
                <meta
                    property="og:title"
                    content="Pit Bots - Professional Botting"
                />
                <meta
                    property="og:description"
                    content="Easily bot your accounts on Hypixel with our premium service!"
                />
                <meta
                    httpEquiv="refresh"
                    content="0;url=http://discord.gg/cousins"
                />
                <title>Home | PBS</title>
            </Head>
            <p>
                Redirecting.. If you are not redirected automatically, click{" "}
                <a href="https://discord.gg/cousins">here</a>.
            </p>
        </>
    );
};

export default Home;
