import Head from "next/head";

import "../styles/main.scss";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>What is your favorite animal on the blockchain? </title>
      </Head>
      <div className="background--custom"></div>

      <div className="mainContainer">
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;
