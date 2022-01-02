import Head from "next/head";
import Header from "../src/components/Header/Header";

import "../styles/main.scss";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>What is your favorite animal on the blockchain? </title>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="shortcut icon" href="/android-chrome-256x256" />
      </Head>
      <div className="background--custom"></div>

      <Header />
      <div className="mainContainer">
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;
