import "@/styles/globals.css";
import "@/styles/Home.css"
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon/favicon.png" />
        <title>CampusConnect</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
