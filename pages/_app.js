import "../index.css";
import Header from "../components/header";
import Footer from "../components/footer";

function App({ Component, pageProps }) {
  return (
    <>
      <Header />
      <main>
        <Component {...pageProps} />
      </main>
      <Footer />
    </>
  );
}

export default App;
