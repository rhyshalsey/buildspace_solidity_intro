import Head from "next/head";

import "../styles/globals.css";
import "../styles/Home.css";
import "../styles/Loading.css";
import "../styles/FavoriteAnimalTable.css";

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
