import Script from "next/script";

import "../styles/globals.css";
import "../styles/Home.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <div className="background--custom"></div>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
