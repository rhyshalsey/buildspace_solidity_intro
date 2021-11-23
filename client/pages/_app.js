import "../styles/globals.css";
import "../styles/Home.css";
import "../styles/Loading.css";
import "../styles/FavoriteAnimalTable.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <div className="background--custom"></div>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
