import Head from "next/head";
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Movie Suggester</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" key="viewport"></meta>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
