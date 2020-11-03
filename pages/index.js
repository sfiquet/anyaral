import Head from 'next/head'
import Header from '../components/header'
import Footer from '../components/footer'
import styles from '../styles/Home.module.css'

const appName = "Anyaral Toolbox";
const appDescription = "A reference app for World of Twilight";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>{appName} | {appDescription}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header appName={appName} />

      <main className={styles.main}>
        <h1 className="text-3xl text-center">
          Welcome
        </h1>

        <p className="text-lg text-center mt-4">
          {appName} is a reference app for players of <a href="http://worldoftwilight.com">World of Twilight</a>.
        </p>

        <h2 className="text-2xl text-center mt-12">Features currently available</h2>
        <div className={styles.grid}>
          <a href="#" className={styles.card}>
            <h3>Denizens <span aria-hidden="true">&rarr;</span></h3>
            <p>Browse denizens of Anyaral by race.</p>
          </a>
        </div>
      </main>

      <Footer />
    </div>
  )
}
