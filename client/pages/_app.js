import Head from "next/head";
import Header from "../src/components/Header/Header";

import "../styles/main.scss";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>What is your favorite animal on the blockchain? </title>
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
