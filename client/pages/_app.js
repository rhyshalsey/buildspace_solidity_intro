import "../styles/globals.css";
import "../styles/Home.css";
import "../styles/loading.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <div className="background--custom"></div>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
